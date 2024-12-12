// Opera Pixel :
// 事件 "register" 綁在 註冊頁 按鈕
// 事件 "deposit" 綁在 deposit 表單的 submit

import { BaseTrackerEvent } from 'libs/web/src/utils/tracker/tracker'

// Adjust event tokens, setting at Adjust backend
const OperaEventName: Record<BaseTrackerEvent, string> = {
	registerSubmit: 'register',
	depositSubmit: 'deposit',
	Purchase: '',
	withdraw: '',
	CompleteRegistration: '',
	StartTrial: '',
	redeposit: '',
}

// SDK check
const isSDKAvailable = (win: Window = window): boolean =>
	win?.otag !== undefined && typeof win.otag === 'function'

export const OperaPixelTracker = (eventName: string) => {
	if (!isSDKAvailable(window)) return

	// 取得對應的eventname, 如果是未定義的先不發tracking
	const eventToken = OperaEventName[eventName as BaseTrackerEvent]
	if (!eventToken) return

	window.otag?.('event', eventName)
}
