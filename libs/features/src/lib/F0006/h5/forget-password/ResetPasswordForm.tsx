import React from 'react'
import { useTranslation } from 'next-i18next'
import { InputBox, Form } from '@nx-next-app/components/H0006'
import { useForm } from 'react-hook-form'

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
	const { register, handleSubmit, formState, watch } =
		useForm<ResetPasswordFormType>()
	const password = watch('password')
	const { errors, touchedFields } = formState

	return (
		<div className='joinloginFunction'>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<div className='title txt-blue'>{t('Label_ForgetPsw')} !</div>
				<div className='inputModule'>
					<InputBox
						register={register('otpCode', {
							required: {
								value: true,
								message: t('Label_Profile_OTPInvalid'),
							},
						})}
						touched={!!touchedFields['otpCode']}
						loading={loading}
						placeholder={t('Label_OTP') as string}
						infoMessage={t('Label_Profile_EnterOTPCode') as string}
						errorMessage={errors['otpCode']?.message as string}
						error={!!errors['otpCode']}
					/>
					<InputBox
						register={register('password', {
							required: {
								value: true,
								message: t('Label_Profile_OTPInvalid'),
							},
						})}
						touched={!!touchedFields['password']}
						loading={loading}
						placeholder={t('Label_ChangePassword_NewPassword') as string}
						errorMessage={errors['password']?.message as string}
						error={!!errors['password']}
					/>
					<InputBox
						register={register('confirmPassword', {
							required: {
								value: true,
								message: t('Label_Profile_OTPInvalid'),
							},
							validate: value => value === password,
						})}
						touched={!!touchedFields['confirmPassword']}
						loading={loading}
						placeholder={t('Label_Join_ConfirmPassword') as string}
						errorMessage={errors['confirmPassword']?.message as string}
						error={!!errors['confirmPassword']}
					/>
				</div>
				<div className='btn-group'>
					<button>{t('Label_General_Submit')}</button>
				</div>
			</Form>
		</div>
	)
}

export { ResetPasswordForm, type ResetPasswordFormType }
