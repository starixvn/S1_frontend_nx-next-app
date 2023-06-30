import classNames from 'classnames'
import ReCAPTCHA from 'react-google-recaptcha'
import { isNumber } from 'lodash'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { TmpCookiesObj } from 'cookies-next/lib/types'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { CurrenciesEnum } from '@nx-next-app/types'
import {
	paths,
	AREA_CODE,
	ENV_COOKIE_NAMES,
	CURRENCY_TO_LANG_KEY,
	PHONE_DIGITS_LIMIT,
	AREA_CODE_BY_CURRENCY,
	RECAPTCHAT_LANG_BY_LANG_ID,
	FLAG_PREFIX_ICON_BY_CURRENCIES,
	EMAIL_REGEX,
	PHONE_LENGTH_REGEX,
} from '@nx-next-app/constants'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { ISelectProps, InputBox, Select } from '@nx-next-app/components/D0001'
import {
	useSignupMutation,
	useLazyExistsEmailQuery,
	useGetRecaptchaInfoQuery,
	useLazyExistsUserNameQuery,
	useGetSiteCurrencyListQuery,
	useLazyGetAffiliateAgentQuery,
} from '@nx-next-app/service'
import { LineRegister } from './LineRegister'
import { LoginHint } from './LoginHint'

interface IJoinProps {
	cookies: TmpCookiesObj
}

const Form = ({ cookies }: IJoinProps) => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { LANG_GROUPS, TERMS_CONDITIONS, USERNAME_REGEX, PASSWORD_REGEX } =
		useStaticData()
	const router = useRouter()
	const { query } = router

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

	const { data: { data: recaptchaInfo } = {} } = useGetRecaptchaInfoQuery()

	const [getAffiliateAgent] = useLazyGetAffiliateAgentQuery()

	const [checkExistsUsername, { isFetching: existsUsernameLoading }] =
		useLazyExistsUserNameQuery()

	const [checkExistsEmail, { isFetching: existsEmailLoading }] =
		useLazyExistsEmailQuery()

	const [signUp] = useSignupMutation()

	const [phoneErrorTip, setPhoneErrorTip] = useState<string | undefined>('')
	const watchCurrencyId = watch('currencyId')

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

	const checkPassword = async () => {
		await trigger('password')
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

	const checkRealName = async () => {
		await trigger('realName')
	}

	const checkEmail = async () => {
		await trigger('email')
		const { error } = getFieldState('email')
		const formEmail = getValues('email')
		if (error) return

		// check email duplicate from api
		try {
			const { data: isExistsEmail, message: existsEmailMsg } =
				await checkExistsEmail({ email: formEmail }).unwrap()

			if (isExistsEmail) {
				setError('email', { type: 'duplicate', message: existsEmailMsg })
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
		} else if (!PHONE_LENGTH_REGEX.test(formAreaCode + formPhone)) {
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

	const checkAffiliate = async () => {
		const affiliate =
			query['AffCode'] ||
			cookies['AffCode'] ||
			query['AffId'] ||
			cookies['AffId']

		if (!affiliate) return

		try {
			const {
				data: { currencyId },
			} = await getAffiliateAgent({ affId: affiliate as string }).unwrap()

			if (currencyId) {
				selectCurrency(currencyId)
				setValue('affiliate', affiliate)
			}
		} catch (error) {
			// error
		}
	}

	const checkLineRegister = () => {
		const lineUserId = cookies[ENV_COOKIE_NAMES.LineUserId]
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
		const {
			username,
			password,
			realName,
			email,
			currencyId: formCurrencyId,
			areaCode,
			phone,
			affiliate,
			reCaptchaToken,
		} = getValues()

		const currencyCheck = checkCurrency()

		// currency & recaptcha cannot use form required check
		if (!reCaptchaToken || recaptchaInfo?.country === 'CN' || !currencyCheck)
			return

		const affCode = affiliate && (query['AffCode'] || cookies['AffCode'])
		const affId = affiliate && (query['AffId'] || cookies['AffId'])

		// use register currency to get langId, if not exist, use default en
		const userLang =
			LANG_GROUPS[CURRENCY_TO_LANG_KEY[currencyId] as string].find(
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
				email,
				phoneNo: phone,
				realName,
				reCaptchaToken,
				referralUrl: document.referrer,
				userLang,
				userName: username,
				userpwd: password,
				blackbox,
				langId,
			}).unwrap()

			router.push(`/${userLang}/${paths.deposit.root}`)
		} catch (error) {
			// error
			modal.error((error as Error).message)
		}
	}

	const currencySelectOptions = siteCurrencyList.map(currencyId => ({
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

	useEffect(() => {
		checkAffiliate()
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
						required: { value: true, message: t('Label_General_UsernameReq') },
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
						onBlur: checkPassword,
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
						onBlur: checkRealName,
					})}
					icon='icon-member txt-blue'
					placeholder={t('Label_General_RealName') as string}
					errorMessage={errors['realName']?.message as string}
					error={!!errors['realName']}
					touched={!!touchedFields['realName']}
					infoMessage={t('Label_General_RemindForName') as string}
					successMessage={t('Label_General_RemindForName') as string}
				/>
				<InputBox
					register={register('email', {
						required: { value: true, message: t('Label_Join_MailWrongFormat') },
						pattern: {
							value: EMAIL_REGEX,
							message: t('Label_Join_MailWrongFormat') as string,
						},
						onBlur: checkEmail,
					})}
					icon='icon icon-email txt-blue'
					placeholder={t('Label_General_Email') as string}
					loading={existsEmailLoading}
					errorMessage={errors['email']?.message as string}
					error={!!errors['email']}
					touched={!!touchedFields['email']}
					successMessage={t('Label_Join_CantChangeEmail') as string}
					infoMessage={t('Label_Join_EmailToolTip') as string}
				/>
				<Select
					options={currencySelectOptions}
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
							/>
						</div>
						<div className={`tip active${phoneErrorTip && ' txt-red'}`}>
							{phoneErrorTip || t('Label_Join_CantChangePhone')}
						</div>
					</>
				)}
				<InputBox
					register={register('affiliate')}
					icon='icon icon-affiliate txt-blue'
					placeholder={t('Label_Join_Affiliate_ID') as string}
					errorMessage={errors['affiliate']?.message as string}
					touched={!!touchedFields['affiliate']}
					infoMessage={t('Label_Join_Please_Enter_Affiliate_ID') as string}
				/>
			</div>
			{recaptchaInfo?.siteKey && recaptchaInfo.country !== 'CN' && (
				<div className='g-recaptcha'>
					<ReCAPTCHA
						sitekey={recaptchaInfo.siteKey}
						onChange={token => {
							setValue('reCaptchaToken', token)
						}}
						hl={RECAPTCHAT_LANG_BY_LANG_ID[langId]}
					/>
				</div>
			)}
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
