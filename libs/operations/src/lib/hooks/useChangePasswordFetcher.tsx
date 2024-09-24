import { useSetChangePasswordMutation } from '@nx-next-app/service'
import { useForm } from 'react-hook-form'

export type TChangePasswordForm = {
	oldPassword: string
	newPassword: string
}

const useChangePasswordFetcher = () => {
	const changePasswordForm = useForm<TChangePasswordForm>({
		mode: 'onBlur',
	})

	const [setChangePassword] = useSetChangePasswordMutation()

	const onSetChangePassword = async (
		{ oldPassword, newPassword }: TChangePasswordForm,
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
