import {
	useLazySetCustNotificationQuery,
	useLazyGcetCustNotificationQuery,
	NotificationTypeEnum,
} from '@nx-next-app/service'
import { MetaPixelTracker } from '@nx-next-app/utils'

/** 此 hook 負責 FB 廣告追蹤，如果使用者存款成功，觸發 MetaPixelTracker 事件（ 臉書通知 ）通知市場 */
const useDepositWithdrawTracker = () => {
	// ======= api =======

	const [getCustNotification] = useLazyGcetCustNotificationQuery()
	const [setCustNotification] = useLazySetCustNotificationQuery()

	// ======= 對外函數 =======

	/** 登入時，確認使用者是否有存款成功／使用者未登出時，每分鐘確認使用者是否有存款成功。
	 *  如果有成功，觸發 MetaPixelTracker 事件（ 臉書通知 ）通知市場 */
	const checkDepositSuccessful = async () => {
		try {
			const { data: orders = [] } = await getCustNotification({
				notificationType: NotificationTypeEnum.Deposit,
			}).unwrap()

			/** 確認是否有存款成功的單號 */
			const hasOrders = orders.length > 0

			// 如果有存款成功的單號，觸發事件給市場，並根據 orders 長度調用 setCustNotification api
			if (hasOrders) {
				MetaPixelTracker('deposit_successful')

				/** setCustNotification api 的 Promise Object 陣列 */
				const promises = orders.map(orderId => {
					return setCustNotification({
						notificationType: NotificationTypeEnum.Deposit,
						transId: orderId,
					}).unwrap()
				})

				await Promise.all(promises)
			}
		} catch (error) {
			// 忽略
		}
	}

	return { checkDepositSuccessful }
}

export { useDepositWithdrawTracker }
