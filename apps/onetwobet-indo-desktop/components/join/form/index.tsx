import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	AREA_CODE,
	AREA_CODE_BY_CURRENCY,
	CURRENCY_TO_LANG_KEY,
	EMAIL_REGEX,
	FLAG_PREFIX_ICON_BY_CURRENCIES,
	PASSWORD_REGEX,
	PHONE_DIGITS_LIMIT,
	PHONE_LENGTH_REGEX,
	USERNAME_REGEX,
	paths,
} from '@nx-next-app/constants'
import { useAuth, useGlobalData, useStaticData } from '@nx-next-app/data-access'
import { useCaptchaContext, useJoin } from '@nx-next-app/operations'
import {
	CaptchaTypeEnum,
	useGetSiteCurrencyListQuery,
	useLazyAffiliateCheckQuery,
	useLazyExistsEmailQuery,
	useLazyExistsUserNameQuery,
	useLazyGetAffiliateAgentQuery,
	useSignupMutation,
} from '@nx-next-app/service'
import { CurrenciesEnum } from '@nx-next-app/types'
import { getQueryParam, tracking } from '@nx-next-app/utils'
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

enum JoinMethod {
	Email = 'email',
	Number = 'number',
}

const Form = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { getBannerUrl } = useGlobalData()
	const { LANG_GROUPS, TERMS_CONDITIONS } = useStaticData()
	const router = useRouter()
	const { query } = router

	const affId = getQueryParam(query, 'affId')
	const affCode = getQueryParam(query, 'affCode')

	const cookies = getCookies()

	const urlAffId = affId || cookies['AffId']
	const urlAffCode = affCode || cookies['AffCode']
	const urlAffiliate = urlAffId || urlAffCode

	const { ALLOWED_CURRENCIES } = useStaticData()
	const { initNationality } = useJoin()

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
	} = useForm({ mode: 'onTouched' })

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
	const { Captcha, getToken, captchaType } = useCaptchaContext()

	const [currencyOptions, setCurrencyOptions] = useState<
		ISelectProps['options']
	>([])

	const filterSiteCurrencyList = () => {
		// 移除中國
		const filterCurrency = [CurrenciesEnum.CNY]
		return siteCurrencyList.filter(
			currencyId => !includes(filterCurrency, currencyId)
		)
	}

	const currencySelectOptions = filterSiteCurrencyList()
		.filter(currencyId => {
			const affiliate = getValues('affiliate')
			const formCurrencyId = getValues('currencyId')

			// 當 affiliate 有效時，僅顯示對應的幣別
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

		try {
			const { data: isExistsUsername, message: existsUsernameMsg } =
				await checkExistsUsername({ username, langId }).unwrap()

			if (isExistsUsername) {
				setError('username', { type: 'duplicate', message: existsUsernameMsg })
			}
		} catch {
			//
		}
	}

	const checkEmail = async () => {
		await trigger('email')
		const { error } = getFieldState('email')
		const formEmail = getValues('email')
		if (error || !formEmail) return // email 格式錯誤或未輸入時不另做 API 檢查
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
		} catch {
			//
		}
	}

	const validatePhone = async () => {
		trigger('areaCode')

		const areaCode = getValues('areaCode')
		const phone = getValues('phone')

		if (!areaCode) return t('Label_Join_PhoneRequired')

		if (
			Object.values(AREA_CODE_BY_CURRENCY).includes(areaCode) &&
			!PHONE_LENGTH_REGEX.test(areaCode + phone)
		) {
			const digitRange = PHONE_DIGITS_LIMIT[areaCode]
			return t('Label_Join_PhoneNumberErrorTip', { digitalArea: digitRange })
		}
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
		} catch {
			setError('affiliate', {
				type: 'invalid',
				message: t('Label_Join_AffiliateIdWrong'),
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
			if (getValues('phone')) trigger('phone')
		}
	}

	const selectAreaCode = (newAreaCode: ISelectProps['value']) => {
		if (getValues('phone')) trigger('phone')
		const formAreaCode = getValues('areaCode')
		if (newAreaCode !== formAreaCode) setValue('areaCode', newAreaCode)
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
		} catch {
			//
		}
	}

	const handleSubmitForm = async () => {
		if (initNationality === 'China') {
			return
		}
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

		const reCaptchaToken =
			captchaType === CaptchaTypeEnum.Number
				? getValues('reCaptchaToken')
				: await getToken()

		// currency & recaptcha & affiliate cannot use form required check
		if (!currencyCheck || !affCodeCheck) return

		const affId = affiliate && urlAffId ? String(affiliate) : null
		const affCode = !urlAffId && affCodeCheck ? String(affiliate) : null

		// use register currency to get langId, if not exist, use default en
		// 在 signUp 時 formCurrencyId 為必填，所以不會是 undefined
		const userLang =
			LANG_GROUPS[CURRENCY_TO_LANG_KEY[formCurrencyId] as string]?.find(
				({ value }) => value === langId
			)?.value ?? 'en'

		try {
			await signUp({
				affCode,
				affId,
				currencyId: formCurrencyId,
				...(joinBy === JoinMethod.Email
					? { email }
					: { areaCode, phoneNo: phone }),
				referralUrl: document.referrer,
				userLang,
				userName: username,
				userpwd: password,
				langId: userLang,
				...(reCaptchaToken && { reCaptchaToken, captchaType }),
			}).unwrap()

			tracking('registerSubmit')
			router.push(`/${userLang}${paths.deposit.root}`)
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	useEffect(() => {
		checkUrlAffiliate()
	}, [])

	const { by: joinBy } = query

	useEffect(() => {
		if (joinBy !== JoinMethod.Email && joinBy !== JoinMethod.Number) {
			router.replace({
				pathname: paths.join.root,
				query: { by: JoinMethod.Number },
			})
		}
	}, [joinBy])

	useEffect(() => {
		if (initNationality === 'China') {
			modal.info(t('Label_Close_Region_Register_Notice'), {
				onOK: () => router.push(paths.home.root),
			})
		}
	}, [initNationality])

	return (
		<form
			className='joinloginFunction'
			onSubmit={handleSubmit(handleSubmitForm)}
		>
			<div className='title'>{t('Label_Join_QuickRegistration')}</div>
			<div className='tab' style={{ textTransform: 'uppercase' }}>
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
			<div className='inputModule'>
				<InputBox
					register={register('username', {
						required: t('Label_General_UsernameReq'),
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
						required: t('Label_General_PasswordRequired'),
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
								errorMessage={errors['phone']?.message as string}
								showValue
							/>
							<InputBox
								register={register('phone', {
									required: t('Label_Join_PhoneRequired'),
									validate: validatePhone,
								})}
								requiredIcon
								placeholder={t('Label_General_Phone') as string}
								error={!!errors['phone']}
								touched={!!touchedFields['phone']}
								type='number'
							/>
						</div>
						<div
							className={classNames('tip active', {
								'txt-red': errors['phone'],
							})}
						>
							{(errors['phone']?.message as string) ||
								t('Label_Join_CantChangePhone')}
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

			<div style={{ textAlign: 'center' }}>
				<Captcha />
			</div>
			{captchaType === CaptchaTypeEnum.Number && (
				<InputBox
					register={register('reCaptchaToken', { required: true })}
					icon='icon txt-blue'
					placeholder={t('Label_General_EnterCaptchaCode') as string}
					errorMessage={errors['reCaptchaToken']?.message as string}
					error={!!errors['reCaptchaToken']}
					touched={!!touchedFields['reCaptchaToken']}
				/>
			)}

			<div className='Terms'>
				{t('Label_Join_SignUpTerms1')}
				<a
					className='txt-blue'
					target='_blank'
					rel='noreferrer'
					href={getBannerUrl(
						TERMS_CONDITIONS({ langId: 'en' })['TermsConditions']
					)}
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
