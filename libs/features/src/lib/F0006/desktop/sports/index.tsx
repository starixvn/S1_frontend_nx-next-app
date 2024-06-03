import { useRouter } from 'next/router'
import { useMenu } from '@nx-next-app/features/F0006/hooks'
import { useAuth } from '@nx-next-app/data-access'
import { find } from 'lodash-es'
import { useIsClient } from 'usehooks-ts'
import { PRODUCTS } from '@nx-next-app/constants'

const Sports = () => {
	const isClient = useIsClient()

	const {
		query: {
			provider: queryProvider,
			tpId: queryTpiD,
			gameId: queryGameId,
			matchId,
		},
	} = useRouter()
	const {
		userInfo: { langId },
	} = useAuth()
	const { onDefaultEnterPage } = useMenu()

	// Casting index: (menu 的遊戲列會帶 queryProvider)
	const product = PRODUCTS[queryProvider as keyof typeof PRODUCTS]

	const hotEventProduct = find(
		PRODUCTS,
		({ tpId, gameId }) =>
			tpId === Number(queryTpiD) && gameId === Number(queryGameId)
	)

	const { tpId, gameId, tpGameType } =
		product || hotEventProduct || PRODUCTS.Soccer

	const iframeUrl = onDefaultEnterPage({
		langId,
		tpId,
		gameId,
		// * 移除 query 會拿到 string[] 的型態
		matchid: matchId ? String(matchId) : '',
		tpGameType,
	})

	// * iframe 沒有 target 參數 --> 使用 data attributes 注入參數
	// * 確保在用戶端才被渲染
	return isClient ? (
		<iframe title='sport' data-target='sport_iframe' src={iframeUrl} />
	) : null
}

export default Sports
