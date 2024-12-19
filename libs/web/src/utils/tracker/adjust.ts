import { BaseTrackerEvent } from 'libs/web/src/utils/tracker/tracker'
import { isEmpty } from 'lodash-es'

// Adjust event tokens, setting at Adjust backend
const ADJUST_EVENT_TOKENS: Record<BaseTrackerEvent, string> = {
	registerSubmit: 's1nlnl',
	depositSubmit: 'jhabe7',
	Purchase: '9ltx7u',
	withdraw: 'htp2ba',
	CompleteRegistration: 'qicnkd',
	StartTrial: 'usae2m',
	redeposit: 'yce21w',
}

// 檢查 Adjust SDK
const isSDKAvailable = (win: Window = window): boolean =>
	!isEmpty(process.env['NEXT_PUBLIC_ADJUST_TOKEN']) &&
	win?.Adjust !== undefined &&
	typeof win?.Adjust.initSdk === 'function' &&
	typeof win?.Adjust.trackEvent === 'function'

export const AdjustTracker = (
	eventName: string,
	currency?: string,
	revenue?: number,
	eventParams?: Record<string, unknown>
) => {
	if (!isSDKAvailable(window)) return

	// 取得event對應的 token
	const eventToken = ADJUST_EVENT_TOKENS[eventName as BaseTrackerEvent]
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
		...(currency && { currency }),
		...(revenue && { revenue }),
		...(partnerParams && { partnerParams }),
	})
}

// Adjust 的初始化 function
// 需在 env 添加 app token，沒加不會 work
// 此block未來會移往gtm中管理
export const initAdjustSDK = () => {
	if (isSDKAvailable(window)) {
		window.Adjust?.initSdk({
			appToken: process.env['NEXT_PUBLIC_ADJUST_TOKEN'] || '',
			environment: 'sandbox',
			logLevel: 'verbose',
		})
	}
}
