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
	Null,
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

// // * 子選單資訊，h5、desktop 內為分裝置的資訊，以外的是共用資訊
// export interface ISubMenu extends IProduct {
// 	h5?: {
// 		menuActionType: keyof typeof MenuActionTypeEnum
// 		hasDesktopLink?: boolean // * 決定是否有顯示 desktop & play now 按鈕
// 	}
// 	desktop?: {
// 		menuActionType: keyof typeof MenuActionTypeEnum
// 	}
// 	pathname?: string
// 	query?: {
// 		provider?: string
// 		type?: string
// 		tpId?: string | number
// 		tpGameType?: string | number
// 	}
// 	needLogin?: boolean
// }
//
// // * 主選單資訊，h5、desktop 內為分裝置的資訊，以外的是共用資訊
// export type IMenuData = {
// 	display: 'h5' | 'desktop' | 'all'
// 	displayKey: string
// 	pathname?: string
// 	lobbyCategoryId: number
// 	subMenuAllowCurrenciesWithAuth: boolean // * 決定是否需要登入後才過濾
// 	query?: { provider: string }
// 	subMenu: ISubMenu[]
// 	category: MenuKeyEnum
// 	h5: {
// 		icon: string
// 		subMenuClassName?: string
// 	}
// 	desktop: {
// 		subMenuClassName: string
// 		menuType?: 'menu' | 'banner'
// 	}
// }
