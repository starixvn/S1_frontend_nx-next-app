import { Header } from '@nx-next-app/components/H0006'
import { useChangePasswordFetcher } from '@nx-next-app/hooks'
import { useTranslation } from 'next-i18next'
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
				<div>
					<ChangePasswordForm
						onSubmit={onSetChangePassword}
						changePasswordForm={changePasswordForm}
					/>
				</div>
			</main>
		</>
	)
}

export default ChangePassword
