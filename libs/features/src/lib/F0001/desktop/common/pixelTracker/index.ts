// 廣告商用的事件記錄器
// 事件 "register" 綁在 註冊頁 按鈕
// 事件 "deposit" 綁在 deposit 表單的 submit

type PixelTrackerName = 'register' | 'deposit'

export const PixelTracker = (eventName: PixelTrackerName) => {
	if (window && 'otag' in window && typeof window.otag === 'function') {
		window.otag('event', eventName)
	}
}
