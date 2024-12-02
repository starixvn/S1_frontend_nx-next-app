import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useTranslation } from 'next-i18next'

const ForgetPasswordModal = () => {
	const { closeModal } = useGlobalModal()
	const { t } = useTranslation()
	return (
		<div className='pop'>
			<div className='changePassWordpop active'>
				<button className='icon icon-cross' onClick={closeModal} />
				<div className='icon icon icon-notifi icon-notification-active' />
				<div className='title'>{t('Label_General_ForgetPsw')}</div>
				<div>{t('Label_General_ForgotPwdMailSent')}</div>
				<div className='btnGroup'>
					<button className='btn-primary' onClick={closeModal}>
						{t('Label_General_OK')}
					</button>
				</div>
			</div>
			<i className='icon close-popup icon-close-line' onClick={closeModal} />
		</div>
	)
}

export default ForgetPasswordModal
