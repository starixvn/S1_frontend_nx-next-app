import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { IAxiosError, useVerifyEmailMutation } from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const useVerifyEmail = () => {
	const { push, reload } = useRouter()
	const { t } = useTranslation()
	const {
		userInfo: { langId },
		onSignOut,
	} = useAuth()

	const [verifyEmail] = useVerifyEmailMutation()

	const onVerifyEmail = async ({
		key,
		code,
		errorCallBack,
	}: {
		key: string
		code: string
		errorCallBack: (message: string) => void
	}) => {
		const redirectToHome = async ({ message }: { message?: string } = {}) => {
			await onSignOut()
			push(paths.home.root).then(() => reload())
			errorCallBack(message || '')
		}

		// * 驗證 Email 狀況下
		if (key && code) {
			try {
				await verifyEmail({
					langId,
					key,
					code,
				}).unwrap()

				push({ pathname: paths.profile.root, query: {} }, undefined, {
					shallow: true,
				}).then(() => reload())
			} catch (error) {
				const { message, errorCode } = error as IAxiosError

				if (errorCode === 1 || errorCode === 403) {
					redirectToHome()
				} else if (errorCode === 1000) {
					redirectToHome({ message: t('Label_Profile_OTPInvalid') as string })
				} else {
					redirectToHome({ message })
				}
			}
		}
	}

	return { onVerifyEmail }
}

export { useVerifyEmail }
