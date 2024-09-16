import { useChangePasswordFetcher } from '@nx-next-app/hooks'
import { useTranslation } from 'next-i18next'
import Header from '../header'
import { ChangePasswordForm } from './ChangePasswordForm'

const ChangePassword = () => {
	const { t } = useTranslation()
	const { changePasswordForm, onSetChangePassword } = useChangePasswordFetcher(
		{}
	)

	return (
		<>
			<Header className='header'>
				<div className='title'>{t('Label_General_ChangePassword')}</div>
			</Header>
			<main className='main'>
				<ChangePasswordForm
					onSubmit={onSetChangePassword}
					changePasswordForm={changePasswordForm}
				/>
			</main>
		</>
	)
}

export default ChangePassword
