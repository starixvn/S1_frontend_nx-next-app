import React from 'react'
import { useTranslation } from 'next-i18next'
import { InputBox, Form } from '@nx-next-app/components/D0006'
import { useForm } from 'react-hook-form'
import { PASSWORD_REGEX } from '@nx-next-app/constants'

type ResetPasswordFormType = {
	otpCode: string
	password: string
	confirmPassword: string
}

interface IResetPasswordFormProps {
	loading: boolean
	onSubmit: (value: ResetPasswordFormType) => void
}

const ResetPasswordForm = ({ loading, onSubmit }: IResetPasswordFormProps) => {
	const { t } = useTranslation()
	const {
		register,
		handleSubmit,
		formState,
		trigger,
		getFieldState,
		getValues,
		setError,
	} = useForm<ResetPasswordFormType>()
	const { errors, touchedFields } = formState

	return (
		<div className='joinloginFunction'>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<div className='title txt-blue'>{t('Label_ForgetPsw')} !</div>
				<div className='inputModule'>
					<div className='inputBox-blue'>
						<input
							{...register('otpCode')}
							placeholder={t('Label_OTP') as string}
						/>
					</div>

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
						touched={!!touchedFields['password']}
						loading={loading}
						placeholder={t('Label_ChangePassword_NewPassword') as string}
						errorMessage={errors['password']?.message as string}
						error={!!errors['password']}
					/>
					<InputBox
						register={register('confirmPassword', {
							required: { value: true, message: t('Label_Join_ConfirmPwdReq') },
							onBlur: async () => {
								await trigger('confirmPassword')
								const { error } = getFieldState('confirmPassword')
								const formConfirmPwd = getValues('confirmPassword')
								const formPassword = getValues('password')
								if (error) return

								if (formConfirmPwd !== formPassword) {
									setError('confirmPassword', {
										type: 'mismatch',
										message: t('Label_Join_ConfirmPwdNotMatch') || '',
									})
								}
							},
						})}
						password
						touched={!!touchedFields['confirmPassword']}
						loading={loading}
						placeholder={t('Label_Join_ConfirmPassword') as string}
						errorMessage={errors['confirmPassword']?.message as string}
						error={!!errors['confirmPassword']}
					/>
				</div>
				<div className='btnGroup'>
					<button className='orange'>{t('Label_General_Submit')}</button>
				</div>
			</Form>
		</div>
	)
}

export { ResetPasswordForm, type ResetPasswordFormType }
