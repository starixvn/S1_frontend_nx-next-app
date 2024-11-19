import {
	ToastBGColorEnum,
	ToastEmitter,
	ToastIconEnum,
	ToastTypeEnum,
} from '@nx-next-app/components/D0001'
import { AuthProvider } from '@nx-next-app/data-access'
import { InitialPropsInterface } from '@nx-next-app/hooks'
import {
	NotificationSoundStateEnum,
	TToastSetting,
	useDepositWithdrawTracker,
} from '@nx-next-app/operations'
import { NotificationTypeEnum } from '@nx-next-app/service'
import { MetaPixelTrackerName } from '@nx-next-app/utils'
import { ReactNode } from 'react'

interface IAuthProviderProps
	extends Pick<InitialPropsInterface, 'originIsSignIn' | 'originCookies'> {
	children: ReactNode
}

type TNotificationConfig = {
	event: MetaPixelTrackerName | null
	i18nLabel: string
	bgColor: ToastBGColorEnum
	iconClassName: ToastIconEnum
}

/** 各類型財務通知的靜態配置
 *  @note 當前僅有提款成功需要發通知給市場,如果之後有需求再自行擴充。
 *  @event 市場追蹤用戶的事件，目前僅有存款成功需要追蹤
 *  @messageKey 財務通知 i18n
 *  @bgColor 財務通知背景色
 *  @iconClassName 財務通知 icon */
export const notificationsConfig: Record<
	NotificationTypeEnum,
	TNotificationConfig
> = {
	[NotificationTypeEnum.DepositSuccess]: {
		event: 'deposit_successful',
		i18nLabel: 'Label_DepositSuccessful',
		bgColor: ToastBGColorEnum.Green,
		iconClassName: ToastIconEnum.Check,
	},
	[NotificationTypeEnum.WithdrawalSuccess]: {
		event: 'withdraw',
		i18nLabel: 'Label_WithdrawSuccessful',
		bgColor: ToastBGColorEnum.Green,
		iconClassName: ToastIconEnum.Check,
	},
	[NotificationTypeEnum.DepositFail]: {
		event: null,
		i18nLabel: 'Label_DepositFailed',
		bgColor: ToastBGColorEnum.Red,
		iconClassName: ToastIconEnum.Cross,
	},
	[NotificationTypeEnum.WithdrawalFail]: {
		event: null,
		i18nLabel: 'Label_WithdrawFailed',
		bgColor: ToastBGColorEnum.Red,
		iconClassName: ToastIconEnum.Cross,
	},
}

/**
 * NovaAuthProvider 是一個專為 Nova 平台設計的吐司通知樣式管理的 Provider。 */
export const NovaAuthProvider = ({
	children,
	originIsSignIn,
	originCookies,
}: IAuthProviderProps) => {
	// ====== hook ======

	const { handleNotification } = useDepositWithdrawTracker()

	// ====== 函數 ======

	/** 依照參數顯示對應的財務通知
	 *
	 * @message - 財務通知訊息
	 * @bgColor - 財務通知的背景色，不同財務通知有不同顏色
	 * @iconClassName - 財務通知的icon，不同財務通知有不同 icon
	 * @notificationMutedArg - 是否禁音財務通知音效 */
	const showNotification = ({
		message,
		bgColor,
		iconClassName,
		notificationMutedArg,
	}: TToastSetting) => {
		ToastEmitter({
			message,
			type: ToastTypeEnum.Custom,
			customBGColor: bgColor,
			customIconClassName: iconClassName,
			isWrapText: false,
		})
		/** 財務通知禁音 */
		const notificationMuted =
			notificationMutedArg === NotificationSoundStateEnum.Muted

		if (notificationMuted) return
		const audio = new Audio(
			`${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/toast/img/toastSound.mp3`
		)
		audio.play()
	}

	/**
	 *  在 “登入時” 和 “登入後，每分鐘” 調用，
	 *  檢查當前是否有 存款成功／提款成功／存款失敗／提款失敗 的單號，有的話需要發送財務通知給使用者。
	 *
	 * @notificationEnabledArg - 從 userInfo 取得 “財務通知是否啟用”
	 * @notificationMutedArg - 從 userInfo 取得財 ”務通知是否禁音“ */
	const handleFinanceNotification = async (
		notificationEnabledArg: string,
		notificationMutedArg: string
	) => {
		/** 一次性檢查所有財務通知的類型，是否有單號，如果有就必須發財務通知給使用者 */
		const allNotificationTypePromises = Object.entries(notificationsConfig).map(
			async ([notificationType, notificationConfig]) => {
				/** 財務通知的設定 */
				const notificationSetting = {
					// 物件 key 本身為 string ，需要轉型為 NotificationTypeEnum
					notificationType: Number(notificationType) as NotificationTypeEnum,
					notificationEnabledArg,
					notificationMutedArg,
					...notificationConfig,

					// 發送財務通知訊息的回調
					showNotificationCallBack: (toastSetting: TToastSetting) => {
						showNotification(toastSetting)
					},
				}
				return handleNotification(notificationSetting)
			}
		)
		await Promise.all(allNotificationTypePromises)
	}

	return (
		<AuthProvider
			originIsSignIn={originIsSignIn}
			originCookies={originCookies}
			onFinanceNotification={handleFinanceNotification}
		>
			{children}
		</AuthProvider>
	)
}
