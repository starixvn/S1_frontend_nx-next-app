import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { PASSWORD_REGEX, paths } from '@nx-next-app/constants'
import { useResetPwdVerifyOTPMutation } from '@nx-next-app/service'
import { pick } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { InputBox } from '../../common'

interface ResetPasswordFormData {
	otpCode: string
	password: string
}

const ResetPasswordWithOtp = ({ onBack }: { onBack?: () => void }) => {
	const { t } = useTranslation()
	const router = useRouter()
	const { modal } = useGlobalModal()

	const [resetPwdVerifyOTP, { isLoading }] = useResetPwdVerifyOTPMutation()

	const formContext = useFormContext()

	const { register, handleSubmit, formState, setError } =
		useForm<ResetPasswordFormData>({ mode: 'onTouched' })
	const { errors, touchedFields } = formState

	const onSubmit: SubmitHandler<ResetPasswordFormData> = async data => {
		// 由 formContext 取得在第一步存入的 username
		const username = formContext.getValues('username')
		if (!username) return

		const { otpCode, password } = data

		try {
			const { message } = await resetPwdVerifyOTP({
				inputOTPcode: otpCode,
				userName: username,
				newPassword: password,
			}).unwrap()
			modal.info(message, { onOK: () => router.push(paths.home.root) })
		} catch (error) {
			setError('otpCode', pick(error, 'message'))
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='inputModule'>
				<div className='title'>{t('Label_ResetPassword')}</div>
				<InputBox
					loading={isLoading}
					register={register('otpCode', { required: ' ' })}
					touched={!!touchedFields['otpCode']}
					placeholder={t('Label_OTP')}
					error={!!errors['otpCode']}
					errorMessage={errors['otpCode']?.message as string}
				/>
				<InputBox
					password
					loading={isLoading}
					register={register('password', {
						required: t('Label_General_PasswordRequired'),
						pattern: {
							value: PASSWORD_REGEX,
							message: t('Label_General_PasswordValidate'),
						},
					})}
					touched={!!touchedFields['password']}
					placeholder={t('Label_ChangePassword_NewPassword')}
					error={!!errors['password']}
					errorMessage={errors['password']?.message as string}
				/>
				<div className='btn-group'>
					<button className='primary'>{t('Label_General_Submit')}</button>
				</div>
				{onBack && (
					<a onClick={onBack}>
						<i className='icon icon-keyboard_arrow_left' />
						{t('Label_General_Back')}
					</a>
				)}
			</div>
		</form>
	)
}

export default ResetPasswordWithOtp
