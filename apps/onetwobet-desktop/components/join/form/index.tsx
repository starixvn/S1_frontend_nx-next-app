import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	AREA_CODE,
	AREA_CODE_BY_CURRENCY,
	CURRENCY_TO_LANG_KEY,
	EMAIL_REGEX,
	ENV_COOKIE_NAMES,
	FLAG_PREFIX_ICON_BY_CURRENCIES,
	PASSWORD_REGEX,
	PHONE_DIGITS_LIMIT,
	PHONE_LENGTH_REGEX,
	USERNAME_REGEX,
	paths,
} from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import {
	useGetSiteCurrencyListQuery,
	useLazyAffiliateCheckQuery,
	useLazyExistsEmailQuery,
	useLazyExistsUserNameQuery,
	useLazyGetAffiliateAgentQuery,
	useSignupMutation,
} from '@nx-next-app/service'
import { CurrenciesEnum } from '@nx-next-app/types'
import {
	MetaPixelTracker,
	OperaPixelTracker,
	getQueryParam,
} from '@nx-next-app/utils'
import classNames from 'classnames'
import { getCookies } from 'cookies-next'
import { isNumber } from 'lodash'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ISelectProps, InputBox, Select } from '../../common'
import { LineRegister } from './LineRegister'

enum JoinMethod {
	Email = 'email',
	Number = 'number',
}

const Form = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { LANG_GROUPS, TERMS_CONDITIONS } = useStaticData()
	const router = useRouter()
	const { query } = router

	const affId = getQueryParam(query, 'affId')
	const affCode = getQueryParam(query, 'affCode')

	const cookies = getCookies()

	const urlAffId = affId || cookies['AffId']
	const urlAffCode = affCode || cookies['AffCode']
	const urlAffiliate = urlAffId || urlAffCode
	const lineUserId = cookies[ENV_COOKIE_NAMES.LineUserId]

	const { ALLOWED_CURRENCIES } = useStaticData()

	const {
		formState,
		trigger,
		setError,
		setValue,
		register,
		getValues,
		clearErrors,
		handleSubmit,
		getFieldState,
	} = useForm()

	const { errors, touchedFields } = formState

	const {
		userInfo: { langId, currencyId },
	} = useAuth()

	const { data: { data: siteCurrencyList = [] } = {} } =
		useGetSiteCurrencyListQuery()

	const [affiliateCheck] = useLazyAffiliateCheckQuery()
	const [getAffiliateAgent] = useLazyGetAffiliateAgentQuery()

	const [checkExistsUsername, { isFetching: existsUsernameLoading }] =
		useLazyExistsUserNameQuery()

	const [checkExistsEmail, { isFetching: existsEmailLoading }] =
		useLazyExistsEmailQuery()

	const [signUp] = useSignupMutation()

	const [phoneErrorTip, setPhoneErrorTip] = useState<string | undefined>('')
	const [currencyOptions, setCurrencyOptions] = useState<
		ISelectProps['options']
	>([])

	const currencySelectOptions = siteCurrencyList
		.filter(currencyId => {
			const affiliate = getValues('affiliate')
			const formCurrencyId = getValues('currencyId')

			// if affId qualified, only show currencyId from api
			return urlAffId && affiliate ? currencyId === formCurrencyId : true
		})
		.map(currencyId => ({
			value: currencyId,
			label: t(`Label_General_Currency_${currencyId}`),
			prefixOptionIcon: (
				<div
					className={classNames(
						'flag',
						FLAG_PREFIX_ICON_BY_CURRENCIES[currencyId]
					)}
				/>
			),
		}))

	const areaCodeSelectOptions = Object.values(AREA_CODE).map(el => ({
		value: el.AreaCode,
		label: `${el.AreaCode} ${el.Name}`,
	}))

	const checkUsername = async () => {
		await trigger('username')
		const { error } = getFieldState('username')
		const username = getValues('username')
		if (error) return

		// check username duplicate from api
		try {
			const { data: isExistsUsername, message: existsUsernameMsg } =
				await checkExistsUsername({ username, langId }).unwrap()

			if (isExistsUsername) {
				setError('username', { type: 'duplicate', message: existsUsernameMsg })
			}
		} catch (error) {
			// error
		}
	}

	const checkEmail = async () => {
		await trigger('email')
		const { error } = getFieldState('email')
		const formEmail = getValues('email')
		if (error || !formEmail) return // email格式錯誤或是根本沒輸入值就不call api以節省效能
		// check email duplicate from api
		try {
			const { data: isExistsEmail } = await checkExistsEmail({
				email: formEmail,
			}).unwrap()
			if (isExistsEmail && formEmail !== '') {
				setError('email', {
					type: 'duplicate',
					message: `${t('Label_Profile_MailExisted')}`,
				})
			}
		} catch (error) {
			// error
		}
	}

	const checkPhone = async () => {
		await trigger('phone')
		const { error } = getFieldState('phone')

		const formAreaCode = getValues('areaCode')
		const formPhone = getValues('phone')

		let errorTip = ''

		if (error) {
			errorTip = error.message || ''
		} else if (!formAreaCode) {
			errorTip = t('Label_Join_PhoneRequired')
		} else if (
			Object.values(AREA_CODE_BY_CURRENCY).includes(formAreaCode) &&
			!PHONE_LENGTH_REGEX.test(formAreaCode + formPhone)
		) {
			// phone number check length by area code, so can't use pattern
			const limitRange = PHONE_DIGITS_LIMIT[formAreaCode]
			errorTip = t('Label_Join_PhoneNumberErrorTip', {
				digitalArea: limitRange,
			})
		} else {
			clearErrors('phone')
		}

		setPhoneErrorTip(errorTip)
	}

	const checkCurrency = () => {
		const formCurrencyId = getValues('currencyId')

		if (!formCurrencyId) {
			setError('currencyId', {
				type: 'required',
				message: t('Label_Join_RemindPrefferedCurrency') || '',
			})

			// return for submit checking
			return false
		}

		clearErrors('currencyId')
		return true
	}

	const checkAffiliate = async () => {
		const formAffiliate = getValues('affiliate')
		if (!formAffiliate) return true

		// check affiliate is qualified from api
		try {
			const { data: affCurrencyId } = await affiliateCheck({
				affCode: formAffiliate,
			}).unwrap()

			if (Number(affCurrencyId)) {
				selectCurrency(Number(affCurrencyId))

				const options = siteCurrencyList
					.filter(currencyId => currencyId === Number(affCurrencyId))
					.map(currencyId => ({
						value: currencyId,
						label: t(`Label_General_Currency_${currencyId}`),
						prefixOptionIcon: (
							<div
								className={classNames(
									'flag',
									FLAG_PREFIX_ICON_BY_CURRENCIES[currencyId]
								)}
							/>
						),
					}))

				setCurrencyOptions(options)
			}

			clearErrors('affiliate')
			return true
		} catch (error) {
			// error
			setError('affiliate', {
				type: 'invalid',
				message: t('Label_Join_AffiliateIdWrong') || '',
			})
			return false
		}
	}

	const selectCurrency = (newCurrencyId: ISelectProps['value']) => {
		const formCurrencyId = getValues('currencyId')

		if (isNumber(newCurrencyId) && newCurrencyId !== formCurrencyId) {
			setValue('currencyId', newCurrencyId)
			clearErrors('currencyId')

			const areaCode = AREA_CODE_BY_CURRENCY[newCurrencyId]

			if (areaCode) setValue('areaCode', areaCode)
			if (touchedFields['phone']) checkPhone()
		}
	}

	const selectAreaCode = (newAreaCode: ISelectProps['value']) => {
		const formAreaCode = getValues('areaCode')
		if (newAreaCode !== formAreaCode) {
			setValue('areaCode', newAreaCode)
			if (touchedFields['phone']) checkPhone()
		}
	}

	const checkUrlAffiliate = async () => {
		if (!urlAffiliate) return

		try {
			if (urlAffId) {
				const {
					data: { currencyId },
				} = await getAffiliateAgent({ affId: urlAffId as string }).unwrap()

				if (currencyId) {
					selectCurrency(currencyId)
					setValue('affiliate', urlAffId)
				}
			} else if (urlAffCode) {
				const { errorCode } = await affiliateCheck({
					affCode: urlAffCode as string,
				}).unwrap()

				if (errorCode === 0) {
					setValue('affiliate', urlAffCode)
				}
			}
		} catch (error) {
			// error
		}
	}

	const checkLineRegister = () => {
		if (!lineUserId) return

		if (siteCurrencyList.length > 0) {
			selectCurrency(CurrenciesEnum.THB)
		}
	}

	const getBlackbox = async () => {
		let blackbox = ''
		if (
			typeof window !== undefined &&
			typeof (window as any).IGLOO.getBlackbox === 'function'
		) {
			try {
				const result = await (window as any).IGLOO.getBlackbox()
				blackbox = result?.blackbox || ''
			} catch (error) {
				// error
			}
		}

		return blackbox
	}

	const handleSubmitForm = async () => {
		const {
			username,
			password,
			email,
			currencyId: formCurrencyId,
			areaCode,
			phone,
			affiliate,
		} = getValues()

		const currencyCheck = checkCurrency()
		const affCodeCheck = await checkAffiliate()
		// currency & recaptcha & affiliate cannot use form required check
		if (!currencyCheck || !affCodeCheck) return

		const affId = affiliate && urlAffId ? affiliate : null
		const affCode = !urlAffId && affCodeCheck ? affiliate : null

		// use register currency to get langId, if not exist, use default en
		// 在 signUp 時 formCurrencyId 為必填，所以不會是 undefined
		const userLang =
			LANG_GROUPS[CURRENCY_TO_LANG_KEY[formCurrencyId] as string]?.find(
				({ value }) => value === langId
			)?.value ?? 'en'

		const blackbox = await getBlackbox()
		try {
			await signUp({
				affCode: String(affCode),
				affId: String(affId),
				currencyId: formCurrencyId,
				...(joinBy === JoinMethod.Email
					? { email }
					: { areaCode, phoneNo: phone }),
				// reCaptchaToken,
				referralUrl: document.referrer,
				userLang,
				userName: username,
				userpwd: password,
				blackbox,
				langId: userLang,
				lineUserId: lineUserId as string,
			}).unwrap()

			// opera and meta pixel tracker
			OperaPixelTracker('register')
			MetaPixelTracker('registerSubmit')

			router.push(`/${userLang}${paths.deposit.root}`)
		} catch (error) {
			// error
			modal.error((error as Error).message)
		}
	}

	useEffect(() => {
		checkUrlAffiliate()
	}, [])

	useEffect(() => {
		checkLineRegister()
	}, [siteCurrencyList])

	const { by: joinBy } = query

	useEffect(() => {
		if (![JoinMethod.Email, JoinMethod.Number].includes(joinBy as JoinMethod)) {
			router.replace({
				pathname: paths.join.root,
				query: { by: JoinMethod.Number },
			})
		}
	}, [joinBy])

	return (
		<form
			className='joinloginFunction'
			onSubmit={handleSubmit(handleSubmitForm)}
		>
			<div className='title'>{t('Label_Join_QuickRegistration')}</div>
			<div className='tab'>
				{/* inner <a /> are for css selectors (a.active) to work */}
				<Link href={`?by=${JoinMethod.Number}`}>
					<a className={joinBy === JoinMethod.Number ? 'active' : ''}>
						{t('Label_Join_ByNumber')}
					</a>
				</Link>
				<Link href={`?by=${JoinMethod.Email}`}>
					<a className={joinBy === JoinMethod.Email ? 'active' : ''}>
						{t('Label_Join_ByEmail')}
					</a>
				</Link>
			</div>
			{currencyId === CurrenciesEnum.THB && <LineRegister />}
			<div className='inputModule'>
				<InputBox
					register={register('username', {
						required: { value: true, message: t('Label_General_UsernameReq') },
						pattern: {
							value: USERNAME_REGEX,
							message: t('Label_General_UserNameLength') || '',
						},
						onBlur: checkUsername,
					})}
					requiredIcon
					placeholder={t('Label_General_Username') || ''}
					loading={existsUsernameLoading}
					errorMessage={errors['username']?.message as string}
					error={!!errors['username']}
					touched={!!touchedFields['username']}
					successMessage={t('Label_Join_CantChangeUsername') || ''}
					infoMessage={t('Label_Join_UsernameTooltip') || ''}
				/>
				<InputBox
					register={register('password', {
						required: {
							value: true,
							message: t('Label_General_PasswordRequired'),
						},
						pattern: {
							value: PASSWORD_REGEX,
							message: t('Label_General_PasswordValidate') || '',
						},
						onBlur: () => trigger('password'),
					})}
					password
					requiredIcon
					placeholder={t('Label_General_Password') || ''}
					errorMessage={errors['password']?.message as string}
					error={!!errors['password']}
					touched={!!touchedFields['password']}
				/>

				{joinBy === 'email' ? (
					<>
						<Select
							// * 如果 Aff Input 有相對應的幣別，則使用 currencyOptions（Aff 過濾的幣別選項）
							options={
								currencyOptions.length === 0
									? currencySelectOptions
									: currencyOptions
							}
							value={getValues('currencyId')}
							placeholder={t('Label_Join_PrefferedCurrency') as string}
							requiredIcon
							onChange={selectCurrency}
							errorMessage={errors['currencyId']?.message as string}
						/>
						<div className='tip active'>
							{(errors['currencyId']?.message as string) ||
								t('Label_Join_CantChangePreferredCurrency')}
						</div>
						<InputBox
							register={register('email', {
								pattern: {
									value: EMAIL_REGEX,
									message: t('Label_Join_MailWrongFormat') || '',
								},
								onBlur: checkEmail,
							})}
							requiredIcon
							placeholder={t('Label_General_Email') || ''}
							loading={existsEmailLoading}
							errorMessage={errors['email']?.message as string}
							error={!!errors['email']}
							touched={getValues('email') && !!touchedFields['email']}
							successMessage={t('Label_Join_CantChangeEmail') || ''}
							infoMessage={t('Label_Join_EmailToolTip') || ''}
						/>
					</>
				) : (
					<>
						<div className='input-group'>
							<Select
								// * 如果 Aff Input 有相對應的幣別，則使用 currencyOptions（Aff 過濾的幣別選項）
								options={
									currencyOptions.length === 0
										? currencySelectOptions
										: currencyOptions
								}
								value={getValues('currencyId')}
								placeholder={t('Label_Join_PrefferedCurrency') as string}
								requiredIcon
								onChange={selectCurrency}
								errorMessage={errors['currencyId']?.message as string}
							/>
							<Select
								showSearch
								options={areaCodeSelectOptions}
								placeholder=''
								requiredIcon
								onChange={selectAreaCode}
								value={getValues('areaCode')}
								errorMessage={phoneErrorTip}
								showValue
							/>
							<InputBox
								register={register('phone', {
									required: {
										value: true,
										message: t('Label_Join_PhoneRequired'),
									},
									onBlur: checkPhone,
								})}
								requiredIcon
								placeholder={t('Label_General_Phone') as string}
								error={!!errors['phone'] || !!phoneErrorTip}
								touched={!!touchedFields['phone']}
								type='number'
							/>
						</div>
						<div
							className={classNames('tip active', { 'txt-red': phoneErrorTip })}
						>
							{phoneErrorTip || t('Label_Join_CantChangePhone')}
						</div>
					</>
				)}
				{includes(
					ALLOWED_CURRENCIES['AFFILIATE'] as CurrenciesEnum[],
					currencyId
				) && (
					<InputBox
						register={register('affiliate', {
							onBlur: checkAffiliate,
						})}
						icon='icon icon-affiliate txt-blue'
						placeholder={t('Label_Join_Affiliate_ID') as string}
						errorMessage={errors['affiliate']?.message as string}
						error={!!errors['affiliate']}
						touched={!!touchedFields['affiliate']}
						infoMessage={t('Label_Join_Please_Enter_Affiliate_ID') as string}
						// If has url affiliate and has value in affiliate input, the affiliate is qualified.
						readOnly={!!urlAffiliate && !!getValues('affiliate')}
					/>
				)}
			</div>
			<div className='Terms'>
				{t('Label_Join_SignUpTerms1')}
				<a
					className='txt-blue'
					target='_blank'
					rel='noreferrer'
					href={TERMS_CONDITIONS({ langId: 'en' })['TermsConditions']}
				>
					{t('Label_Join_SignUpTerms2')}
				</a>
				{t('Label_Join_SignUpTerms3')}
			</div>
			<div className='btnGroup'>
				<button
					className='btn-check primary'
					style={{ textTransform: 'uppercase' }}
					type='submit'
				>
					{t('Label_General_Register')}
				</button>
			</div>
		</form>
	)
}

export { Form }
