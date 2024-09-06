import useChangePasswordFetcher from 'libs/web/src/hooks/useChangePasswordFetcher'
import { useTranslation } from 'next-i18next'
import { ChangePasswordForm } from './ChangePasswordForm'

const ChangePassword = () => {
	const { t } = useTranslation()
	const { changePasswordForm, onSetChangePassword } = useChangePasswordFetcher(
		{}
	)

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
					onSubmit={onSetChangePassword}
					changePasswordForm={changePasswordForm}
					isPopup={false}
				/>
			</div>
		</div>
	)
}

export default ChangePassword
