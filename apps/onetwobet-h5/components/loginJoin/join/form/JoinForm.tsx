import { InputBox, InputPhone } from '@apps/onetwobet-h5/components/common'
import Select, {
	ISelectProps,
} from '@apps/onetwobet-h5/components/common/select'
import {
	AREA_CODE,
	AREA_CODE_BY_CURRENCY,
	EMAIL_REGEX,
	FLAG_PREFIX_ICON_BY_CURRENCIES,
	PASSWORD_REGEX,
	PHONE_DIGITS_LIMIT,
	PHONE_LENGTH_REGEX,
	USERNAME_REGEX,
} from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import {
	useLazyAffiliateCheckQuery,
	useLazyExistsEmailQuery,
	useLazyExistsUserNameQuery,
} from '@nx-next-app/service'
import classNames from 'classnames'
import { getCookies } from 'cookies-next'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'
import { JoinMethod } from '..'

interface IJoinFormProps {
	siteCurrencyList: number[]
	selectCurrency: (newCurrencyId: ISelectProps['value']) => void
	setCurrencyOptions: (options: ISelectProps['options']) => void
	currencySelectOptions: ISelectProps['options']
}

const JoinForm = ({
	siteCurrencyList,
	selectCurrency,
	currencySelectOptions,
	setCurrencyOptions,
}: IJoinFormProps) => {
	const { t } = useTranslation()
	const router = useRouter()
	const { query } = router
	const { by: joinBy } = query

	const { TERMS_CONDITIONS } = useStaticData()
	const {
		userInfo: { langId },
	} = useAuth()

	const cookies = getCookies()

	const urlAffId = query['AffId'] || cookies['AffId']
	const urlAffCode = query['AffCode'] || cookies['AffCode']
	const urlAffiliate = urlAffId || urlAffCode

	const {
		formState,
		trigger,
		register,
		setError,
		getValues,
		clearErrors,
		getFieldState,
		setValue,
	} = useFormContext()
	const { errors, touchedFields } = formState

	const [affiliateCheck] = useLazyAffiliateCheckQuery()
	const [checkExistsUsername] = useLazyExistsUserNameQuery()

	const checkUsername = async () => {
		await trigger('username')
		const { error } = getFieldState('username')
		const username = getValues('username')
		if (error) return false

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

		return true
	}

	const checkAffiliate = async () => {
		const formAffiliate = getValues('affiliate')
		if (!formAffiliate || urlAffiliate) return true

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

	return (
		<div className='form-content'>
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
				errorMessage={errors['username']?.message as string}
				error={!!errors['username']}
				touched={!!touchedFields['username']}
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
			/>{' '}
			{joinBy === JoinMethod.Number && (
				<InputPhone
					register={register('phone', {
						required: {
							value: true,
							message: t('Label_Join_PhoneRequired'),
						},
						onBlur: checkPhone,
					})}
					placeholder={t('Label_General_Phone') as string}
					error={!!errors['phone']}
					touched={!!touchedFields['phone']}
					// infoMessage={t('Label_Join_CantChangePhone') as string}
					selectOptions={areaCodeSelectOptions}
					className='parts parts-xs'
					errorMessage={errors['phone']?.message as string}
					onChangeSelect={selectAreaCode}
					selectValue={getValues('areaCode')}
					showValue
					type='number'
					requiredIcon
				>
					<Select
						requiredIcon
						options={currencySelectOptions}
						value={getValues('currencyId')}
						// placeholder={t('Label_Join_PrefferedCurrency') as string}
						onChange={currencyId => {
							selectCurrency(currencyId)
							checkPhone()
						}}
						errorMessage={errors['currencyId']?.message as string}
						// infoMessage={t('Label_Join_CantChangePreferredCurrency') as string}
					/>
				</InputPhone>
			)}
			{joinBy === JoinMethod.Email && (
				<>
					<div className='infoModule'>
						<Select
							options={currencySelectOptions}
							value={getValues('currencyId')}
							placeholder={t('Label_Join_PrefferedCurrency') as string}
							requiredIcon
							onChange={selectCurrency}
							errorMessage={errors['currencyId']?.message as string}
							infoMessage={
								t('Label_Join_CantChangePreferredCurrency') as string
							}
						/>
					</div>
					{!!errors['currencyId'] && (
						<div className='tip active'>
							{errors['currencyId']?.message as string}
						</div>
					)}
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
						errorMessage={errors['email']?.message as string}
						error={!!errors['email']}
						touched={!!touchedFields['email']}
						infoMessage={t('Label_Join_EmailToolTip') || ''}
					/>
				</>
			)}
			<InputBox
				register={register('affiliate', {
					onBlur: checkAffiliate,
				})}
				placeholder={t('Label_Join_Affiliate_ID') as string}
				errorMessage={errors['affiliate']?.message as string}
				error={!!errors['affiliate']}
				touched={!!touchedFields['affiliate']}
				infoMessage={t('Label_Join_Please_Enter_Affiliate_ID') as string}
				// If has url affiliate and has value in affiliate input, the affiliate is qualified.
				readOnly={!!urlAffiliate && !!getValues('affiliate')}
			/>
			<div className='btn-group'>
				<button
					type='submit'
					className='primary'
					style={{ textTransform: 'uppercase' }}
				>
					{t('Label_General_Register')}
				</button>
			</div>
			<div className='Terms'>
				{t('Label_Join_SignUpTerms1')} &nbsp;
				<a
					rel='noreferrer'
					target='_blank'
					href={TERMS_CONDITIONS({ langId: 'en' })['TermsConditions']}
				>
					{t('Label_Join_SignUpTerms2')}
				</a>
				{t('Label_Join_SignUpTerms3')}
			</div>
		</div>
	)
}

export { JoinForm }
