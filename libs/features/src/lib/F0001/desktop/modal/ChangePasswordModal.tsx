import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useChangePasswordFetcher } from '@nx-next-app/hooks'
import { useTranslation } from 'next-i18next'
import { ChangePasswordForm } from '../change-password/ChangePasswordForm'

const ChangePasswordModal = () => {
	const { t } = useTranslation()
	const { modal, closeModal } = useGlobalModal()
	const { changePasswordForm, onSetChangePassword } = useChangePasswordFetcher({
		backChangePassword: () => modal.open(<ChangePasswordModal />),
	})

	return (
		<div className='pop'>
			<div className='resetPassWordpop active'>
				<i
					className='close-popup icon-close-line'
					onClick={() => closeModal()}
				/>
				<i className='icon icon icon-notifi icon-notification-active' />
				<div className='title'>{t('Label_General_ChangePassword')}</div>
				<ChangePasswordForm
					onSubmit={onSetChangePassword}
					changePasswordForm={changePasswordForm}
					isPopup
				/>
			</div>
		</div>
	)
}

export default ChangePasswordModal
