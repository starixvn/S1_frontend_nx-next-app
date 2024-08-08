import { IAxiosError, useLazyOnlineCheckQuery } from '@nx-next-app/service'
import { paths } from '@nx-next-app/constants'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useInterval } from 'usehooks-ts'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useDepositWithdrawTracker } from './index'
/**
 * @description 輪詢確認使用者是否保持線上狀態
 */
const useOnlineCheckInterval = ({
	isLogin,
	onResetAuth,
}: {
	isLogin: boolean | undefined
	onResetAuth: () => void
}) => {
	const { t } = useTranslation()
	const { push, reload } = useRouter()
	const { modal } = useGlobalModal()
	const [onlineCheck] = useLazyOnlineCheckQuery()
	const { checkDepositSuccessful } = useDepositWithdrawTracker()

	useInterval(
		async () => {
			try {
				await onlineCheck(null).unwrap()

				// 每分鐘確認使用者是否有儲值成功的單號，如果有就通知市場（ 臉書通知 ）
				await checkDepositSuccessful()
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
