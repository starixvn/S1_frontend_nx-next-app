import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { InputBox, Form } from '@nx-next-app/components/D0006'
import { USERNAME_REGEX } from '@nx-next-app/constants'

type ForgetPasswordFormType = {
	userName: string
	phone: string
}
interface IForgetPasswordFormProps {
	loading: boolean
	onSubmit: (value: ForgetPasswordFormType) => void
}
const ForgetPasswordForm = ({
	loading,
	onSubmit,
}: IForgetPasswordFormProps) => {
	const { t } = useTranslation()
	const { register, handleSubmit, formState, trigger } =
		useForm<ForgetPasswordFormType>()
	const { errors, touchedFields } = formState

	return (
		<div className='joinloginFunction'>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<div className='title txt-blue'>{t('Label_ForgetPsw')} !</div>
				<div className='inputModule'>
					<InputBox
						register={register('userName', {
							required: {
								value: true,
								message: t('Label_General_UsernameReq'),
							},
							pattern: {
								value: USERNAME_REGEX,
								message: t('Label_General_UserNameLength'),
							},
							onBlur: async () => {
								await trigger('userName')
							},
						})}
						touched={!!touchedFields['userName']}
						loading={loading}
						placeholder={t('Label_General_Username') as string}
						infoMessage={t('Label_ForgetPsw_UserNameInfo')}
						errorMessage={errors['userName']?.message as string}
						error={!!errors['userName']}
					/>
					<InputBox
						register={register('phone', {
							required: {
								value: true,
								message: t('Label_Join_PhoneRequired'),
							},
							onBlur: async () => {
								await trigger('phone')
							},
						})}
						touched={!!touchedFields['phone']}
						loading={loading}
						placeholder={t('Label_General_Phone') as string}
						infoMessage={t('Label_ForgetPsw_PhoneInfo')}
						errorMessage={errors['phone']?.message as string}
						error={!!errors['phone']}
					/>
					<div className='tip active'>{t('Label_ForgetPsw_Tip')}</div>
				</div>
				<div className='btnGroup'>
					<button className='orange'>{t('Label_Get_OTP')}</button>
				</div>
			</Form>
		</div>
	)
}

export { ForgetPasswordForm, type ForgetPasswordFormType }
