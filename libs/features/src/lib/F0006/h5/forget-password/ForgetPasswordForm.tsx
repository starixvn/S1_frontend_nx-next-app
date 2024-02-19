import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { Form } from '@nx-next-app/components/H0006'
import { AREA_CODE, CURRENCY_TO_LANG_KEY } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'

type ForgetPasswordFormType = {
	userName: string
	phone: string
}
interface IForgetPasswordFormProps {
	onSubmit: (value: ForgetPasswordFormType) => void
}
const ForgetPasswordForm = ({ onSubmit }: IForgetPasswordFormProps) => {
	const {
		userInfo: { currencyId },
	} = useAuth()
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

				<div className='infoModule parts parts-xs'>
					<div className='phone'>
						<div className='inputBox'>
							<i className='icon icon-phone' />
							<input
								value={
									AREA_CODE[CURRENCY_TO_LANG_KEY[currencyId].toUpperCase()]
										.AreaCode
								}
								readOnly
							/>
						</div>
						<div className='inputBox'>
							<input
								{...register('phone')}
								placeholder={t('Label_General_Phone') as string}
							/>
						</div>
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
