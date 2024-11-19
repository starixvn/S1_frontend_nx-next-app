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
	// 存款成功
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
	amount?: number,
	firstDeposit?: boolean,
	isoCode?: string
) => {
	if (window && 'fbq' in window && typeof window.fbq === 'function') {
		if (eventName === 'CompleteRegistration') {
			window.fbq('track', eventName)
			return
		}
		if (eventName === 'Purchase') {
			if (firstDeposit) {
				window.fbq('track', 'StartTrial', { currency: isoCode, value: amount })
			} else {
				window.fbq('track', 'redeposit', { currency: isoCode, value: amount })
			}
			window.fbq('track', eventName, { currency: isoCode, value: amount })
			return
		}
		if (eventName === 'Purchase') {
			if (firstDeposit) {
				window.fbq('track', 'StartTrial', { currency: isoCode, value: amount })
			}
			window.fbq('track', 'redeposit', { currency: isoCode, value: amount })
			window.fbq('track', eventName, { currency: isoCode, value: amount })
		}
		window.fbq('trackCustom', eventName)
	}
}
