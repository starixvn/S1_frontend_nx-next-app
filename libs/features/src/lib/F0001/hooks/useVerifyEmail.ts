import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useAuth } from '@nx-next-app/data-access'
import { paths } from '@nx-next-app/constants'
import { IAxiosError, useVerifyEmailMutation } from '@nx-next-app/service'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

const useVerifyEmail = () => {
	const { query, push, reload } = useRouter()

	const { t } = useTranslation()
	const {
		userInfo: { langId },
		onSignOut,
	} = useAuth()

	const { modal } = useGlobalModal()

	const [tokenPassed, setTokenPassed] = useState(false)

	const [verifyEmail] = useVerifyEmailMutation()

	const onVerifyEmail = async ({
		key,
		code,
	}: {
		key: string
		code: string
	}) => {
		const redirectToHome = async ({ message }: { message?: string } = {}) => {
			await onSignOut()
			push(paths.home.root).then(() => reload())

			modal.error(message)
		}

		// * 驗證 Email 狀況下
		if (key && code) {
			try {
				await verifyEmail({
					langId,
					key,
					code,
				}).unwrap()

				setTokenPassed(true)
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
		} else {
			// * 沒有要驗證 Email，直接通過
			setTokenPassed(true)
		}
	}

	useEffect(() => {
		onVerifyEmail({
			key: query['key'] as string,
			code: query['code'] as string,
		})
	}, [])

	return { tokenPassed }
}

export { useVerifyEmail }
