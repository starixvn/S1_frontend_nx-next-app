import {
	AREA_CODE,
	AREA_CODE_BY_CURRENCY,
	EMAIL_REGEX,
	PHONE_DIGITS_LIMIT,
	PHONE_LENGTH_REGEX,
	USERNAME_REGEX,
} from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import {
	FlagEnum,
	useResetPwdByOTPMutation,
	useSetForgetPasswordMutation,
} from '@nx-next-app/service'
import { pick } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import {
	Controller,
	SubmitHandler,
	useForm,
	useFormContext,
} from 'react-hook-form'
import { InputBox, Select } from '../common'

interface ForgetPasswordFormProps {
	onOtpSent: () => void
	onEmailSent: () => void
	onCancel: () => void
}

interface ForgetPasswordFormData {
	username: string
	email?: string
	phone?: string
	areaCode?: string
	method: 'email' | 'phone'
}

const ForgetPasswordForm = ({
	onOtpSent,
	onEmailSent,
	onCancel,
}: ForgetPasswordFormProps) => {
	const { t } = useTranslation()
	const { langId, currencyId } = useAuth().userInfo
	const formContext = useFormContext()

	const {
		watch,
		trigger,
		register,
		setError,
		getValues,
		handleSubmit,
		control,
		formState,
	} = useForm<ForgetPasswordFormData>({ mode: 'onTouched' })

	const [resetPwdByOTP, { isLoading: isSendingOTP }] =
		useResetPwdByOTPMutation()
	const [setForgetPassword, { isLoading: isSendingEmail }] =
		useSetForgetPasswordMutation()

	const isLoading = isSendingOTP || isSendingEmail

	const { errors, touchedFields } = formState

	const areaCodeSelectOptions = Object.values(AREA_CODE).map(
		({ AreaCode }) => ({ value: AreaCode, label: AreaCode })
	)

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

	const onSubmit: SubmitHandler<ForgetPasswordFormData> = async data => {
		const { username, email, phone, method, areaCode } = data

		// 將 ResetPasswordWithOtp 需要的 username 存入 context
		formContext.setValue('username', username)

		switch (method) {
			case 'email':
				try {
					await setForgetPassword({
						username,
						langId,
						email,
						flag: FlagEnum.hasLang,
					}).unwrap()
					onEmailSent()
				} catch (error) {
					setError('email', pick(error, 'message'))
				}
				break
			case 'phone':
				try {
					await resetPwdByOTP({
						userName: username,
						phoneNo: phone,
						areaCode,
					}).unwrap()
					onOtpSent()
				} catch (error) {
					setError('phone', pick(error, 'message'))
				}
				break
			default:
				break
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='inputModule'>
				<div className='title'>{t('Label_General_ForgetPsw')}</div>
				<InputBox
					register={register('username', {
						required: t('Label_General_UsernameReq'),
						pattern: {
							value: USERNAME_REGEX,
							message: t('Label_General_UserNameLength'),
						},
					})}
					placeholder={t('Label_General_Username')}
					errorMessage={errors['username']?.message as string}
					error={!!errors['username']}
					touched={!!touchedFields['username']}
					loading={isLoading}
				/>
				<Controller
					name='method'
					control={control}
					rules={{ required: true }}
					render={({ field: { onChange, value } }) => (
						<Select
							options={[
								{ label: t('Label_General_Email'), value: 'email' },
								{ label: t('Label_General_Phone'), value: 'phone' },
							]}
							placeholder={t('Label_General_VerificationBy')}
							value={value}
							onChange={(value: 'email' | 'phone') => onChange(value)}
							error={!!errors['method']}
						/>
					)}
				/>
				{watch('method') === 'email' && (
					<InputBox
						register={register('email', {
							pattern: {
								value: EMAIL_REGEX,
								message: t('Label_Join_MailWrongFormat'),
							},
							required: t('Label_Profile_EmailReq'),
						})}
						placeholder={t('Label_General_Email')}
						errorMessage={errors['email']?.message as string}
						error={!!errors['email']}
						touched={!!touchedFields['email']}
						loading={isLoading}
					/>
				)}
				{watch('method') === 'phone' && (
					<>
						<div className='input-group'>
							<Controller
								name='areaCode'
								rules={{ required: true }}
								defaultValue={AREA_CODE_BY_CURRENCY[currencyId]}
								control={control}
								render={({ field: { onChange, value } }) => (
									<Select
										showSearch
										options={areaCodeSelectOptions}
										value={value}
										onChange={(value: string) => {
											onChange(value)
											if (getValues('phone')) trigger('phone')
										}}
										error={!!errors['areaCode']}
									/>
								)}
							/>
							<InputBox
								register={register('phone', {
									required: t('Label_Join_PhoneRequired'),
									validate: validatePhone,
								})}
								placeholder={t('Label_General_Phone') as string}
								error={!!errors['phone']}
								touched={!!touchedFields['phone']}
								type='number'
								loading={isLoading}
							/>
						</div>
						{errors['phone'] && (
							<div className='tip active'>{errors['phone'].message}</div>
						)}
					</>
				)}
				<div className='btnGroup'>
					{onCancel && (
						<button className='ghost' onClick={onCancel}>
							{t('Label_General_Cancel')}
						</button>
					)}
					<button type='submit' className='primary' disabled={isLoading}>
						{watch('method') === 'phone'
							? t('Label_Get_OTP')
							: t('Label_General_Submit')}
					</button>
				</div>
			</div>
		</form>
	)
}

export default ForgetPasswordForm
