import { PRODUCTS } from '../app/constants/products'

type ReactNativeWebViewMessage =
	| { type: 'SyncCurrency'; payload: number }
	| { type: 'SyncLanguage'; payload: string }

type ReactNativeWebView = {
	postMessage: (message: string) => void
}

type ReactNativeWebViewWindow = typeof window & {
	ReactNativeWebView: ReactNativeWebView
}

export const isReactNativeWebView = () =>
	typeof window !== 'undefined' &&
	'ReactNativeWebView' in window &&
	window.ReactNativeWebView != null

const postMsgToApp = (message: ReactNativeWebViewMessage) => {
	if (
		isReactNativeWebView() &&
		typeof (window as ReactNativeWebViewWindow)?.ReactNativeWebView
			?.postMessage === 'function'
	) {
		;(window as ReactNativeWebViewWindow).ReactNativeWebView.postMessage(
			JSON.stringify(message)
		)
	}
}

export const isInApp = isReactNativeWebView

export const getDeviceType = () =>
	isInApp() ? 3 : Number(process.env['NEXT_PUBLIC_DEVICE_TYPE'])

export const setAppCurrency = (currencyId: number) =>
	postMsgToApp({ type: 'SyncCurrency', payload: currencyId })

export const setAppLanguage = (langCode: string) =>
	postMsgToApp({ type: 'SyncLanguage', payload: langCode })

const liffExcludedGameIds = new Set<number>([
	PRODUCTS.FishHaiba.tpGameIdNo,
	PRODUCTS.HappyFish5.tpGameIdNo,
	PRODUCTS.MonsterAwaken.tpGameIdNo,
])

export const isGameExcludedFromLiff = (tpGameIdNo?: number) =>
	tpGameIdNo !== undefined && liffExcludedGameIds.has(tpGameIdNo)
