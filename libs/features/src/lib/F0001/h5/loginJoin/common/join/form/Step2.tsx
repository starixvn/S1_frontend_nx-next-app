import {
	ISelectProps,
	InputBox,
	InputPhone,
	Select,
} from '@nx-next-app/components/H0001'
import {
	AREA_CODE,
	AREA_CODE_BY_CURRENCY,
	EMAIL_REGEX,
	PHONE_DIGITS_LIMIT,
	PHONE_LENGTH_REGEX,
} from '@nx-next-app/constants'
import { useJoin } from '@nx-next-app/features/F0001/hooks'
import { useLazyExistsEmailQuery } from '@nx-next-app/service'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

dayjs.extend(customParseFormat)

interface IStep2Props {
	selectCurrency: (newCurrencyId: ISelectProps['value']) => void
	currencySelectOptions: ISelectProps['options']
}

const Step2 = ({ selectCurrency, currencySelectOptions }: IStep2Props) => {
	const { t } = useTranslation()
	const { initNationality, countrySelectOptions } = useJoin()

	const legalBirthYear = dayjs().subtract(18, 'year').year()

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

	// Email
	const checkEmail = async () => {
		await trigger('email')
		const { error } = getFieldState('email')
		const formEmail = getValues('email')
		if (error) return

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

	// Birth
	const yearOptions = []
	for (let y = legalBirthYear; y >= legalBirthYear - 59; y -= 1) {
		yearOptions.push({ label: y, value: y })
	}

	const monthOptions = []
	for (let m = 1; m <= 12; m += 1) {
		monthOptions.push({ label: t(`Label_Profile_Month${m}`), value: m })
	}

	watch('formBirthMonth')
	watch('formBirthYear')
	const dayOptions = []
	const dayByMonth = dayjs()
		.year(getValues('formBirthYear') ?? legalBirthYear)
		.month(getValues('formBirthMonth') - 1) // month start from 0 (January)
		.daysInMonth()
	for (let d = 1; d <= dayByMonth; d += 1) {
		dayOptions.push({ label: d, value: d })
	}

	useEffect(() => {
		setValue('formBirthMonth', 1)
		setValue('formBirthDay', 1)
		setValue('formBirthYear', 1990)
	}, [])

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
				isDropdown={false}
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

			<InputBox
				register={register('email', {
					pattern: {
						value: EMAIL_REGEX,
						message: t('Label_Join_MailWrongFormat') || '',
					},
					onBlur: checkEmail,
				})}
				icon='icon-member txt-blue'
				placeholder={t('Label_General_Email') || ''}
				errorMessage={errors['email']?.message as string}
				error={!!errors['email']}
				touched={!!touchedFields['email']}
				infoMessage={t('Label_Join_EmailToolTip') || ''}
			/>

			<div className='infoModule parts'>
				<Select
					options={monthOptions}
					placeholder='MM'
					defaultValue={1}
					prefixIcon={<i className='icon icon-cake' />}
					onChange={m => setValue('formBirthMonth', m as number)}
					value={getValues('formBirthMonth')}
				/>
				<Select
					options={dayOptions}
					placeholder='DD'
					defaultValue={1}
					onChange={d => setValue('formBirthDay', d as number)}
					value={getValues('formBirthDay')}
				/>
				<Select
					options={yearOptions}
					placeholder='YYYY'
					defaultValue={1990}
					onChange={y => setValue('formBirthYear', y as number)}
					value={getValues('formBirthYear')}
				/>
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

			<div className='btn-group'>
				<button type='submit'>{t('Label_General_Join')}</button>
			</div>
		</>
	)
}

export { Step2 }
