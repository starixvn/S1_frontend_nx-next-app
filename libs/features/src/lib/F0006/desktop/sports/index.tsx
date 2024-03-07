import { useRouter } from 'next/router'
import { useMenu } from '@nx-next-app/features/F0006/hooks'
import { useAuth } from '@nx-next-app/data-access'
import { find } from 'lodash-es'
import { useIsClient } from 'usehooks-ts'
import { PRODUCTS } from '@nx-next-app/constants'

const Sports = () => {
	const isClient = useIsClient()

	const {
		query: { provider: queryProvider, type: queryType },
	} = useRouter()
	const {
		userInfo: { langId },
	} = useAuth()
	const {
		menuData: {
			Sports: { subMenu: sportSubmenu = [] } = {},
			Lottery: { subMenu: lotterySubmenu = [] } = {},
		},
		onDefaultEnterPage,
	} = useMenu()

	const subMenu = [...sportSubmenu, ...lotterySubmenu]

	const {
		product: {
			TP_ID: tpId = NaN,
			GAME_ID: gameId = '',
			TP_GAME_TYPE: tpGameType = PRODUCTS['SPORTS'].TP_GAME_TYPE,
		} = {},
	} =
		find(subMenu, {
			query: { provider: String(queryProvider), type: String(queryType) },
		}) ?? {}

	const iframeUrl = onDefaultEnterPage({
		langId,
		tpId,
		gameId,
		tpGameType,
	})

	// * iframe 沒有 target 參數 --> 使用 data attributes 注入參數
	// * 確保在用戶端才被渲染
	return isClient ? (
		<iframe title='sport' data-target='sport_iframe' src={iframeUrl} />
	) : null
}

export default Sports
