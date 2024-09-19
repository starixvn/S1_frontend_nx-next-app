import { useSetChangePasswordMutation } from '@nx-next-app/service'
import { useForm } from 'react-hook-form'

export type ChangePasswordFormType = {
	oldPassword: string
	newPassword: string
}

const useChangePasswordFetcher = () => {
	const changePasswordForm = useForm<ChangePasswordFormType>({
		mode: 'onBlur',
	})

	const [setChangePassword] = useSetChangePasswordMutation()

	const onSetChangePassword = async (
		{ oldPassword, newPassword }: ChangePasswordFormType,
		infoCallBack: () => void,
		errorCallBack: (message: string) => void
	) => {
		try {
			await setChangePassword({
				oldPassword,
				newPassword,
			}).unwrap()

			infoCallBack()
		} catch (error) {
			errorCallBack((error as Error).message)
		}
	}

	return { changePasswordForm, onSetChangePassword }
}

export { useChangePasswordFetcher }
