import { useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { useSetChangePasswordMutation } from '@nx-next-app/service'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

export type ChangePasswordFormType = {
	oldPassword: string
	newPassword: string
}

interface IUseChangePasswordFetcherProps {
	backChangePassword?: () => void
}

const useChangePasswordFetcher = ({
	backChangePassword,
}: IUseChangePasswordFetcherProps) => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const changePasswordForm = useForm<ChangePasswordFormType>({
		mode: 'onBlur',
	})
	const { reset } = changePasswordForm
	const [setChangePassword] = useSetChangePasswordMutation()

	const onSetChangePassword = async ({
		oldPassword,
		newPassword,
	}: ChangePasswordFormType) => {
		try {
			await setChangePassword({
				oldPassword,
				newPassword,
			}).unwrap()

			modal.info(
				[
					t('Label_ChangePassword_ChangePswUpdateSuccess'),
					t('Label_ChangePassword_ChangePswSuccessHint'),
				] as string[],
				{
					icon: 'icon icon-icon32px_password',
					title: t('Label_General_ChangePassword'),
					onOK: () => {
						reset()
					},
				}
			)
		} catch (error) {
			modal.error((error as Error).message, {
				onOK: () => {
					if (backChangePassword) {
						backChangePassword()
					}
				},
			})
		}
	}

	return { changePasswordForm, onSetChangePassword }
}

export default useChangePasswordFetcher
