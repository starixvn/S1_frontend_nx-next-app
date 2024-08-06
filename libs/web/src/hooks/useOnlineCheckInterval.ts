import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { IAxiosError, useLazyOnlineCheckQuery } from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useInterval } from 'usehooks-ts'
/**
 * @description 輪詢確認使用者是否保持線上狀態
 */
const useOnlineCheckInterval = ({
	isLogin,
	onResetAuth,
	toastSetting,
}: {
	isLogin: boolean | undefined
	onResetAuth: () => void
	toastSetting?: {
		financeNotification: string | undefined
		soundEffects: string | undefined
		onDepositOrWithdrawalSuccessful:
			| ((
					financeNotification: string | undefined,
					soundEffects: string | undefined
			  ) => Promise<void>)
			| undefined
	}
}) => {
	const { t } = useTranslation()
	const { push, reload } = useRouter()
	const { modal } = useGlobalModal()
	const [onlineCheck] = useLazyOnlineCheckQuery()

	const { financeNotification, soundEffects, onDepositOrWithdrawalSuccessful } =
		toastSetting ?? {}

	useInterval(
		async () => {
			try {
				await onlineCheck(null).unwrap()

				/**
				 *  在使用者登入後，如果有傳入 `onDepositOrWithdrawalSuccessful` 回調函數，則每分鐘檢查一次是否需要發送存/提款的吐司通知。
				 *  @onDepositOrWithdrawalSuccessful 是由各平台自行定義並傳入的回調，用於設定各平台的吐司通知樣式（因為每個平台的樣式需求可能不同，也可能沒有提供此功能）。
				 *  如果該回調存在，且使用者已登入，將檢查使用者是否有存/提款成功的記錄，並根據回調函數發送對應樣式的的吐司訊息。 */
				if (onDepositOrWithdrawalSuccessful) {
					await onDepositOrWithdrawalSuccessful(
						financeNotification,
						soundEffects
					)
				}
			} catch (error) {
				// 此 errorCode 才需要做登出邏輯
				if ((error as IAxiosError)?.errorCode === 1001) {
					onResetAuth()
					modal.info(
						(error as IAxiosError).message || t('Label_General_LoggedOut'),
						{
							icon: 'icon icon-exit',
							title: t('Label_General_LogOut'),
							onOK: () => {
								push(paths.home.root)
								reload()
							},
						}
					)
				} else {
					// 忽略
				}
			}
		},
		isLogin ? 60000 : null
	)
}

export { useOnlineCheckInterval }
