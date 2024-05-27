type ReactNativeWebViewMessage =
	| { type: 'SyncCurrency'; payload: number }
	| { type: 'SyncLanguage'; payload: string }

interface IReactNativeWebView {
	postMessage: (message: string) => void
}

export const isReactNativeWebView = () =>
	typeof window !== 'undefined' &&
	'ReactNativeWebView' in window &&
	window.ReactNativeWebView != null

const postMsgToApp = (message: ReactNativeWebViewMessage) => {
	if (!isReactNativeWebView()) return

	const { ReactNativeWebView } = window as typeof window & {
		ReactNativeWebView?: IReactNativeWebView
	}

	const { postMessage } = ReactNativeWebView ?? {}

	if (typeof postMessage === 'function') {
		postMessage(JSON.stringify(message))
	}
}

export const isInApp = isReactNativeWebView

export const getDeviceType = () =>
	isInApp() ? 3 : Number(process.env['NEXT_PUBLIC_DEVICE_TYPE'])

export const setAppCurrency = (currencyId: number) =>
	postMsgToApp({ type: 'SyncCurrency', payload: currencyId })

export const setAppLanguage = (langCode: string) =>
	postMsgToApp({ type: 'SyncLanguage', payload: langCode })
