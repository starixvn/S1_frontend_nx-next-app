import { useTranslation } from 'next-i18next'
import { Header } from '@nx-next-app/components/H0001'
import useChangePasswordFetcher from 'libs/web/src/hooks/useChangePasswordFetcher'
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
