import { Form, InputBox } from '@nx-next-app/components/H0001'
import { PASSWORD_REGEX } from '@nx-next-app/constants'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'

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
		<Form onSubmit={handleSubmit(onSubmit)}>
			<InputBox
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
			<div className='btn-group'>
				<button
					onClick={handleSubmit(onSubmit)}
					type='submit'
					className='btn-primary'
				>
					{t('Label_General_Submit')}
				</button>
			</div>
		</Form>
	)
}

export default ResetPasswordForm
