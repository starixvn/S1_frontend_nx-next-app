import { includes, find } from 'lodash-es'
import { useRouter } from 'next/router'
import { paths, PRODUCTS } from '@nx-next-app/constants'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { useMenuData } from '@nx-next-app/hooks'
import {
	DeviceTypeEnum,
	LoginGameTypeEnum,
	MenuActionTypeEnum,
	MenuKeyEnum,
} from '@nx-next-app/types'
import {
	IAxiosError,
	IGotoGameArg,
	useLazyGotoGameQuery,
} from '@nx-next-app/service'
import { MENU_DATA } from '@nx-next-app/site/yashbet'
import { getIsTpMaintain, onWindowOpenProduct } from '@nx-next-app/utils'
import type {
	IStaticSubMenuItem,
	IDynamicSubMenuItem,
} from '@nx-next-app/features/F0006/types/menu'

type LoginCallbackType = () => void
type MessageCallbackType = (message: string) => void

export type IMergedMenuData = {
	display?: 'h5' | 'desktop' | 'all'
	displayKey?: string
	pathname?: string
	lobbyCategoryId?: number | undefined
	subMenuAllowCurrenciesWithAuth?: boolean | undefined // * 決定是否需要登入後才過濾
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
	[LoginGameTypeEnum.returnHtml]: [PRODUCTS.PGSoft.tpId],
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
		userInfo: { langId },
	} = useAuth()
	const { tpMaintainList } = useGlobalData()
	const { LobberHeaderMenuList, isLobbyHeaderError } = useMenuData()
	const [gotoGame] = useLazyGotoGameQuery()

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

			const subMenus = data.map(subMenuItem => {
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
		if (
			tpId === 1 &&
			(Number(gameId) < 100 || includes([161, 180, 192, 2002], gameId))
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
	/**
	 *
	 * @param item -- 靜態遊戲產品 ex: ...PRODUCTS.CryptoSports
	 * @param loginCallback -- 登入彈窗
	 * @param underMaintenanceCallback -- 維護彈窗
	 * @param messageCallBack -- gotoGame api error handling 彈窗
	 */
	const onStaticMenuOpen = (
		item: IStaticSubMenuItem | undefined,
		{
			loginCallback,
			underMaintenanceCallback,
			messageCallBack,
		}: {
			loginCallback: () => void
			underMaintenanceCallback: () => void
			messageCallBack: (message: string) => void
		}
	) => {
		if (!item) return
		// * 插入 maintenance
		const isTpMaintain = getIsTpMaintain({
			tpMaintainList,
			tpId: item.tpId,
			tpGameType: item.tpGameType,
		})

		if (isTpMaintain) {
			underMaintenanceCallback()
		} else {
			onMenuOpen(item, {
				loginCallback,
				messageCallBack,
			})
		}
	}

	/**
	 *
	 * @param item
	 * @param loginCallback -- 登入彈窗
	 * @param messageCallBack -- gotoGame api error handling 彈窗
	 *
	 * ISubMenuItem 為動態遊戲產品(lobbyHeader api 來的)
	 *
	 * undefined 是動態遊戲找不到對應的定義檔 (會在這層 return 掉)
	 *
	 * IStaticSubMenuItem 為靜態產品(配合需求彈性調整) 產品＋導向 組合而成
	 *
	 * 目的是為了減少 find 造成 performance 低落以及明確的把動態靜態區分開，code 看起來可以更乾淨
	 *
	 * example : PRODUCTS.PragmaticPlaySlot | {... PRODUCTS.PragmaticPlaySlot,desktop: { menuActionType: MenuActionTypeEnum.UseGoToGame }}
	 */
	const onMenuOpen = (
		item: IDynamicSubMenuItem | IStaticSubMenuItem | undefined,
		{
			loginCallback,
			messageCallBack,
		}: {
			loginCallback: LoginCallbackType
			messageCallBack?: MessageCallbackType
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
				// @ts-expect-error : exhaustive checking not working. need to check exactly version
				const { pathname = '/', query } = item || {}
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
					// @ts-expect-error : exhaustive checking not working. need to check exactly version
					const { pathname = '/' } = item || {}
					window.open(pathname, pathname)
				}
			}

			const switchMethod = {
				[MenuActionTypeEnum.Link]: linkMethod,
				[MenuActionTypeEnum.EnterPage]: enterPageMethod,
				[MenuActionTypeEnum.UseGoToGame]: goToGameMethod,
				[MenuActionTypeEnum.WindowOpen]: windowOpenMethod,

				// * 靜態遊戲 enterPage 走 Default
				default: () => enterPageMethod(),
			}
			// @ts-expect-error: use default to avoid Type undefined cannot be used as an index type
			return (switchMethod[menuActionType] || switchMethod.default)()
		}

		if (isDynamic(item)) {
			const { isTpMaintain } = item || {}

			if (isTpMaintain) return

			redirectAction(item)
		}

		// * 靜態 (isTpMaintain noPlay 會在 onStaticMenuOpen 擋掉)
		redirectAction(item)
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
