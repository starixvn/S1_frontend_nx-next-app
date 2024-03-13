import { useRouter } from 'next/router'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { useAuth } from '@nx-next-app/data-access'
import { find } from 'lodash-es'
import { useIsClient } from 'usehooks-ts'
import { PRODUCTS } from '@nx-next-app/constants'

const Sports = () => {
	const isClient = useIsClient()

	const {
		query: {
			provider: queryProvider,
			type: queryType = '',
			tpId: queryTpId = '',
			matchId: queryMatchId = '',
			gameId: queryGameId = '',
			tpGameType: queryTpGameType = '',
		},
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
			TP_ID: productTpId = NaN,
			GAME_ID: productGameId = '',
			TP_GAME_TYPE: productTpGameType = PRODUCTS['SPORTS'].TP_GAME_TYPE,
		} = {},
	} =
		find(subMenu, {
			query: { provider: String(queryProvider), type: String(queryType) },
		}) ?? {}

	const iframeUrl = onDefaultEnterPage({
		langId,
		tpId: Number(queryTpId) || productTpId,
		gameId: String(queryGameId) || productGameId,
		tpGameType: Number(queryTpGameType) || productTpGameType,
		matchid: String(queryMatchId) || '',
	})

	// * iframe 沒有 target 參數 --> 使用 data attributes 注入參數
	// * 確保在用戶端才被渲染
	return isClient ? (
		<iframe title='sport' data-target='sport_iframe' src={iframeUrl} />
	) : null
}

export default Sports
