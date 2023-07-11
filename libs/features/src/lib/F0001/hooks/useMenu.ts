/* eslint-disable no-console */
import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { ISubMenu, MenuActionTypeEnum } from '@nx-next-app/features/F0001/types'
import {
	IAxiosError,
	IGotoGameArg,
	useLazyGotoGameQuery,
} from '@nx-next-app/service'
import { includes } from 'lodash-es'
import { useRouter } from 'next/router'

type LoginCallbackType = () => void
type MessageCallbackType = (message: string) => void

const windowOpen = ({
	pathname,
	windowKey,
}: {
	pathname: string
	windowKey: string
}) => {
	if (typeof window !== `undefined`) {
		window
			.open(
				pathname,
				windowKey,
				'toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0'
			)
			?.focus()
	}
}

export const open9WSports = ({
	url,
	userId,
	key,
}: {
	url: string
	userId: string
	key: string
}) => {
	const windowName = `w_9WSportsForm`
	const form = document.createElement('form')
	form.setAttribute('method', 'post')
	form.setAttribute('action', url)
	form.setAttribute('target', windowName)

	const addIptField = ({ name, value }: { name: string; value: string }) => {
		const hiddenField = document.createElement('input')
		hiddenField.setAttribute('type', 'hidden')
		hiddenField.setAttribute('name', name)
		hiddenField.setAttribute('value', value)
		form.appendChild(hiddenField)
	}

	addIptField({ name: 'userId', value: userId })
	addIptField({ name: 'key', value: decodeURIComponent(key) })
	document.body.appendChild(form)
	window.open(
		'',
		windowName,
		'toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0'
	)
	form.submit()
	form.remove()
}

const useMenu = <T>({ langId }: { langId: string }) => {
	const { push } = useRouter()
	const { auth } = useAuth()
	const { MENU_DATA } = useStaticData()
	const [gotoGame] = useLazyGotoGameQuery()

	/**
	 * 專門打開 Slots 遊戲
	 */
	const onEnterSlotsPage = (
		{
			tpId,
			tpGameType,
			gameId,
			isFree = false,
		}: {
			tpId: string
			tpGameType?: string
			gameId?: string
			isFree?: boolean
		},
		{ loginCallback }: { loginCallback: LoginCallbackType }
	) => {
		if (loginCallback && !auth.isLogin) {
			loginCallback()
			return
		}

		const host = process.env['NEXT_PUBLIC_ENV_DB_HOST']
		const signupUrl = `${host}/${paths.join.root}`
		const loginUrl = `${host}/${paths.login.root}`
		const errorUrl = `${process.env['NEXT_PUBLIC_ERROR_DOMAIN']}/404/index_${langId}.html`

		const searchParams = new URLSearchParams({
			tpId,
			fun: isFree ? '1' : '0',
			gameType: 'slots',
		})
		if (tpGameType) {
			searchParams.set('tpGameType', tpGameType)
		}
		if (gameId) {
			searchParams.set('tpGameType', gameId)
		}

		const entPageUrl = `${host}/${langId}/entPage?homeUrl=${host}&signupUrl=${signupUrl}&LoginUrl=${loginUrl}&errorUrl=${errorUrl}&${searchParams.toString()}`

		windowOpen({
			pathname: entPageUrl,
			windowKey: tpId,
		})
	}

	const onEnterPage = (
		{
			langId,
			tpId,
			gameId = '',
			matchid = '',
			betType = '',
			tpGameType,
		}: {
			langId: string
			tpId: number
			gameId?: string | number
			matchid?: string
			betType?: string | number
			tpGameType: number | null
		},
		{ loginCallback }: { loginCallback: LoginCallbackType }
	) => {
		const host = process.env['NEXT_PUBLIC_ENV_DB_HOST']
		const signupUrl = `${host}/${paths.join.root}`
		const loginUrl = `${host}/${paths.login.root}`
		const errorUrl = `${process.env['NEXT_PUBLIC_ERROR_DOMAIN']}/404/index_${langId}.html`
		const cashierUrl = `${host}/${paths.deposit.root}`
		const lobbyUrl = ''

		const searchParams = new URLSearchParams({
			tpId: String(tpId),
			gameId: String(gameId),
			matchid: String(matchid),
			getType: String(betType),
			lobbyUrl,
			tpGameType: String(tpGameType),
		})

		const entPageUrl = `${host}/${langId}/entPage?homeUrl=${host}&signupUrl=${signupUrl}&LoginUrl=${loginUrl}&errorUrl=${errorUrl}&CashierUrl=${cashierUrl}&${searchParams.toString()}`

		console.log('loginCallback')

		// * 這裡的遊戲不需要登入，執行完直接 return 出去
		if (
			tpId === 1 &&
			(gameId < 100 || includes([161, 180, 192, 2002], gameId))
		) {
			return push(entPageUrl)
		}
		if (tpId === 45) {
			return windowOpen({
				pathname: entPageUrl,
				windowKey: `${tpId}_${gameId}`,
			})
		}

		// * 這裡的遊戲需要登入檢查

		if (loginCallback && !auth.isLogin) {
			loginCallback()
			return
		}
		windowOpen({
			pathname: entPageUrl,
			windowKey: `${tpId}_${gameId}`,
		})
	}

	const onGoToGame = async (
		{
			tpId,
			langId,
			inputs: { gameId = null, fun = '0', gameType = '', tpGameType = '' },
		}: Omit<IGotoGameArg, 'appType'>,
		{
			loginCallback,
			messageCallBack,
		}: {
			loginCallback: LoginCallbackType
			messageCallBack?: MessageCallbackType
		}
	) => {
		if (loginCallback && !auth.isLogin) {
			loginCallback()
			return
		}

		try {
			const { message } = await gotoGame({
				appType: Number(process.env['NEXT_PUBLIC_DeviceType']),
				tpId,
				langId,
				inputs: { gameId, fun, gameType, tpGameType: String(tpGameType) },
			}).unwrap()

			const result = JSON.parse(message)

			if (
				// * SPORT 9W 的開啟方式來自於代理商給的文件，因此需拉出單獨處理
				tpId === 31 // SPORTS_9W_SPORTS TP_ID
			) {
				const { url, key, userId } = result ?? {}
				open9WSports({ url, key, userId })
			} else {
				// * 非 9W, 直接由後端給的 message 當路徑直接另開頁面
				window.open(
					message,
					'Under Maintenance',
					'toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0'
				)
			}
		} catch (error) {
			const { message, errorCode } = error as IAxiosError

			if (errorCode === 3000) {
				window.open(
					message,
					'Under Maintenance',
					'toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0'
				)
			} else if (messageCallBack) {
				messageCallBack(message)
			}
		}
	}

	const onMenuOpen = (
		item: ISubMenu,
		{
			loginCallback,
			messageCallBack,
		}: {
			loginCallback: LoginCallbackType
			messageCallBack?: MessageCallbackType
		}
	) => {
		const { menuActionType, pathname = '/', query, product } = item

		switch (menuActionType) {
			case MenuActionTypeEnum.Link:
				push({
					pathname,
					query,
				})
				console.log('MenuActionTypeEnum.Link', { query })
				break

			case MenuActionTypeEnum.EnterPage:
				if (product) {
					const { TP_ID, GAME_ID, TP_GAME_TYPE } = product
					console.log('MenuActionTypeEnum.EnterPage')
					onEnterPage(
						{
							langId,
							tpId: TP_ID,
							gameId: GAME_ID,
							tpGameType: TP_GAME_TYPE,
						},
						{ loginCallback }
					)
				}

				break

			case MenuActionTypeEnum.UseGoToGame:
				if (product) {
					const { TP_ID, GAME_ID, GAME_TYPE, TP_GAME_TYPE } = product
					onGoToGame(
						{
							tpId: TP_ID,
							langId,
							inputs: {
								gameId: GAME_ID,
								fun: '0',
								gameType: GAME_TYPE,
								tpGameType: TP_GAME_TYPE,
							},
						},
						{ loginCallback, messageCallBack }
					)
				}
				break

			default:
				break
		}
	}

	return {
		menuData: MENU_DATA as T,
		onMenuOpen,
		onEnterPage,
		onGoToGame,
		onEnterSlotsPage,
	}
}

export { useMenu }
