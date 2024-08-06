// 廣告商用的事件記錄器

// Opera Pixel & Meta Pixel:
// 事件 "register" || "registerSubmit" 綁在 註冊頁 按鈕
// 事件 "deposit" || "depositSubmit" 綁在 deposit 表單的 submit
type OperaPixelTrackerName = 'register' | 'deposit'
export type MetaPixelTrackerName =
	| 'registerSubmit'
	| 'depositSubmit'
	| 'deposit_successful'
	| 'withdraw_successful'

export const OperaPixelTracker = (eventName: OperaPixelTrackerName) => {
	if (window && 'otag' in window && typeof window.otag === 'function') {
		window.otag('event', eventName)
	}
}
export const MetaPixelTracker = (eventName: MetaPixelTrackerName) => {
	if (window && 'fbq' in window && typeof window.fbq === 'function') {
		window.fbq('trackCustom', eventName)
	}
}
