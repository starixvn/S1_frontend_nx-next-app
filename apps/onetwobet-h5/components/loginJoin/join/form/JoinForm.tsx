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
import { useAuth, useGlobalData, useStaticData } from '@nx-next-app/data-access'
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
	const { getBannerUrl } = useGlobalData()
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

		try {
			const { data: isExistsUsername, message: existsUsernameMsg } =
				await checkExistsUsername({ username, langId }).unwrap()

			if (isExistsUsername) {
				setError('username', { type: 'duplicate', message: existsUsernameMsg })
			}
		} catch {
			//
		}

		return true
	}

	const checkAffiliate = async () => {
		const formAffiliate = getValues('affiliate')
		if (!formAffiliate || urlAffiliate) return true

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
			setError('affiliate', {
				type: 'invalid',
				message: t('Label_Join_AffiliateIdWrong'),
			})
			return false
		}
	}

	const [checkExistsEmail] = useLazyExistsEmailQuery()

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

	const selectAreaCode = (newAreaCode: ISelectProps['value']) => {
		const formAreaCode = getValues('areaCode')
		if (newAreaCode !== formAreaCode) {
			setValue('areaCode', newAreaCode)

			const formPhone = getValues('phone')
			if (formPhone) trigger('phone')
		}
	}
	const areaCodeSelectOptions = Object.values(AREA_CODE).map(
		({ AreaCode }) => ({ value: AreaCode, label: AreaCode })
	)

	const checkEmail = async () => {
		await trigger('email')
		const { error } = getFieldState('email')
		const formEmail = getValues('email')
		if (error) return

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

	return (
		<div className='form-content'>
			<InputBox
				register={register('username', {
					required: t('Label_General_UsernameReq'),
					pattern: {
						value: USERNAME_REGEX,
						message: t('Label_General_UserNameLength'),
					},
					onBlur: checkUsername,
				})}
				requiredIcon
				placeholder={t('Label_General_Username')}
				errorMessage={errors['username']?.message as string}
				error={!!errors['username']}
				touched={!!touchedFields['username']}
				infoMessage={t('Label_Join_UsernameTooltip')}
			/>
			<InputBox
				register={register('password', {
					required: t('Label_General_PasswordRequired'),
					pattern: {
						value: PASSWORD_REGEX,
						message: t('Label_General_PasswordValidate'),
					},
				})}
				password
				requiredIcon
				placeholder={t('Label_General_Password')}
				errorMessage={errors['password']?.message as string}
				error={!!errors['password']}
				touched={!!touchedFields['password']}
			/>
			{joinBy === JoinMethod.Number && (
				<InputPhone
					register={register('phone', {
						required: t('Label_Join_PhoneRequired'),
						validate: validatePhone,
					})}
					placeholder={t('Label_General_Phone')}
					error={!!errors['phone']}
					touched={!!touchedFields['phone']}
					selectOptions={areaCodeSelectOptions}
					className='parts parts-xs'
					errorMessage={errors['phone']?.message as string}
					onChangeSelect={selectAreaCode}
					selectValue={getValues('areaCode')}
					type='number'
					requiredIcon
				>
					<Select
						requiredIcon
						options={currencySelectOptions}
						value={getValues('currencyId')}
						placeholder={t('Label_General_Currency')}
						onChange={currencyId => {
							selectCurrency(currencyId)
							if (getValues('phone')) trigger('phone')
						}}
						errorMessage={errors['currencyId']?.message as string}
					/>
				</InputPhone>
			)}
			{joinBy === JoinMethod.Email && (
				<>
					<div className='infoModule'>
						<Select
							options={currencySelectOptions}
							value={getValues('currencyId')}
							placeholder={t('Label_Join_PrefferedCurrency')}
							requiredIcon
							onChange={selectCurrency}
							errorMessage={errors['currencyId']?.message as string}
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
								message: t('Label_Join_MailWrongFormat'),
							},
							onBlur: checkEmail,
						})}
						requiredIcon
						placeholder={t('Label_General_Email')}
						errorMessage={errors['email']?.message as string}
						error={!!errors['email']}
						touched={!!touchedFields['email']}
						infoMessage={t('Label_Join_EmailToolTip')}
					/>
				</>
			)}
			<InputBox
				register={register('affiliate', { onBlur: checkAffiliate })}
				placeholder={t('Label_Join_Affiliate_ID')}
				errorMessage={errors['affiliate']?.message as string}
				error={!!errors['affiliate']}
				touched={!!touchedFields['affiliate']}
				infoMessage={t('Label_Join_Please_Enter_Affiliate_ID')}
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
				{t('Label_Join_SignUpTerms1')}
				{'  '}
				<a
					rel='noreferrer'
					target='_blank'
					href={getBannerUrl(
						TERMS_CONDITIONS({ langId: 'en' })['TermsConditions']
					)}
				>
					{t('Label_Join_SignUpTerms2')}
				</a>
				{t('Label_Join_SignUpTerms3')}
			</div>
		</div>
	)
}

export { JoinForm }
