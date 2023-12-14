import ReCAPTCHA from 'react-google-recaptcha'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import {
	Select,
	InputBox,
	InputPhone,
	ISelectProps,
} from '@nx-next-app/components/H0006'
import {
	AREA_CODE,
	EMAIL_REGEX,
	PHONE_DIGITS_LIMIT,
	PHONE_LENGTH_REGEX,
	RECAPTCHAT_LANG_BY_LANG_ID,
} from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import {
	useLazyExistsEmailQuery,
	useGetRecaptchaInfoQuery,
} from '@nx-next-app/service'

interface IStep2Props {
	selectCurrency: (newCurrencyId: ISelectProps['value']) => void
	currencySelectOptions: ISelectProps['options']
}

const Step2 = ({ selectCurrency, currencySelectOptions }: IStep2Props) => {
	const { t } = useTranslation()

	const {
		userInfo: { langId },
	} = useAuth()

	const {
		formState,
		watch,
		trigger,
		setError,
		setValue,
		register,
		getValues,
		clearErrors,
		getFieldState,
	} = useFormContext()

	const { errors, touchedFields } = formState
	const watchCurrencyId = watch('currencyId')

	const [checkExistsEmail] = useLazyExistsEmailQuery()

	const { data: { data: recaptchaInfo } = {} } = useGetRecaptchaInfoQuery()

	const checkEmail = async () => {
		await trigger('email')
		const { error } = getFieldState('email')
		if (error) return

		// check email duplicate from api
		const formEmail = getValues('email')

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
		if (error) return

		const formAreaCode = getValues('areaCode')
		const formPhone = getValues('phone')

		if (!formAreaCode) {
			setError('phone', {
				type: 'required',
				message: t('Label_Join_PhoneRequired') as string,
			})
		} else if (!PHONE_LENGTH_REGEX.test(formAreaCode + formPhone)) {
			const limitRange = PHONE_DIGITS_LIMIT[formAreaCode]
			if (limitRange) {
				setError('phone', {
					type: 'length',
					message: t('Label_Join_PhoneNumberErrorTip', {
						digitalArea: limitRange,
					}) as string,
				})
			}
		} else {
			clearErrors('phone')
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

	const areaCodeSelectOptions = Object.values(AREA_CODE).map(el => ({
		value: el.AreaCode,
		label: `${el.AreaCode} ${el.Name}`,
	}))

	return (
		<>
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
				errorMessage={errors['email']?.message as string}
				error={!!errors['email']}
				touched={!!touchedFields['email']}
				infoMessage={t('Label_Join_EmailToolTip') as string}
			/>
			<Select
				options={currencySelectOptions}
				value={getValues('currencyId')}
				placeholder={t('Label_Join_PrefferedCurrency') as string}
				prefixIcon={<i className='icon icon-coin-dollar' />}
				onChange={currencyId => selectCurrency(currencyId)}
				errorMessage={errors['currencyId']?.message as string}
				infoMessage={t('Label_Join_CantChangePreferredCurrency') as string}
			/>
			{!!errors['currencyId'] && (
				<div className='tip active'>
					{errors['currencyId']?.message as string}
				</div>
			)}
			{watchCurrencyId && (
				<InputPhone
					register={register('phone', {
						required: {
							value: true,
							message: t('Label_Join_PhoneRequired'),
						},
						onBlur: checkPhone,
					})}
					icon='icon icon-phone'
					placeholder={t('Label_General_Phone') as string}
					error={!!errors['phone']}
					touched={!!touchedFields['phone']}
					infoMessage={t('Label_Join_CantChangePhone') as string}
					selectOptions={areaCodeSelectOptions}
					className='parts parts-xs'
					errorMessage={errors['phone']?.message as string}
					onChangeSelect={areaCode => selectAreaCode(areaCode)}
					selectValue={getValues('areaCode')}
					showValue
				/>
			)}
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
			<div className='btn-group'>
				<button type='submit'>{t('Label_General_Join')}</button>
			</div>
		</>
	)
}

export { Step2 }
