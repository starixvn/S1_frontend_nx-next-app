import { useGlobalModal } from '@nx-next-app/components/D0001'
import { useLazyOnlineCheckQuery } from '@nx-next-app/service'
import { paths } from '@nx-next-app/constants'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useInterval } from 'usehooks-ts'

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
				onResetAuth()
				modal.info((error as Error).message || t('Label_LoggedOut'), {
					icon: 'icon icon-exit',
					title: t('Label_LogOut'),
					onOK: () => {
						push(paths.home.root)
						reload()
					},
				})
			}
		},
		isLogin ? 10000 : null
	)
}

export { useOnlineCheckInterval }
