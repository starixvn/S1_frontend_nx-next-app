import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { InputBox } from '@nx-next-app/components/D0001'
import { PASSWORD_REGEX } from '@nx-next-app/constants'

type ResetPasswordFormType = {
	newPassword: string
}
interface IResetPasswordFormProps {
	loading: boolean
	onSubmit: (value: ResetPasswordFormType) => void
}
const ResetPasswordForm = ({ loading, onSubmit }: IResetPasswordFormProps) => {
	const { t } = useTranslation()
	const { register, handleSubmit, formState, trigger } =
		useForm<ResetPasswordFormType>()
	const { errors, touchedFields } = formState

	return (
		<form className='inputModuleRow' onSubmit={handleSubmit(onSubmit)}>
			<InputBox
				className='inputBox-white'
				register={register('newPassword', {
					required: {
						value: true,
						message: t('Label_ChangePassword_PasswordReq'),
					},
					pattern: {
						value: PASSWORD_REGEX,
						message: t('Label_General_PasswordValidate'),
					},
					onBlur: async () => {
						await trigger('newPassword')
					},
				})}
				loading={loading}
				password
				title={t('Label_ChangePassword_NewPassword') || ''}
				touched={!!touchedFields['newPassword']}
				errorMessage={errors['newPassword']?.message as string}
				error={!!errors['newPassword']}
			/>
			<div className='btnGroup'>
				<button
					className='btn-check'
					onClick={handleSubmit(onSubmit)}
					type='submit'
				>
					{t('Label_General_Submit')}
				</button>
			</div>
		</form>
	)
}

export { ResetPasswordForm, type ResetPasswordFormType }
