// 因 useMenu 開新視窗的方法在 app 內會畫面全白打不開遊戲
// app team 推測是瀏覽器對彈窗容忍度的問題
// 根據建議在此另做了開啟 PG Slots 用的頁面
// 在非 app 環境下嘗試開啟此頁或出錯時將導回首頁

import { AppLauncherScreen } from '@nx-next-app/features/F0001/h5'
import { useLazyGotoGameQuery } from '@nx-next-app/service'
import { DeviceTypeEnum } from '@nx-next-app/types'
import { isReactNativeWebView } from '@nx-next-app/utils'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const PgLauncherPage = () => {
	const router = useRouter()
	const [gotoGame] = useLazyGotoGameQuery()

	useEffect(() => {
		const launch = async () => {
			try {
				if (!isReactNativeWebView()) throw new Error('Not in App')
				const { tpId, langId, gameId, tpGameType, loginGameType } = router.query
				const { message } = await gotoGame({
					appType: DeviceTypeEnum.NativeAPP,
					tpId: Number(tpId),
					langId: String(langId),
					inputs: {
						fun: '0',
						gameType: '',
						gameId: String(gameId),
						tpGameType: String(tpGameType),
						loginGameType: String(loginGameType),
					},
				}).unwrap()

				if (message) {
					const newDocument = document.open('text/html', 'replace')
					newDocument.write(message)
					newDocument.close()
				} else throw new Error()
			} catch (e) {
				router.push('/')
			}
		}

		if (router.isReady) launch()
	}, [router])

	return <AppLauncherScreen />
}

export default PgLauncherPage
