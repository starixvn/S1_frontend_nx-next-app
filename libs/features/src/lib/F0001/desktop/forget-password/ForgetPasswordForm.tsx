import { Form, InputBox } from '@nx-next-app/components/D0001'
import { EMAIL_REGEX } from '@nx-next-app/constants'
import { upperFirst } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'

type ForgetPasswordFormType = {
	email: string
}
interface IForgetPasswordFormProps {
	loading: boolean
	onCancel: () => void
	onSubmit: (value: ForgetPasswordFormType) => void
}
const ForgetPasswordForm = ({
	loading,
	onCancel,
	onSubmit,
}: IForgetPasswordFormProps) => {
	const { t } = useTranslation()
	const { register, handleSubmit, formState, trigger } =
		useForm<ForgetPasswordFormType>()
	const { errors, touchedFields } = formState

	return (
		<div className='joinloginFunction'>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<div className='heading-form'>{t('Label_Header_ForgetPassword')}</div>
				<div className='inputModule'>
					<InputBox
						register={register('email', {
							required: {
								value: true,
								message: t('Label_Join_MailWrongFormat'),
							},
							pattern: {
								value: EMAIL_REGEX,
								message: t('Label_Join_MailWrongFormat'),
							},
							onBlur: async () => {
								await trigger('email')
							},
						})}
						loading={loading}
						icon='icon-mail-fill'
						placeholder={t('Label_General_Email') || ''}
						touched={!!touchedFields['email']}
						infoMessage={
							t('Label_General_ResetPasswordMsg', {
								site: upperFirst(process.env['NEXT_PUBLIC_SITE_NAME'] || ''),
							}) || ''
						}
						errorMessage={errors['email']?.['message']}
						error={!!errors['email']}
					/>
				</div>
				<div className='btnGroup'>
					<button
						className='btn-secondary'
						onClick={() => {
							onCancel()
						}}
						type='button'
					>
						{t('Label_General_Cancel')}
					</button>
					<button
						className='btn-primary'
						onClick={handleSubmit(onSubmit)}
						type='submit'
					>
						{t('Label_General_Submit')}
					</button>
				</div>
			</Form>
		</div>
	)
}

export { ForgetPasswordForm, type ForgetPasswordFormType }
