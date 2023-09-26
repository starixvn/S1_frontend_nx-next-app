import { useRouter } from 'next/router'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { PRODUCTS } from '@nx-next-app/site/nova88'
import { useAuth } from '@nx-next-app/data-access'
import { find } from 'lodash-es'

const Sports = () => {
	const {
		query: { provider: queryProvider, type: queryType },
	} = useRouter()
	const {
		userInfo: { langId },
	} = useAuth()
	const {
		menuData: {
			Sports: { subMenu = [] },
		},
		onDefaultEnterPage,
	} = useMenu()

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
	return <iframe title='sport' data-target='sport_iframe' src={iframeUrl} />
}

export default Sports
