// 因 useMenu 開新視窗的方法在 app 內會畫面全白打不開遊戲
// app team 推測是瀏覽器對彈窗容忍度的問題
// 根據建議在此另做了開啟 Nova88 Exchange 用的頁面

import { AppLauncherScreen } from '@nx-next-app/features/F0001/h5'
import { useLazyGotoGameQuery } from '@nx-next-app/service'
import { DeviceTypeEnum } from '@nx-next-app/types'
import { some } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const ExchangeLauncherPage = () => {
	const router = useRouter()
	const [gotoGame] = useLazyGotoGameQuery()

	useEffect(() => {
		const launch = async () => {
			try {
				const { tpId, langId, gameId, tpGameType, loginGameType } = router.query

				// 原想將非 app 環境導回首頁，但此頁面未能以 window.ReactNativeWebView 作判斷，暫先只檢查參數是否有少
				const isParamsMissing = some(
					[tpId, langId, gameId, tpGameType, loginGameType],
					param => param === undefined
				)
				if (isParamsMissing) throw new Error('Missing parameters')

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

				const { url, userId, key } = JSON.parse(message)
				const form = document.createElement('form')
				form.setAttribute('method', 'post')
				form.setAttribute('action', url)

				const addIptField = ({
					name,
					value,
				}: {
					name: string
					value: string
				}) => {
					const hiddenField = document.createElement('input')
					hiddenField.setAttribute('type', 'hidden')
					hiddenField.setAttribute('name', name)
					hiddenField.setAttribute('value', value)
					form.appendChild(hiddenField)
				}

				addIptField({ name: 'userId', value: userId })
				addIptField({ name: 'key', value: decodeURIComponent(key) })
				document.body.appendChild(form)
				form.submit()
				form.remove()
			} catch (e) {
				router.push('/')
			}
		}

		if (router.isReady) launch()
	}, [router])

	return <AppLauncherScreen />
}

export default ExchangeLauncherPage
