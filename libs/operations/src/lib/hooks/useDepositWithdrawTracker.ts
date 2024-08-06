import { ToastVisibleEnum } from '@nx-next-app/components/D0001'
import {
	NotificationTypeEnum,
	useLazyGcetCustNotificationQuery,
	useLazySetCustNotificationQuery,
} from '@nx-next-app/service'
import { MetaPixelTracker } from '@nx-next-app/utils'

/** 此 hook 負責追蹤用戶存款提款成功的事件，如果使用者存款提款成功，觸發 MetaPixelTracker 事件通知市場，並發送存款提款成功的吐司訊息通知用戶 */
const useDepositWithdrawTracker = () => {
	// ======= api =======

	const [getCustNotification] = useLazyGcetCustNotificationQuery()
	const [setCustNotification] = useLazySetCustNotificationQuery()

	// ======= 對外函數 =======

	/**
	 *  當存在存款單號時 ( 代表用戶存款成功 ) 流程：
	 *  1. 已登入時，每分鐘打一次 getCustNotification 確認是否有單號。
	 *	2. 登入完成，也會打一次 getCustNotification ( 有可能用戶存完款就登出，後台尚未審核，所以未通知用戶 )，此時若有單號，則會通知用戶。
	 *  3. 觸發 MetaPixelTracker 事件，通知市場用戶存款成功。
	 *  4. 向用戶發送吐司訊息確認交易已處理。
	 *  5. 調用 setCustNotification 移除該單號，防止之後再次獲得相同的單號。
	 *
	 * @isToastVisible 當前是否啟用吐司訊息
	 * @isToastVisible 當前是否啟用吐司訊息音效
	 * @depositToastCallBack 由各平台傳入的自定義吐司訊息樣式的回調函數  */
	const checkDepositSuccessful = async (
		isToastVisible: string,
		isSoundEnabled: string,
		depositToastCallBack: (orderId: string, isSoundEnabled: string) => void
	) => {
		try {
			const { data: orders = [] } = await getCustNotification({
				notificationType: NotificationTypeEnum.Deposit,
			}).unwrap()

			const hasOrders = orders.length > 0
			if (!hasOrders) return

			const toastVisibled = isToastVisible === ToastVisibleEnum.Visible
			const promises = orders.map(orderId => {
				// 每筆存款訂單成功時，通知市場用戶存款成功。如用戶有開啟吐司訊息，觸發存款成功吐司訊息，存款為綠底／白字／勾勾 icon
				MetaPixelTracker('deposit_successful')
				if (toastVisibled) depositToastCallBack(orderId, isSoundEnabled)

				// 移除該單號，防止之後再次獲得相同的單號
				return setCustNotification({
					notificationType: NotificationTypeEnum.Deposit,
					transId: orderId,
				}).unwrap()
			})
			await Promise.all(promises)
		} catch (error) {
			// 忽略
		}
	}

	/**
	 *  @note 當前提款不需要發通知給市場,如果之後有需求再自行擴充。
	 *  當存在提款單號時 ( 代表用戶提款成功 ) 流程：
	 *  1. 已登入時，每分鐘打一次 getCustNotification 確認是否有單號。
	 *	2. 登入完成，也會打一次 getCustNotification ( 有可能用戶提完款就登出，後台尚未審核，所以未通知用戶 )，此時若有單號，則會通知用戶。
	 *  3. 向用戶發送吐司訊息確認交易已處理。
	 *  4. 調用 setCustNotification 移除該單號，防止之後再次獲得相同的單號。
	 *
	 * @isToastVisible 當前是否啟用吐司訊息
	 * @isToastVisible 當前是否啟用吐司訊息音效
	 * @depositToastCallBack 由各平台傳入的自定義吐司訊息樣式的回調函數  */
	const checkWithdrawalSuccessful = async (
		isToastVisible: string,
		isSoundEnabled: string,
		withdrawalToastCallBack: (orderId: string, isSoundEnabled: string) => void
	) => {
		try {
			const { data: orders = [] } = await getCustNotification({
				notificationType: NotificationTypeEnum.Withdrawal,
			}).unwrap()

			const hasOrders = orders.length > 0
			if (!hasOrders) return

			const toastVisibled = isToastVisible === ToastVisibleEnum.Visible
			const promises = orders.map(orderId => {
				// 每筆提款成功時，且用戶有開啟吐司訊息，觸發提款成功吐司訊息，提款為藍底／白字／勾勾 icon
				if (toastVisibled) withdrawalToastCallBack(orderId, isSoundEnabled)

				// 移除該單號，防止之後再次獲得相同的單號
				return setCustNotification({
					notificationType: NotificationTypeEnum.Withdrawal,
					transId: orderId,
				}).unwrap()
			})
			await Promise.all(promises)
		} catch (error) {
			// 忽略
		}
	}

	return {
		checkDepositSuccessful,
		checkWithdrawalSuccessful,
	}
}

export { useDepositWithdrawTracker }
