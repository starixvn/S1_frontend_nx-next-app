import ReCAPTCHA from 'react-google-recaptcha'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { Select, InputPhone, ISelectProps } from '@nx-next-app/components/H0001'
import {
	AREA_CODE,
	PHONE_DIGITS_LIMIT,
	PHONE_LENGTH_REGEX,
	AREA_CODE_BY_CURRENCY,
	RECAPTCHAT_LANG_BY_LANG_ID,
} from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useGetRecaptchaInfoQuery } from '@nx-next-app/service'

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

	const { data: { data: recaptchaInfo } = {} } = useGetRecaptchaInfoQuery()

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
		} else if (
			Object.values(AREA_CODE_BY_CURRENCY).includes(formAreaCode) &&
			!PHONE_LENGTH_REGEX.test(formAreaCode + formPhone)
		) {
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
					type='number'
				/>
			)}
			{/*
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
      */}
			<div className='btn-group'>
				<button type='submit'>{t('Label_General_Join')}</button>
			</div>
		</>
	)
}

export { Step2 }
