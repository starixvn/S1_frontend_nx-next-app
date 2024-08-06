import {
	ToastBGColorEnum,
	ToastEmitter,
	ToastIconEnum,
	ToastTypeEnum,
} from '@nx-next-app/components/D0001' // Toast 組件桌機手機共用
import { AuthProvider } from '@nx-next-app/data-access'
import { InitialPropsInterface } from '@nx-next-app/hooks'
import { useDepositWithdrawTracker } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

interface IAuthProviderProps
	extends Pick<InitialPropsInterface, 'originIsSignIn' | 'originCookies'> {
	children: ReactNode
}

/**
 * NovaAuthProvider 是一個自定義的 AuthProvider，專為 Nova 平台設計的吐司通知樣式管理。
 * 它在使用者登入後，自動檢查存款與提款的成功狀態，並根據情況發送自定義的吐司通知來提示使用者。
 * 吐司通知的樣式（如背景顏色、圖示等）根據不同平台的具體需求進行客製化設置。
 *
 * 此外，NovaAuthProvider 透過包裹 baseAuthProvider 的邏輯來實現，如果該平台不需要吐司訊息功能，
 * 則可以僅使用 AuthProvider，而無需自定義此 NovaAuthProvider。 */
export const NovaAuthProvider = ({
	children,
	originIsSignIn,
	originCookies,
}: IAuthProviderProps) => {
	// ====== hook ======
	const { t } = useTranslation()
	const { checkDepositSuccessful, checkWithdrawalSuccessful } =
		useDepositWithdrawTracker()

	// ====== 函數 ======

	/** 顯示存款成功吐司訊息
	 *  @orderId 存款訂單單號
	 *  @isSoundEnabled 是否啟用吐司訊息聲音 */
	const showDepositToast = (orderId: string, isSoundEnabled: string) => {
		ToastEmitter({
			message: t('Label_DepositSuccessful', { orderId }),
			isSoundEnabled,
			type: ToastTypeEnum.Custom,
			customBGColor: ToastBGColorEnum.Green,
			customIconClassName: ToastIconEnum.Checkmark,
		})
	}

	/** 顯示提款成功吐司訊息
	 *  @orderId 存款訂單單號
	 *  @isSoundEnabled 是否啟用吐司訊息聲音 */
	const showWithdrawalToast = (orderId: string, isSoundEnabled: string) => {
		ToastEmitter({
			message: t('Label_WithdrawSuccessful', { orderId }),
			isSoundEnabled,
			type: ToastTypeEnum.Custom,
			customBGColor: ToastBGColorEnum.Blue,
			customIconClassName: ToastIconEnum.Checkmark,
		})
	}

	/** 處理存提款吐司訊息通知
	 *  @isToastVisible 是否啟用吐司訊息
	 *  @isSoundEnabled 是否啟用啟用吐司訊息聲音 */
	const handleDepositOrWithdrawalSuccessful = async (
		isToastVisible: string,
		isSoundEnabled: string
	) => {
		await checkDepositSuccessful(
			isToastVisible,
			isSoundEnabled,
			showDepositToast
		)
		await checkWithdrawalSuccessful(
			isToastVisible,
			isSoundEnabled,
			showWithdrawalToast
		)
	}

	return (
		<AuthProvider
			originIsSignIn={originIsSignIn}
			originCookies={originCookies}
			onDepositOrWithdrawalSuccessful={handleDepositOrWithdrawalSuccessful}
		>
			{children}
		</AuthProvider>
	)
}
