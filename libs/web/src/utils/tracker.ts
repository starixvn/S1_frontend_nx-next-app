import { isEmpty } from 'lodash-es'

// global.d.ts
declare global {
	interface Window {
		fbq?: (action: string, ...args: any[]) => void
		Adjust?: {
			initSdk: (config: {
				appToken: string
				environment: 'sandbox' | 'production'
				// 有需要才開啟，測試模式使用 verbose 可以顯示所有 sdk 行為，方便確認用戶 uuid
				logLevel?: 'verbose' | 'debug' | 'info' | 'warn' | 'error' | 'assert'
			}) => void
			trackEvent: (params: {
				eventToken: string
				currency?: string
				revenue?: number
				partnerParams?: { key: string; value: any }[]
			}) => void
		}
		otag?: (action: string, eventName: string) => void
	}
}

// Adjust event tokens 映射
const ADJUST_EVENT_TOKENS: Record<MetaPixelTrackerName, string> = {
	registerSubmit: 's1nlnl',
	depositSubmit: 'jhabe7',
	Purchase: '9ltx7u',
	withdraw: 'htp2ba',
	CompleteRegistration: 'qicnkd',
	StartTrial: 'usae2m',
	redeposit: 'yce21w',
} as const

// MetaPixel 需使用 "track" 的官方標準事件
enum TrackEvents {
	CompleteRegistration = 'CompleteRegistration',
	Purchase = 'Purchase',
	StartTrial = 'StartTrial',
}

// Opera Pixel & Meta Pixel :
// 事件 "register" || "registerSubmit" 綁在 註冊頁 按鈕
// 事件 "deposit" || "depositSubmit" 綁在 deposit 表單的 submit

type OperaPixelTrackerName = 'register' | 'deposit'

export type MetaPixelTrackerName =
	| 'registerSubmit'
	| 'depositSubmit'
	| 'Purchase'
	| 'withdraw'
	// 註冊成功
	| 'CompleteRegistration'
	// 首存
	| 'StartTrial'
	// 再存
	| 'redeposit'

const isAdjustSDKValid = (
	adjust: unknown
): adjust is NonNullable<Window['Adjust']> =>
	!isEmpty(process.env['NEXT_PUBLIC_ADJUST_TOKEN']) &&
	!!adjust &&
	typeof (adjust as any).initSdk === 'function' &&
	typeof (adjust as any).trackEvent === 'function'

// 檢查 Adjust
const isAdjustAvailable = (win: Window = window): boolean =>
	win?.Adjust !== undefined && isAdjustSDKValid(win.Adjust)

// 檢查 fbq
const isFbqAvailable = (win: Window = window): boolean =>
	win?.fbq !== undefined && typeof win.fbq === 'function'

export const OperaPixelTracker = (eventName: OperaPixelTrackerName) => {
	if (window && 'otag' in window && typeof window.otag === 'function') {
		window.otag('event', eventName)
	}
}

export const MetaPixelTracker = (
	eventName: MetaPixelTrackerName,
	eventID?: string,
	amount?: number,
	firstDeposit?: boolean,
	isoCode?: string
) => {
	// fbq tracker，自動判斷使用 track 或 trackCustom
	const trackFbq = (
		eventName: string,
		params: Record<string, unknown> = {}
	) => {
		if (!isFbqAvailable(window)) return
		const action = eventName in TrackEvents ? 'track' : 'trackCustom'
		window.fbq?.(action, eventName, params, { eventID })
	}

	// 修改 trackAdjustEvent 函數
	const trackAdjustEvent = (
		eventName: string,
		eventParams?: Record<string, any>
	) => {
		if (!isAdjustAvailable(window)) return

		// 取得對應的 token
		const eventToken = ADJUST_EVENT_TOKENS[eventName as MetaPixelTrackerName]
		if (!eventToken) return

		const createPartnerParams = (
			params: Record<string, any>
		): { key: string; value: any }[] =>
			Object.entries(params).map(([key, value]) => ({
				key,
				value,
			}))

		const partnerParams = eventParams
			? createPartnerParams(eventParams)
			: undefined

		window.Adjust?.trackEvent({
			eventToken, // 使用映射後的 token
			...(isoCode && { currency: isoCode }),
			...(amount && { revenue: amount }),
			...(partnerParams && { partnerParams }),
		})
	}

	// 帶參數的 tracker
	const trackWithParams = (
		action: string,
		extraParams?: Record<string, unknown>
	) => {
		const params: Record<string, unknown> = {
			currency: isoCode,
			value: amount,
			...extraParams,
		}

		trackFbq(action, params)
		trackAdjustEvent(action, { eventID })
	}

	// 基本的追蹤函數（不帶參數）
	const track = (eventName: string) => {
		trackFbq(eventName)
		trackAdjustEvent(eventName, { eventID })
	}

	switch (eventName) {
		case 'CompleteRegistration': {
			track(eventName)
			break
		}
		case 'Purchase': {
			const purchaseEvent = firstDeposit ? 'StartTrial' : 'redeposit'
			trackWithParams(purchaseEvent)
			trackWithParams(eventName)
			break
		}
		case 'withdraw': {
			trackWithParams(eventName)
			break
		}
		default: {
			track(eventName)
			break
		}
	}
}

// Adjust 的初始化 function
// 需在 env 添加 app token，沒加不會 work
export const initAdjustSDK = () => {
	if (isAdjustAvailable(window)) {
		window.Adjust?.initSdk({
			appToken: process.env['NEXT_PUBLIC_ADJUST_TOKEN'] || '',
			environment:
				// 非正式環境都會使用 sandbox 模式，需要從 testing console 做測試，如果需要用 sandbox 做測試，需到 adjust 官方找 script 手動引入
				process.env['NEXT_PUBLIC_ENV'] === 'PRD' ? 'production' : 'sandbox',
			// 正式環境移除降低 log level , 預設只有錯誤會噴 log
			...(process.env['NEXT_PUBLIC_ENV'] === 'PRD' && { logLevel: 'verbose' }),
		})
	}
}
