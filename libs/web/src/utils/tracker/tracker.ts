import { AdjustTracker } from 'libs/web/src/utils/tracker/adjust'
import { MetaPixelTracker } from 'libs/web/src/utils/tracker/metaPixel'
import { OperaPixelTracker } from 'libs/web/src/utils/tracker/operaPixel'

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

// 各tracker共用, 以metaPixel event為基底
// 未來如果新增event請至import的各第三方tracker中新增mapping
export type BaseTrackerEvent =
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

export const tracking = (
	eventName: BaseTrackerEvent,
	eventID?: string,
	amount?: number,
	currency?: string,
	firstDeposit?: boolean
) => {
	// 封裝所有第三方track function
	// 如果新增其他第三方track就在這邊新增呼叫
	const trackEvent = (eventName: string) => {
		OperaPixelTracker(eventName)
		MetaPixelTracker(eventName, currency, amount, eventID)
		AdjustTracker(eventName, currency, amount, { eventID })
	}

	switch (eventName) {
		// Purchase事件多紀錄首存或是再存
		case 'Purchase': {
			const purchaseEvent = firstDeposit ? 'StartTrial' : 'redeposit'
			trackEvent(purchaseEvent)
			trackEvent(eventName)
			break
		}
		default: {
			trackEvent(eventName)
			break
		}
	}
}
