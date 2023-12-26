/* eslint-disable @typescript-eslint/no-explicit-any */

import { head, includes, isArray } from 'lodash-es'
import { useRouter } from 'next/router'
import { paths, PRODUCTS } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useMenuData } from '@nx-next-app/hooks'
import {
	ISubMenu,
	MenuEventIcon,
	DeviceTypeEnum,
	LoginGameTypeEnum,
	MenuActionTypeEnum,
} from '@nx-next-app/types'
import {
	IAxiosError,
	IGotoGameArg,
	useLazyGotoGameQuery,
} from '@nx-next-app/service'
import { isEventPeriod, onWindowOpenProduct } from '@nx-next-app/utils'

type LoginCallbackType = () => void
type MessageCallbackType = (message: string) => void

const SPECIAL_LOGIN_GAME_TYPE: { [key in LoginGameTypeEnum]: number[] } = {
	[LoginGameTypeEnum.returnGameUrl]: [],
	[LoginGameTypeEnum.returnHtml]: [PRODUCTS.SLOTS_PG.TP_ID],
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

/**
 * @returns desktop、h5 回傳 menu event icon
 */
export const getMainEventIcon = ({
	eventIcons,
	subMenu,
}: {
	eventIcons?: MenuEventIcon[]
	subMenu?: ISubMenu[]
}) => {
	// * 渲染第一個活動期間的事件 icon，假設同時有 [NEW,HOT] ,會用前者
	const menuEventIcon =
		eventIcons && head(eventIcons.filter(({ period }) => isEventPeriod(period)))

	// * 輪詢一次 subMenu，抓回遇到的第一個活動期間的 eventIcons 資訊
	const firstEventProduct = subMenu?.find(
		item =>
			isArray(item.eventIcons) &&
			head(item.eventIcons.filter(({ period }) => isEventPeriod(period)))
	)
	const subMenuEventIcon =
		firstEventProduct &&
		firstEventProduct?.eventIcons &&
		// * 拿第一個活動內的 eventIcons
		head(
			firstEventProduct.eventIcons.filter(({ period }) => isEventPeriod(period))
		)

	const eventIcon = subMenuEventIcon || menuEventIcon

	return eventIcon
}

/**
 * @returns desktop、h5 回傳 sub menu event icon
 * @description 渲染第一個活動期間的事件 icon，假設同時有 [NEW,HOT] ,會用前者
 */
export const getSubMenuEventIcon = (eventIcons?: MenuEventIcon[]) => {
	return (
		eventIcons && head(eventIcons.filter(({ period }) => isEventPeriod(period)))
	)
}

/**
 * * useMenu 的 function 共用於裝置，不共用於品牌，每間品牌的開啟遊戲方式不同
 */
const useMenu = () => {
	const { push } = useRouter()
	const {
		auth,
		userInfo: { langId },
	} = useAuth()
	const menuData = useMenuData()
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
		if (
			SPECIAL_LOGIN_GAME_TYPE[LoginGameTypeEnum.returnHtml].includes(
				Number(tpId)
			)
		) {
			onGoToGame(
				{
					tpId: Number(tpId),
					langId,
					inputs: {
						gameId,
						tpGameType,
						fun: '0',
						gameType: '',
						loginGameType: String(LoginGameTypeEnum.returnHtml),
					},
				},
				{ loginCallback }
			)
			return
		}

		if (loginCallback && !auth.isLogin) {
			loginCallback()
			return
		}
		const host = typeof window === 'undefined' ? null : window.location.origin
		const dbHost =
			process.env.NODE_ENV === 'production'
				? host
				: process.env['NEXT_PUBLIC_ENV_DB_HOST']
		const signupUrl = `${host}${paths.join.root}`
		const loginUrl = `${host}${paths.login.root}`

		// * 只支援 en, cs, id, th
		const errorUrl = `${dbHost}/404/index_${langId}.html`

		const searchParams = new URLSearchParams({
			tpId,
			fun: isFree ? '1' : '0',
			gameType: 'slots',
		})
		if (tpGameType) {
			searchParams.set('tpGameType', tpGameType)
		}
		if (gameId) {
			searchParams.set('gameId', gameId)
		}

		const entPageUrl = `${dbHost}/${langId}/entPage?homeUrl=${host}&signupUrl=${signupUrl}&LoginUrl=${loginUrl}&errorUrl=${errorUrl}&${searchParams.toString()}`

		onWindowOpenProduct({
			pathname: entPageUrl,
			windowKey: tpId,
		})
	}

	const onDefaultEnterPage = ({
		langId,
		tpId,
		gameId = '',
		matchid = '',
		bettype = '',
		tpGameType = null,
		appType,
	}: {
		langId: string
		tpId: number
		gameId?: string | number
		matchid?: string
		bettype?: string | number
		tpGameType?: number | null
		appType?: number | null
	}) => {
		const host = typeof window === 'undefined' ? null : window.location.origin
		// 實際帶的 host 位置，正式環境帶當前 domain , local 環境則帶 api proxy
		const dbHost =
			process.env.NODE_ENV === 'production'
				? host
				: process.env['NEXT_PUBLIC_ENV_DB_HOST']
		const signupUrl = `${host}${paths.join.root}`
		const loginUrl = `${host}${paths.login.root}`
		const errorUrl = `${dbHost}/404/index_${langId}.html`
		const cashierUrl = `${host}${paths.deposit.root}`
		const lobbyUrl = ''

		const searchParams = new URLSearchParams({
			tpId: String(tpId),
			gameId: String(gameId),
			matchid: String(matchid),
			bettype: String(bettype),
			lobbyUrl,
			tpGameType: String(tpGameType),
		})

		if (
			Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DeviceTypeEnum.Mobile
		) {
			searchParams.set(
				'AppType',
				appType ? String(appType) : String(DeviceTypeEnum.Mobile)
			)
		}

		const entPageUrl = `${dbHost}/${langId}/entPage?homeUrl=${host}&signupUrl=${signupUrl}&LoginUrl=${loginUrl}&errorUrl=${errorUrl}&CashierUrl=${cashierUrl}&${searchParams.toString()}`

		return entPageUrl
	}

	const onEnterPage = (
		{
			langId,
			tpId,
			gameId = '',
			matchid = '',
			bettype = '',
			tpGameType = null,
			appType,
		}: {
			langId: string
			tpId: number
			gameId?: string | number
			matchid?: string
			bettype?: string | number
			tpGameType?: number | null
			appType?: number | null
		},
		{ loginCallback }: { loginCallback: LoginCallbackType }
	) => {
		const entPageUrl = onDefaultEnterPage({
			langId,
			tpId,
			gameId,
			matchid,
			bettype,
			tpGameType,
			appType,
		})
		// * 這裡的遊戲不需要登入，執行完直接 return 出去
		if (
			tpId === 1 &&
			(gameId < 100 || includes([161, 180, 192, 2002], gameId))
		) {
			return push(entPageUrl)
		}

		if (
			tpId === 45 // * SPORTS CRYPTO SPORTS
		) {
			return onWindowOpenProduct({
				pathname: entPageUrl,
				windowKey: `${tpId}_${gameId}`,
			})
		}

		// * 這裡的遊戲需要登入檢查

		if (loginCallback && !auth.isLogin) {
			return loginCallback()
		}
		onWindowOpenProduct({
			pathname: entPageUrl,
			windowKey: `${tpId}_${gameId}`,
		})
	}

	const onGoToGame = async (
		{
			tpId,
			langId,
			inputs: {
				gameId = null,
				fun = '0',
				gameType = '',
				tpGameType = '',
				loginGameType = '',
			},
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
				appType: Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']),
				tpId,
				langId,
				inputs: {
					gameId,
					fun,
					gameType,
					tpGameType: String(tpGameType),
					loginGameType,
				},
			}).unwrap()

			if (
				// * SPORT 9W 的開啟方式來自於代理商給的文件，因此需拉出單獨處理
				tpId === 31 // SPORTS_9W_SPORTS TP_ID
			) {
				const result = JSON.parse(message)
				const { url, key, userId } = result ?? {}
				open9WSports({ url, key, userId })
			} else if (loginGameType !== '') {
				if (Number(loginGameType) === LoginGameTypeEnum.returnHtml) {
					const newWindow = window.open()
					newWindow?.document.write(message)
				} else {
					window.open(message)
				}
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
		// * 目前只有在 Sports 才會需要這個參數 (products 有 hasDesktopLink)
		item: ISubMenu & { appType?: number },
		{
			loginCallback,
			messageCallBack,
		}: {
			loginCallback: LoginCallbackType
			messageCallBack?: MessageCallbackType
		}
	) => {
		const { desktop, h5, pathname = '/', query, product, appType } = item || {}

		const { menuActionType } =
			Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DeviceTypeEnum.Desktop
				? desktop || {}
				: h5 || {}

		switch (menuActionType) {
			case MenuActionTypeEnum.Link:
				push({
					pathname,
					query,
				})

				break

			case MenuActionTypeEnum.EnterPage:
				if (product) {
					const { TP_ID, GAME_ID, TP_GAME_TYPE, BET_TYPE } = product

					onEnterPage(
						{
							langId,
							tpId: TP_ID,
							gameId: GAME_ID,
							tpGameType: TP_GAME_TYPE,
							bettype: BET_TYPE,
							appType,
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

			case MenuActionTypeEnum.WindowOpen:
				if (window !== undefined) {
					window.open(pathname, pathname)
				}
				break

			default:
				break
		}
	}

	return {
		menuData,
		onMenuOpen,
		onEnterPage,
		onGoToGame,
		onEnterSlotsPage,
		onDefaultEnterPage,
	}
}

export { useMenu }
