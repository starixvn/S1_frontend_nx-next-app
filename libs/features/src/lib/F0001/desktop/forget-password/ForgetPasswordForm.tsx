import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { InputBox, Form } from '@nx-next-app/components/D0001'
import { EMAIL_REGEX } from '@nx-next-app/constants'

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
			<Form
				onSubmit={e => {
					e.preventDefault()
					handleSubmit(onSubmit)
				}}
			>
				<div className='title txt-blue'>{t('Label_Header_ForgetPassword')}</div>
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
						icon='txt-blue icon-email'
						title={t('Label_General_Email') || ''}
						touched={!!touchedFields['email']}
						infoMessage={t('Label_General_ResetPasswordMsg') || ''}
						errorMessage={errors['email']?.message as string}
						error={!!errors['email']}
					/>
				</div>
				<div className='btnGroup'>
					<button
						className='gray'
						onClick={() => {
							onCancel()
						}}
						type='button'
					>
						{t('Label_General_Cancel')}
					</button>
					<button
						className='orange'
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
