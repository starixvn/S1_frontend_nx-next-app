import { IAxiosError, useLazyOnlineCheckQuery } from '@nx-next-app/service'
import { paths } from '@nx-next-app/constants'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useInterval } from 'usehooks-ts'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

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

	useInterval(
		async () => {
			try {
				await onlineCheck(null).unwrap()
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
					console.log(error)
				}
			}
		},
		isLogin ? 60000 : null
	)
}

export { useOnlineCheckInterval }
