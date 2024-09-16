import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { setCookie } from 'cookies-next'
import { useBoolean } from 'usehooks-ts'

const useAppDownload = (persistAppDownloadHint: boolean) => {
	const {
		value: isAppDownloadHintActive,
		setFalse: setAppDownloadHintActiveFalse,
	} = useBoolean(!persistAppDownloadHint)

	const onCloseAppDownloadHint = () => {
		setCookie(ENV_COOKIE_NAMES.AppDownloadHint, true)
		setAppDownloadHintActiveFalse()
	}

	return { isAppDownloadHintActive, onCloseAppDownloadHint }
}

export { useAppDownload }
