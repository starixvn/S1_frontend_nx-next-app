import { IProduct } from "@nx-next-app/constants"

export enum MenuKeyEnum {
	'Sports' = 'Sports',
	'Casino' = 'Casino',
	'Exchange' = 'Exchange',
	'ESports' = 'ESports',
	'Slot' = 'Slot',
	'Game' = 'Game',
	'Fishing' = 'Fishing',
	'FourD' = 'FourD',
	'Lottery' = 'Lottery',
	// 靜態 category
	'Promotion' = 'Promotion',
	'VIP' = 'VIP',
	'LeaderBoard' = 'LeaderBoard',
}

export const LobbyCategoryEnum = {
	Sports: 1,
	ESports: 2,
	Casino: 3,
	SLOTS: 4,
	Poker: 5,
	Game: 6,
	Fishing: 7,
	Lottery: 8,
	Exchange: 9,
	FourD: 10,
} as const

export enum MenuIconTypeEnum {
	NO_ICON,
	New,
}

export const MenuActionTypeEnum = {
	EnterPage: 'EnterPage',
	Link: 'Link',
	UseGoToGame: 'UseGoToGame',
	WindowOpen: 'WindowOpen',
	Null: 'Null',
} as const

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

export interface ISubMenu extends IProduct {
	h5: {
		hasLobby: boolean
		menuActionType: keyof typeof MenuActionTypeEnum
		hasDesktopLink?: boolean
	}
	desktop: {
		hasLobby: boolean
		menuActionType: keyof typeof MenuActionTypeEnum
		subMenuImageClassName?: string
	}
	pathname?: string
	query?: {
		provider?: string
		type?: string
		tpId?: string | number
	}
	needLogin?: boolean
}

export type IMenuData = {
	display: 'h5' | 'desktop' | 'all'
	displayKey: string
	pathname?: string
	lobbyCategoryId: number
	subMenuAllowCurrenciesWithAuth: boolean // * 決定是否需要登入後才過濾(暫時沒有用到)
	query?: { provider: string }
	subMenu: ISubMenu[]
	category: MenuKeyEnum
	h5: {
		icon: string
		subMenuClassName?: string
	}
	desktop: {
		subMenuClassName: string
		menuType?: 'menu' | 'banner'
	}
}