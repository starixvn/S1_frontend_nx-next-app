import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useChangePasswordFetcher } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import { ChangePasswordForm } from './ChangePasswordForm'

const ChangePassword = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { changePasswordForm, onSetChangePassword } = useChangePasswordFetcher()
	const { reset } = changePasswordForm

	// ====== 函數 ======

	const showErrorModal = (message: string) => {
		modal.error(message)
	}

	const showInfoModal = () => {
		modal.info(
			[
				t('Label_ChangePassword_ChangePswUpdateSuccess'),
				t('Label_ChangePassword_ChangePswSuccessHint'),
			] as string[],
			{
				icon: 'icon icon-icon32px_password',
				title: t('Label_General_ChangePassword'),
				onOK: reset,
			}
		)
	}

	return (
		<div className='rightModule'>
			<div className='infoModule'>
				<div className='inside-title'>
					<span className='icon icon-icon32px_password'>
						{t('Label_General_ChangePassword')}
					</span>
					<div>{t('Label_ChangePassword_ChangePasswordHint')}</div>
				</div>
				<ChangePasswordForm
					onSubmit={passwordData => {
						onSetChangePassword(passwordData, showInfoModal, showErrorModal)
					}}
					changePasswordForm={changePasswordForm}
					isPopup={false}
				/>
			</div>
		</div>
	)
}

export default ChangePassword
