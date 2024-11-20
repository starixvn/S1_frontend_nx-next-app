import { ISelectProps, InputBox, Select } from '@nx-next-app/components/D0001'
import DateSelector from '@nx-next-app/components/D0001/dateSelector'
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
	REALNAME_REGEX,
	USERNAME_REGEX,
	paths,
} from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useJoin } from '@nx-next-app/features/F0001/hooks'
import {
	useGetRecaptchaInfoQuery,
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
import { TmpCookiesObj } from 'cookies-next/lib/types'
import dayjs from 'dayjs'
import { isNumber } from 'lodash'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useForm } from 'react-hook-form'
import { LineRegister } from './LineRegister'
import { LoginHint } from './LoginHint'

interface IJoinProps {
	cookies: TmpCookiesObj
}

const Form = ({ cookies }: IJoinProps) => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { LANG_GROUPS, TERMS_CONDITIONS } = useStaticData()
	const router = useRouter()
	const { query } = router
	const affId = getQueryParam(query, 'affId')
	const affCode = getQueryParam(query, 'affCode')

	const urlAffId = affId || cookies['AffId']
	const urlAffCode = affCode || cookies['AffCode']
	const urlAffiliate = urlAffId || urlAffCode
	const lineUserId = cookies[ENV_COOKIE_NAMES.LineUserId]

	const { ALLOWED_CURRENCIES } = useStaticData()
	const { initNationality, countrySelectOptions } = useJoin()
	const { executeRecaptcha } = useGoogleReCaptcha()

	const {
		formState,
		reset,
		watch,
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
	const { data: { data: recaptchaInfoData } = {} } = useGetRecaptchaInfoQuery()

	const [checkExistsEmail, { isFetching: existsEmailLoading }] =
		useLazyExistsEmailQuery()

	const [signUp] = useSignupMutation()

	const [formBirth, setFormBirth] = useState<Date | null>(
		new Date('1990-01-01')
	)
	const [phoneErrorTip, setPhoneErrorTip] = useState<string | undefined>('')
	const [currencyOptions, setCurrencyOptions] = useState<
		ISelectProps['options']
	>([])

	const watchCurrencyId = watch('currencyId')
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

	const checkConfirmPwd = async () => {
		await trigger('confirmPwd')
		const { error } = getFieldState('confirmPwd')
		const formConfirmPwd = getValues('confirmPwd')
		const formPassword = getValues('password')
		if (error) return

		if (formConfirmPwd !== formPassword) {
			setError('confirmPwd', {
				type: 'mismatch',
				message: t('Label_Join_ConfirmPwdNotMatch') || '',
			})
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

	const legalBirth = dayjs().subtract(18, 'year')
	const handleBirthChange = ({ date }: { date: Date | null }) => {
		setFormBirth(date)
		setValue('birth', date)
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

			if (areaCode) {
				setValue('areaCode', areaCode)
			} else {
				setValue('areaCode', undefined)
			}

			// reset phone input
			setValue('phone', '')
			clearErrors('phone')
			setPhoneErrorTip('')
		}
	}

	const selectAreaCode = (newAreaCode: ISelectProps['value']) => {
		const formAreaCode = getValues('areaCode')
		if (newAreaCode !== formAreaCode) {
			setValue('areaCode', newAreaCode)

			// If phone input is not empty, trigger phone check
			const formPhone = getValues('phone')
			if (formPhone) {
				checkPhone()
			}
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

	const handleCancel = () => {
		reset()
		router.push('/')
	}

	const handleSubmitForm = async () => {
		// opera and meta pixel tracker
		OperaPixelTracker('register')
		MetaPixelTracker('registerSubmit')
		const {
			username,
			password,
			realName,
			email,
			birth,
			nationality,
			currencyId: formCurrencyId,
			areaCode,
			phone,
			affiliate,
		} = getValues()
		const currencyCheck = checkCurrency()
		const affCodeCheck = await checkAffiliate()

		// 目前只有 nova 需要 google recaptcha，因為 Yashbet 外面沒有包ㄧ層 GReCaptchaProviders
		// 會找不到 executeRecaptcha 壞掉 需要在此排除
		// 中國地區不需驗證
		const reCaptchaAction = 'signup'
		let reCaptchaToken
		if (
			process.env['NEXT_PUBLIC_SITE_ID'] === '1' &&
			recaptchaInfoData?.country !== 'CN'
		) {
			if (!executeRecaptcha) return
			reCaptchaToken = await executeRecaptcha(reCaptchaAction)
		}

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
				// 因 cookies 有機會是 string[] 導致錯誤
				affCode: affCode as string,
				affId: affId as string,
				areaCode,
				currencyId: formCurrencyId,
				phoneNo: phone,
				realName,
				email,
				reCaptchaToken,
				Birth_d: birth ? dayjs(birth).format('DD') : 0,
				Birth_m: birth ? dayjs(birth).format('MM') : 0,
				Birth_y: birth ? dayjs(birth).format('YYYY') : 0,
				nationality: nationality ?? initNationality,
				reCaptchaAction,
				referralUrl: document.referrer,
				userLang,
				userName: username,
				userpwd: password,
				blackbox,
				langId: userLang,
				lineUserId: lineUserId as string,
			}).unwrap()

			MetaPixelTracker('CompleteRegistration')

			router.push(`/${userLang}${paths.deposit.root}`)
		} catch (error) {
			// error
			modal.error((error as Error).message)
		}
	}

	useEffect(() => {
		checkUrlAffiliate()
		setValue('birth', formBirth) // 初始form裡面的生日值
	}, [])

	useEffect(() => {
		checkLineRegister()
	}, [siteCurrencyList])

	return (
		<form
			className='joinloginFunction'
			onSubmit={handleSubmit(handleSubmitForm)}
		>
			<LoginHint />
			{currencyId === CurrenciesEnum.THB && <LineRegister />}
			<div className='inputModule'>
				<InputBox
					register={register('username', {
						required: {
							value: true,
							message: t('Label_General_UsernameReq'),
						},
						pattern: {
							value: USERNAME_REGEX,
							message: t('Label_General_UserNameLength') || '',
						},
						onBlur: checkUsername,
					})}
					icon='icon-member txt-blue'
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
					icon='icon icon-key txt-blue'
					placeholder={t('Label_General_Password') || ''}
					errorMessage={errors['password']?.message as string}
					error={!!errors['password']}
					touched={!!touchedFields['password']}
				/>
				<InputBox
					register={register('confirmPwd', {
						required: { value: true, message: t('Label_Join_ConfirmPwdReq') },
						onBlur: checkConfirmPwd,
					})}
					password
					icon='icon icon-key txt-blue'
					placeholder={t('Label_Join_ConfirmPassword') || ''}
					errorMessage={errors['confirmPwd']?.message as string}
					error={!!errors['confirmPwd']}
					touched={!!touchedFields['confirmPwd']}
				/>
				<InputBox
					register={register('realName', {
						required: { value: true, message: t('Label_Join_RealNameReq') },
						pattern: {
							value: REALNAME_REGEX,
							message: t('Label_Join_EnterRealName') || '',
						},
						onBlur: () => trigger('realName'),
					})}
					icon='icon-member txt-blue'
					placeholder={t('Label_General_RealName') as string}
					errorMessage={errors['realName']?.message as string}
					error={!!errors['realName']}
					touched={!!touchedFields['realName']}
					infoMessage={t('Label_General_RemindForName') as string}
				/>
				<InputBox
					register={register('email', {
						pattern: {
							value: EMAIL_REGEX,
							message: t('Label_Join_MailWrongFormat') || '',
						},
						onBlur: checkEmail,
					})}
					icon='icon-email txt-blue'
					placeholder={t('Label_General_Email') || ''}
					loading={existsEmailLoading}
					errorMessage={errors['email']?.message as string}
					error={!!errors['email']}
					touched={getValues('email') && !!touchedFields['email']}
					successMessage={t('Label_Join_CantChangeEmail') || ''}
					infoMessage={t('Label_Join_EmailToolTip') || ''}
				/>

				<div className='inputBox-row'>
					<div
						className='inputBox-blue'
						style={{ width: 'auto', cursor: 'pointer' }}
					>
						<DateSelector
							{...register('birth')}
							selected={formBirth}
							onChange={date => handleBirthChange({ date })}
							maxDate={dayjs(legalBirth).toDate()}
							placeholderText='DD/MM/YYYY'
							closeOnScroll
							showDisabledMonthNavigation
							showYearDropdown
						/>
						<div className='iconModule' style={{ cursor: 'default' }}>
							<i className='icon icon-calendar' />
						</div>
						{/* <div className='tip active txt-red'>
							{errors['birth']?.message as string}
						</div> */}
					</div>
					<Select
						showSearch
						isTranslation
						options={countrySelectOptions}
						defaultValue={initNationality}
						value={getValues('nationality')}
						placeholder={t('Label_Join_Nationality') as string} // TODO: 請ＰＭ給完整i18n
						prefixIcon={<i className='icon icon-sphere txt-blue' />}
						onChange={value => {
							setValue('nationality', value)
						}}
						errorMessage={errors['nationality']?.message as string}
					/>
				</div>

				<Select
					// * 如果 Aff Input 有相對應的幣別，則使用 currencyOptions（Aff 過濾的幣別選項）
					options={
						currencyOptions.length === 0
							? currencySelectOptions
							: currencyOptions
					}
					value={getValues('currencyId')}
					placeholder={t('Label_Join_PrefferedCurrency') as string}
					prefixIcon={<i className='icon icon-coin-dollar txt-blue' />}
					onChange={currencyId => selectCurrency(currencyId)}
					errorMessage={errors['currencyId']?.message as string}
				/>
				<div className='tip active'>
					{(errors['currencyId']?.message as string) ||
						t('Label_Join_CantChangePreferredCurrency')}
				</div>
				{watchCurrencyId && (
					<>
						<div className='phone'>
							<Select
								showSearch
								options={areaCodeSelectOptions}
								placeholder=''
								prefixIcon={<i className='icon icon-phone txt-blue' />}
								onChange={areaCode => selectAreaCode(areaCode)}
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
								placeholder={t('Label_General_Phone') as string}
								error={!!errors['phone'] || !!phoneErrorTip}
								touched={!!touchedFields['phone']}
								type='number'
							/>
						</div>
						<div className={`tip active${phoneErrorTip && ' txt-red'}`}>
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
					href={TERMS_CONDITIONS({ langId })['TermsConditions']}
				>
					{t('Label_Join_SignUpTerms2')}
				</a>
				{t('Label_Join_SignUpTerms3')}
			</div>
			<div className='btnGroup'>
				<button type='button' className='btn-cancel' onClick={handleCancel}>
					{t('Label_General_Cancel')}
				</button>
				<button className='btn-check' type='submit'>
					{t('Label_General_Submit')}
				</button>
			</div>
		</form>
	)
}

export { Form }
