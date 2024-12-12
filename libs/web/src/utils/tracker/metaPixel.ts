// MetaPixel 需使用 "track" 的官方標準事件
enum StandardEvents {
	CompleteRegistration = 'CompleteRegistration',
	Purchase = 'Purchase',
	StartTrial = 'StartTrial',
}

// SDK check
const isSDKAvailable = (win: Window = window): boolean =>
	win?.fbq !== undefined && typeof win.fbq === 'function'

export const MetaPixelTracker = (
	eventName: string,
	currency?: string,
	amount?: number,
	eventID?: string
) => {
	if (!isSDKAvailable(window)) return
	const action = eventName in StandardEvents ? 'track' : 'trackCustom'
	const params: Record<string, unknown> = {
		currency,
		value: amount,
	}
	window.fbq?.(action, eventName, params, { eventID })
}
