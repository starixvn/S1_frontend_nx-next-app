import { memberTypeEnum, paths, PRODUCTS } from '@nx-next-app/constants'
import { useAuth, useGlobalData, useStaticData } from '@nx-next-app/data-access'
import type {
	IDynamicSubMenuItem,
	IDynamicSubMenuLinkType,
	IStaticSubMenuItem,
} from '@nx-next-app/features/F0001/types'
import { useMenuData } from '@nx-next-app/hooks'
import {
	useGetCustTpGameTypeSettingQuery,
	type IGotoGameArg,
} from '@nx-next-app/service'
import {
	DeviceTypeEnum,
	LoginGameTypeEnum,
	MenuActionTypeEnum,
	MenuKeyEnum,
} from '@nx-next-app/types'
import {
	getIsTpMaintain,
	isGameExcludedFromLiff,
	onWindowOpenProduct,
} from '@nx-next-app/utils'
import { filter, find, includes } from 'lodash-es'
import { useRouter } from 'next/router'
import { useState } from 'react'

type LoginCallbackType = () => void
type MessageCallbackType = (message: string) => void

export type IMergedMenuData = {
	display?: 'h5' | 'desktop' | 'all'
	displayKey?: string
	pathname?: string
	lobbyCategoryId?: number | undefined
	subMenuAllowCurrenciesWithAuth?: boolean | undefined // * 決定是否需要登入後才過濾(暫時沒有用到)
	query?: { provider: string }
	category?: MenuKeyEnum | undefined
	h5?: {
		subMenuClassName?: string
		icon: string
	}
	desktop?: {
		subMenuClassName?: string | undefined
	}
	subMenu: IDynamicSubMenuItem[]
}

const SPECIAL_LOGIN_GAME_TYPE: { [key in LoginGameTypeEnum]: number[] } = {
	[LoginGameTypeEnum.returnGameUrl]: [],
	[LoginGameTypeEnum.returnHtml]: [],
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
 * * useMenu 的 function 共用於裝置，不共用於品牌，每間品牌的開啟遊戲方式不同
 */
const useMenu = () => {
	const { push } = useRouter()
	const {
		auth,
		userInfo: { langId, memberType },
	} = useAuth()
	const [windows, setWindows] = useState<{ window: Window, key: string }[]>([])
	const { MENU_DATA } = useStaticData()
	const { LobberHeaderMenuList, isLobbyHeaderError } = useMenuData()
	const { tpMaintainList, isInLiff } = useGlobalData()
	const { data: { data: tpGameTypeSettingList = [] } = {} } =
		useGetCustTpGameTypeSettingQuery(null, {
			skip: memberType !== memberTypeEnum.liveHost || memberType === undefined,
		})

	// * 塞入前端相關參數
	const mergedMenus = (): IMergedMenuData[] => {
		return LobberHeaderMenuList?.map(mainMenuItem => {
			const defMainMenuItem = find(MENU_DATA, {
				lobbyCategoryId: mainMenuItem.lobbyCategoryId,
			})

			const {
				data = [],
				subMenu = [],
				...rest
			} = { ...mainMenuItem, ...(defMainMenuItem && defMainMenuItem) }

			// 排除在 liff 不支援的遊戲
			const menuItems = isInLiff
				? filter(data, ({ tpGameIdNo }) => !isGameExcludedFromLiff(tpGameIdNo))
				: data

			const subMenus = menuItems.map(subMenuItem => {
				// * subMenu 是插入的相關資料 因此不會影響順序
				subMenu.forEach(defSubItem => {
					if (subMenuItem.tpGameIdNo === defSubItem.tpGameIdNo) {
						Object.assign(subMenuItem, defSubItem)
					}
				})
				//* mutating 方法無法讓 typescript 自行推斷 故用 assertion
				return { ...(subMenuItem as IDynamicSubMenuItem) }
			})

			return { ...rest, subMenu: subMenus }
		})
	}

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
			gameId?: string | number
			isFree?: boolean
		},
		{ loginCallback }: { loginCallback: LoginCallbackType }
	) => {
		// 不管怎樣 Slots 就是先登入
		if (loginCallback && !auth.isLogin) {
			loginCallback()
			return
		}

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

		const host = typeof window === 'undefined' ? null : window.location.origin
		const dbHost =
			// eslint-disable-next-line eqeqeq
			process.env['NEXT_PUBLIC_PLAYER_API_PATH'] != ''
				? `${host}/${process.env['NEXT_PUBLIC_PLAYER_API_PATH']}`
				: process.env['NEXT_PUBLIC_ENV_DB_HOST']
		// process.env.NODE_ENV === 'production'
		// 	? host
		//	:
		const signupUrl = `${host}${paths.join.root}`
		const loginUrl = `${host}${paths.login.root}`
		const lobbyUrl = `${host}${paths.slots.root}?tpId=${tpId}`

		// * 只支援 en, cs, id, th
		const errorUrl = `${window.location.origin}/404/index_${langId}.html`

		const searchParams = new URLSearchParams({
			tpId,
			fun: isFree ? '1' : '0',
			gameType: 'slots',
		})
		if (tpGameType) {
			searchParams.set('tpGameType', tpGameType)
		}
		if (gameId) {
			searchParams.set('gameId', String(gameId))
		}
		if (Number(tpId) === PRODUCTS.PragmaticPlaySlot.tpId) {
			searchParams.set('LobbyUrl', lobbyUrl)
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
			// eslint-disable-next-line eqeqeq
			process.env['NEXT_PUBLIC_PLAYER_API_PATH'] != ''
				? `${host}/${process.env['NEXT_PUBLIC_PLAYER_API_PATH']}`
				: process.env['NEXT_PUBLIC_ENV_DB_HOST']
		// process.env.NODE_ENV === 'production'
		// 	? host
		//	:
		const signupUrl = `${host}${paths.join.root}`
		const loginUrl = `${host}${paths.login.root}`
		const errorUrl = `${window.location.origin}/404/index_${langId}.html`
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

		return `${dbHost}/${langId}/entPage?homeUrl=${host}&signupUrl=${signupUrl}&LoginUrl=${loginUrl}&errorUrl=${errorUrl}&CashierUrl=${cashierUrl}&${searchParams.toString()}`
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
		// if (
		// 	tpId === 1 &&
		// 	(Number(gameId) < 100 || includes([161, 180, 192, 2002], gameId))
		// ) {
		// 	return push(entPageUrl)
		// }

		// if (
		// 	tpId === 45 || // * SPORTS CRYPTO SPORTS,
		// 	tpId === 41// * SPORTS ,
		// ) {
		// 	return onWindowOpenProduct({
		// 		pathname: entPageUrl,
		// 		windowKey: `${tpId}`,
		// 	})
		// }

		// * 這裡的遊戲需要登入檢查

		if (loginCallback && !auth.isLogin) {
			return loginCallback()
		}
		onWindowOpenProduct({
			pathname: entPageUrl,
			windowKey: `${tpId}`,
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
		}: {
			loginCallback: LoginCallbackType
			messageCallBack?: MessageCallbackType
		}
	) => {
		if (loginCallback && !auth.isLogin) {
			loginCallback()
			return
		}

		const params = new URLSearchParams({
			tpId: String(tpId),
			langId: String(langId),
			gameId: String(gameId),
			gameType: String(gameType),
			tpGameType: String(tpGameType),
			loginGameType: String(loginGameType),
			fun: String(fun),
		}).toString()

		window.open(`/launcher?${params}`, 'launcher')
	}

	const onStaticMenuOpen = (
		item: IStaticSubMenuItem | undefined,
		{
			loginCallback,
			underMaintenanceCallback,
			messageCallBack,
			liveStreamingCallback,
		}: {
			loginCallback: () => void
			underMaintenanceCallback: () => void
			messageCallBack: (message: string) => void
			liveStreamingCallback: () => void
		}
	) => {
		if (!item) return
		// * 插入 maintenance
		const isTpMaintain = getIsTpMaintain({
			tpMaintainList,
			tpId: item.tpId,
			tpGameType: item.tpGameType,
		})

		if (memberType === memberTypeEnum.liveHost) {
			const isLiveHostNoPlay = tpGameTypeSettingList?.find(
				settingItem =>
					settingItem.gameType === item.tpGameType &&
					settingItem.tpId === item.tpId
			)?.noPlay

			isLiveHostNoPlay && liveStreamingCallback()
			return
		}

		if (isTpMaintain) {
			underMaintenanceCallback()
		} else {
			onMenuOpen(item, {
				loginCallback,
				messageCallBack,
				liveStreamingCallback,
			})
		}
	}

	/**
	 *
	 * @param item
	 * @param loginCallback -- 登入彈窗
	 * @param liveStreamingCallback -- 直播主彈窗
	 * @param messageCallBack -- gotoGame api error handling 彈窗
	 *
	 * ISubMenuItem 為動態遊戲產品(lobbyHeader api 來的)
	 *
	 * undefined 是動態遊戲找不到對應的定義檔 (會在這層 return 掉)
	 *
	 * IStaticSubMenuItem 為靜態產品(配合需求彈性調整)
	 *
	 * 目的是為了減少 find 造成 performance 低落以及明確的把動態靜態區分開，code 看起來可以更乾淨
	 *
	 * example : PRODUCTS.PragmaticPlaySlot | {... PRODUCTS.PragmaticPlaySlot,desktop: { menuActionType: MenuActionTypeEnum.UseGoToGame }}
	 *
	 */
	const onMenuOpen = (
		item: IDynamicSubMenuItem | IStaticSubMenuItem | undefined,
		{
			loginCallback,
			messageCallBack,
			liveStreamingCallback,
		}: {
			loginCallback: LoginCallbackType
			messageCallBack?: MessageCallbackType
			liveStreamingCallback: () => void
		}
	) => {
		if (!item) return

		const isDynamic = (
			item: IDynamicSubMenuItem | IStaticSubMenuItem
		): item is IDynamicSubMenuItem => {
			return (item as IDynamicSubMenuItem)?.isTpMaintain !== undefined
		}

		// * 動態靜態共用導轉 methods
		const redirectAction = (
			product: IDynamicSubMenuItem | IStaticSubMenuItem
		) => {
			const { desktop, h5, tpId, gameId, tpGameType, betType } = product || {}

			const { menuActionType } =
				Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) ===
					DeviceTypeEnum.Desktop
					? desktop || {}
					: h5 || {}

			const linkMethod = () => {
				const { pathname = '/', query } =
					(item as IDynamicSubMenuLinkType) || {}
				push({
					pathname,
					query,
				})
			}
			const enterPageMethod = () => {
				onEnterPage(
					{
						langId,
						tpId,
						gameId,
						tpGameType,
						bettype: betType,
					},
					{ loginCallback }
				)
			}
			const goToGameMethod = () => {
				onGoToGame(
					{
						tpId,
						langId,
						inputs: {
							gameId,
							fun: '0',
							gameType: tpId === PRODUCTS.NewPlayTechSlot.tpId ? 'slot' : '',
							tpGameType,
						},
					},
					{ loginCallback, messageCallBack }
				)
			}
			const windowOpenMethod = () => {
				if (window !== undefined) {
					const { pathname = '/' } = (item as IDynamicSubMenuLinkType) || {}
					window.open(pathname, pathname)
				}
			}

			const switchMethod = {
				[MenuActionTypeEnum.Link]: linkMethod,
				[MenuActionTypeEnum.EnterPage]: enterPageMethod,
				[MenuActionTypeEnum.UseGoToGame]: goToGameMethod,
				[MenuActionTypeEnum.WindowOpen]: windowOpenMethod,
				// * 靜態遊戲 enterPage 走 Default
				[MenuActionTypeEnum.Null]: enterPageMethod,
			}
			return switchMethod[menuActionType ?? MenuActionTypeEnum.Null]()
		}

		if (isDynamic(item)) {
			const { isTpMaintain, noPlay } = item || {}

			if (isTpMaintain) return

			if (noPlay) {
				liveStreamingCallback()
				return
			}
		}

		// * 靜態 (isTpMaintain noPlay 會在 onStaticMenuOpen 擋掉)
		redirectAction(item)
	}

	const onWindowOpenProduct = ({
		pathname,
		windowKey,
	}: {
		pathname: string
		windowKey: string
	}) => {
		const current = windows.find(window => window.key === windowKey);
		let newList = windows;
		if (current) {
			current.window.close();
			newList = windows.filter(window => window.key !== windowKey)
		}


		const newWindow = window.open(pathname, windowKey, 'toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0')
		if (newWindow) {
			newWindow.focus()
			setWindows([...newList, { window: newWindow, key: windowKey }])
		}
	}

	return {
		menuList: mergedMenus(),
		onStaticMenuOpen,
		onMenuOpen,
		onEnterPage,
		onGoToGame,
		onEnterSlotsPage,
		onDefaultEnterPage,
		isLobbyHeaderError,
	}
}

export { useMenu }
