import { WrapperChangePassWord } from '@nx-next-app/features/F0001/desktop/change-password/styles'
import { useChangePasswordFetcher } from '@nx-next-app/hooks'
import { useTranslation } from 'next-i18next'
import { ChangePasswordForm } from './ChangePasswordForm'

const ChangePassword = () => {
	const { t } = useTranslation()
	const { changePasswordForm, onSetChangePassword } = useChangePasswordFetcher(
		{}
	)

	return (
		<div className='rightModule'>
			<WrapperChangePassWord>
				<div className='infoModule'>
					<div className='inside-title'>
						<div className='group-icon-title'>
							<i className='icon icon-lock-2-fill' />
							{t('Label_General_ChangePassword')}
						</div>
					</div>
					<div className='inside-body'>
						<ChangePasswordForm
							onSubmit={onSetChangePassword}
							changePasswordForm={changePasswordForm}
							isPopup={false}
						/>
					</div>
				</div>
			</WrapperChangePassWord>
		</div>
	)
}

export default ChangePassword
