import { ToastBGColorEnum, ToastIconEnum } from '@nx-next-app/components/D0001'
import {
	NotificationTypeEnum,
	useLazyGetCustNotificationQuery,
	useLazySetCustNotificationQuery,
} from '@nx-next-app/service'

import { MetaPixelTracker, MetaPixelTrackerName } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'

/** 財務通知是否禁用。 */
export enum NotificationStateEnum {
	Disable = '0',
	Enabled = '1',
}

/** 通知音效是否禁音。 */
export enum NotificationSoundStateEnum {
	Muted = '0',
	Enabled = '1',
}

/** 發送財務通知需要的參數 */
export type TToastSetting = {
	message: string
	bgColor: ToastBGColorEnum
	iconClassName: ToastIconEnum
	notificationMutedArg: string
}

/**
 * useDepositWithdrawTracker Hook:
 * - 此 Hook 負責處理用戶存款與提款的成功或失敗通知。
 * - 依據通知類型發送事件追蹤、顯示吐司訊息，並播放音效。 */
const useDepositWithdrawTracker = () => {
	const { t } = useTranslation()
	// ======= api =======

	const [getCustNotification] = useLazyGetCustNotificationQuery()
	const [setCustNotification] = useLazySetCustNotificationQuery()

	// ======= 對外函數 =======

	/**
	 * 處理財務通知（ 存款成功／提款成功／存款失敗／提款失敗 ）的函數
	 *  1. 已登入時，每分鐘打一次 getCustNotification 確認是否有財務通知的單號。
	 *	2. 登入完成，也會打一次 getCustNotification ( 有可能用戶存完款就登出，後台尚未審核，所以未通知用戶 )，此時若有單號，則會通知用戶。
	 *  3. 觸發 MetaPixelTracker 事件，通知市場用戶執行當前財務操作成功。
	 *  4. 向用戶發送財務通知訊息。
	 *  5. 調用 setCustNotification 移除該財務通知單號，防止之後再次獲得相同的單號。
	 *
	 * @notificationType - 財務通知類型
	 * @notificationEnabledArg - 是否啟用財務通知
	 * @notificationMutedArg - 是否禁音財務通知音效
	 * @event - 發送給市場的事件
	 * @i18nLabel - 財務通知的訊息
	 * @bgColor - 財務通知的背景色，不同財務通知有不同顏色
	 * @iconClassName - 財務通知的icon，不同財務通知有不同 icon
	 * @showNotificationCallBack - 由各平台傳入的發送財務通知的回調函數，由各平台自定義樣式 */
	const handleNotification = async ({
		notificationType,
		notificationEnabledArg,
		notificationMutedArg,
		event,
		i18nLabel,
		bgColor,
		iconClassName,
		showNotificationCallBack,
	}: {
		notificationType: NotificationTypeEnum
		notificationEnabledArg: string
		notificationMutedArg: string
		event: MetaPixelTrackerName
		i18nLabel: string
		bgColor: ToastBGColorEnum
		iconClassName: ToastIconEnum
		showNotificationCallBack: (toastSetting: TToastSetting) => void
	}) => {
		try {
			const { data: orders = [] } = await getCustNotification({
				notificationType,
			}).unwrap()

			// 若沒有新訂單號，則不進行任何操作
			if (orders.length === 0) return

			const notificationEnabled =
				notificationEnabledArg === NotificationStateEnum.Enabled

			/** 消除該財務通知的所有單號 */
			const orderProcessingPromises = orders.map(
				({ transId, amount = 0, firstDeposit = false, isoCode = '' }) => {
					// 如果有需要通知市場的事件，就發送通知給市場
					if (event)
						MetaPixelTracker(event, transId, amount, firstDeposit, isoCode)

					// 如果財務通知有啟用，就發送通知
					if (notificationEnabled) {
						showNotificationCallBack({
							message: t(i18nLabel, { transId }),
							bgColor,
							iconClassName,
							notificationMutedArg,
						})
					}

					// 移除該財務通知類型的單號，防止之後再次獲得相同的單號
					return setCustNotification({
						notificationType,
						transId,
					}).unwrap()
				}
			)

			await Promise.all(orderProcessingPromises)
		} catch (error) {
			// 忽略
		}
	}

	return {
		handleNotification,
	}
}

export { useDepositWithdrawTracker }
