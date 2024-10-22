import { Form, InputBox } from '@12b-h5/components/common'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { PASSWORD_REGEX, paths } from '@nx-next-app/constants'
import { useResetPasswordMutation } from '@nx-next-app/service'
import { pick } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IResetPasswordFormProps {
	onBack?: () => void
}

interface ResetPasswordFormData {
	newPassword: string
}

const ResetPasswordForm = ({ onBack }: IResetPasswordFormProps) => {
	const { t } = useTranslation()
	const router = useRouter()
	const { modal } = useGlobalModal()

	const [setResetPassword, { isLoading }] = useResetPasswordMutation()

	const { register, handleSubmit, formState, setError } =
		useForm<ResetPasswordFormData>({ mode: 'onTouched' })
	const { touchedFields, errors } = formState

	const onSubmit: SubmitHandler<ResetPasswordFormData> = async ({
		newPassword,
	}) => {
		try {
			const { message } = await setResetPassword({ newPassword }).unwrap()
			modal.info(message, { onOK: () => router.push(paths.home.root) })
		} catch (error) {
			setError('newPassword', pick(error, 'message'))
		}
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)} className='form-module'>
			<div className='title'>{t('Label_ResetPassword')}</div>
			<InputBox
				password
				loading={isLoading}
				register={register('newPassword', {
					required: t('Label_General_PasswordRequired'),
					pattern: {
						value: PASSWORD_REGEX,
						message: t('Label_General_PasswordValidate'),
					},
				})}
				touched={!!touchedFields['newPassword']}
				placeholder={t('Label_ChangePassword_NewPassword')}
				error={!!errors['newPassword']}
				errorMessage={errors['newPassword']?.message as string}
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
		</Form>
	)
}

export default ResetPasswordForm
