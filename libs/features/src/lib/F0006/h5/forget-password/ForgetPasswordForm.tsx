import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { Form } from '@nx-next-app/components/H0006'

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
		<Form onSubmit={handleSubmit(onSubmit)}>
			<div className='infoModule'>
				<div className='infoModule'>
					<div className='inputBox'>
						<input
							{...register('userName')}
							placeholder={t('Label_General_Username') as string}
						/>
					</div>
				</div>
				<div className='infoModule'>
					<div className='inputBox'>
						<input
							{...register('phone')}
							placeholder={t('Label_General_Phone') as string}
						/>
					</div>
				</div>
			</div>
			<div className='tip active'>{t('Label_ForgetPsw_Tip')}</div>
			<div className='btn-group'>
				<button>{t('Label_Get_OTP')}</button>
			</div>
		</Form>
	)
}

export { ForgetPasswordForm, type ForgetPasswordFormType }
