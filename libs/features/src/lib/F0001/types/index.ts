import { CurrenciesEnum, IStaticProduct } from '@nx-next-app/types'

export enum CategoryEnum {
	SPORTS = 1,
	SLOTS,
	LIVE_CASINO,
	FISHING,
	COCKFIGHTING,
	LOTTERY,
	VIRTUAL_SPORTS,
	POKER,
}

export enum MenuKeyEnum {
	'Sports' = 'Sports',
	'LiveCasino' = 'LiveCasino',
	'Exchange' = 'Exchange',
	'Home' = 'Home',
	'AppDownload' = 'AppDownload',
	'CryptoSports' = 'CryptoSports',
	'ESports' = 'ESports',
	'Slots' = 'Slots',
	'Games' = 'Games',
	'Fishing' = 'Fishing',
	'Lottery' = 'Lottery',
	'Promotion' = 'Promotion',
	'VIP' = 'VIP',
}

export enum MenuActionTypeEnum {
	EnterPage,
	Link,
	UseGoToGame,
}

export type ISubMenu = {
	displayText?: string
	displayKey?: string
	className?: string
	pathname?: string
	query?: { provider?: string; type?: string }
	product?: IStaticProduct
	menuActionType: MenuActionTypeEnum
	allowCurrencies?: CurrenciesEnum[]
	needLogin?: boolean
	eventIcons?: {
		icon:
			| 'icon icon-new'
			| 'live'
			| 'icon icon-star-full'
			| 'icon icon-mediafire'
		period: { start: null | string; end: string }
	}[]
	headerMenuImgList?: {
		className: 'List-npc' | 'List-bg'
		imgUrl: string
	}[]
	lobbyPage?: {
		bgImg?: string
		hoverBgImg?: string
		npcImg?: string
	}
}

export type IMenuData = {
	[module in MenuKeyEnum]: {
		displayKey?: string
		displayText?: string
		className?: string
		subMenuClassName?: string
		menuActionType?: MenuActionTypeEnum
		product?: IStaticProduct
		query?: { provider: string; type: string }
		pathname?: string
		eventIcons?: {
			icon: string
			period: { start: null | string; end: string }
		}[]
		checkBeforeLogin?: boolean
		allowCurrencies?: CurrenciesEnum[]
		subMenuSort?: {
			[key: number]: (number | null)[]
		}
		menuType?: 'menu' | 'banner'
		subMenu?: ISubMenu[]
	}
}
