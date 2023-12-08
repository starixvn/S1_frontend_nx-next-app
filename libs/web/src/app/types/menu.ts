import { CurrenciesEnum, IStaticProduct, MenuKeyEnum } from '.'
import { PRODUCTS } from '../constants/products'

export enum MenuActionTypeEnum {
	EnterPage,
	Link,
	UseGoToGame,
	WindowOpen,
	Null,
}

export type MenuEventIcon = {
	icon:
		| 'icon'
		| 'icon icon-new'
		| 'new-icon'
		| 'live'
		| 'icon icon-star-full'
		| 'icon mediafire'
		| 'icon icon-mediafire'

	text: 'NEW' | 'HOT' | 'LIVE'
	period: { start: null | string; end: null | string }
}

// * 子選單資訊，h5、desktop 內為分裝置的資訊，以外的是共用資訊
export type ISubMenu = {
	h5?: {
		className?: ''
		headerMenuImgList?: {
			className: string
			imgUrl: string
		}[]
		img?: string
		menuActionType: MenuActionTypeEnum
		hasDesktopLink?: boolean // * 決定是否有顯示 desktop & play now 按鈕
	}
	desktop?: {
		className?: string
		headerMenuImgList?: {
			className: string
			imgUrl: string
		}[]
		lobbyPage?: {
			bgImg?: string
			hoverBgImg?: string
			npcImg?: string
		}
		menuActionType: MenuActionTypeEnum
	}
	productKey?: keyof typeof PRODUCTS
	displayText?: string
	displayKey?: string
	pathname?: string
	query?: {
		provider?: string
		type?: string
		tpId?: string | number
		tpGameType?: string | number
	}
	product?: IStaticProduct
	allowCurrencies?: CurrenciesEnum[] | undefined
	needLogin?: boolean
	isTpMaintain?: boolean
	eventIcons?: MenuEventIcon[]
}

// * 主選單資訊，h5、desktop 內為分裝置的資訊，以外的是共用資訊
export type IMenuData = {
	[module in MenuKeyEnum]: {
		display: 'h5' | 'desktop' | 'all'
		h5: {
			className?: string
			subMenuClassName?: string
			img?: string
			icon?: string
			eventIcons?: {
				icon: 'icon icon-new' | 'icon mediafire' | 'icon icon-mediafire'
				text: 'NEW' | 'HOT'
				period: { start: null | string; end: null | string }
			}[]
			menuActionType: MenuActionTypeEnum
		}
		desktop: {
			className?: string
			subMenuClassName?: string
			img?: string
			icon?: string
			eventIcons?: MenuEventIcon[]
			menuType?: 'menu' | 'banner'
			menuActionType: MenuActionTypeEnum
		}
		displayKey?: string
		displayText?: string
		product?: IStaticProduct
		query?: { provider: string; type: string }
		pathname?: string
		allowCurrencies?: CurrenciesEnum[] | boolean // * true: 全開, false: 全關
		subMenuSort?: {
			[key: number]: string[]
		}

		subMenuAllowCurrenciesWithAuth: boolean // * 決定是否需要登入後才過濾
		subMenu?: ISubMenu[]
	}
}
