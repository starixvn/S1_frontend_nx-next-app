import { Header } from '@nx-next-app/components/H0001'
import { WrapperChangePassWordH5 } from '@nx-next-app/features/F0001/h5/change-password/styles'
import { useChangePasswordFetcher } from '@nx-next-app/hooks'
import { useTranslation } from 'next-i18next'
import { ChangePasswordForm } from './ChangePasswordForm'

const ChangePassword = () => {
	const { t } = useTranslation()
	const { changePasswordForm, onSetChangePassword } = useChangePasswordFetcher(
		{}
	)

	return (
		<WrapperChangePassWordH5>
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
		</WrapperChangePassWordH5>
	)
}

export default ChangePassword
