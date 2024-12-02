import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useChangePasswordFetcher } from '@nx-next-app/hooks'
import { useTranslation } from 'next-i18next'
import { ChangePasswordForm } from '../change-password/ChangePasswordForm'

const ChangePasswordModal = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { changePasswordForm, onSetChangePassword } = useChangePasswordFetcher({
		backChangePassword: () => modal.open(<ChangePasswordModal />),
	})

	return (
		<div className='pop'>
			<div className='resetPassWordpop active'>
				<div className='title'>
					<i className='icon icon-icon32px_password' />
					{t('Label_General_ChangePassword')}
				</div>
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
