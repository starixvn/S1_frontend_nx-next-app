// Opera Pixel :
// 事件 "register" 綁在 註冊頁 按鈕
// 事件 "deposit" 綁在 deposit 表單的 submit

import { BaseTrackerEvent } from 'libs/web/src/utils/tracker/tracker'

const OperaEventName: Record<BaseTrackerEvent, string> = {
	registerSubmit: 'register',
	depositSubmit: 'deposit',
	Purchase: 'Purchase',
	withdraw: 'withdraw',
	CompleteRegistration: 'CompleteRegistration',
	StartTrial: 'StartTrial',
	redeposit: 'redeposit',
}

// SDK check
const isSDKAvailable = (win: Window = window): boolean =>
	win?.otag !== undefined && typeof win.otag === 'function'

export const OperaPixelTracker = (eventName: string) => {
	if (!isSDKAvailable(window)) return

	// 取得對應的eventname
	const eventToken = OperaEventName[eventName as BaseTrackerEvent]
	if (!eventToken) return

	window.otag?.('event', eventToken)
}
