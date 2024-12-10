// 廣告商用的事件記錄器

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
	}

	switch (eventName) {
		case 'CompleteRegistration':
			window.fbq('track', eventName, {}, { eventID })
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
			break
	}
}
