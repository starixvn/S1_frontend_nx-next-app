// 廣告商用的事件記錄器

import Adjust from '@adjustcom/adjust-web-sdk'

// Opera Pixel & Meta Pixel:
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
	if (!(window && 'fbq' in window && typeof window.fbq === 'function')) return

	const trackWithParams = (
		action: string,
		extraParams?: Record<string, unknown>
	) => {
		const params: Record<string, unknown> = {
			currency: isoCode,
			value: amount,
			...extraParams,
		}
		;(window as any).fbq('track', action, params, { eventID })
		trackAdjustEvent(action, { eventID })
	}

	const createPartnerParams = (
		params: Record<string, any>
	): { key: string; value: any }[] => {
		return Object.entries(params).map(([key, value]) => ({
			key,
			value,
		}))
	}

	const trackAdjustEvent = (
		eventName: string,
		eventParams?: Record<string, any>
	) => {
		const partnerParams = eventParams
			? createPartnerParams(eventParams)
			: undefined

		Adjust.trackEvent({
			eventToken: eventName,
			...(isoCode && { currency: isoCode }),
			...(amount && { revenue: amount }),
			...(partnerParams && { partnerParams }), // 動態添加 partnerParams
		})
	}

	switch (eventName) {
		case 'CompleteRegistration':
			window.fbq('track', eventName, {}, { eventID })
			trackAdjustEvent(eventName, { eventID })
			break
		case 'Purchase':
			trackWithParams(firstDeposit ? 'StartTrial' : 'redeposit')
			trackWithParams(eventName)
			break
		case 'withdraw':
			trackWithParams(eventName)
			break
		default:
			window.fbq('trackCustom', eventName, {}, { eventID })
			trackAdjustEvent(eventName, { eventID })
			break
	}
}
