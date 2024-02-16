import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { Form } from '@nx-next-app/components/D0006'

type ForgetPasswordFormType = {
	userName: string
	phone: string
}
interface IForgetPasswordFormProps {
	onSubmit: (value: ForgetPasswordFormType) => void
}
const ForgetPasswordForm = ({ onSubmit }: IForgetPasswordFormProps) => {
	const { t } = useTranslation()
	const { register, handleSubmit } = useForm<ForgetPasswordFormType>()

	return (
		<div className='joinloginFunction'>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<div className='title txt-blue'>{t('Label_ForgetPsw')} !</div>
				<div className='inputModule'>
					<div className='inputBox-blue'>
						<input
							{...register('userName')}
							placeholder={t('Label_General_Username') as string}
						/>
					</div>

					<div className='inputBox-blue'>
						<input
							{...register('phone')}
							placeholder={t('Label_General_Phone') as string}
						/>
					</div>

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
