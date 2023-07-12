import { CurrenciesEnum, IStaticProduct, MenuKeyEnum } from '@nx-next-app/types'

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

export enum MenuActionTypeEnum {
	EnterPage,
	Link,
	UseGoToGame,
	Null,
}

export type ISubMenu<T> = {
	productKey?: T
	displayText?: string
	displayKey?: string
	className?: string
	pathname?: string
	query?: { provider?: string; type?: string }
	product?: IStaticProduct
	menuActionType: MenuActionTypeEnum
	allowCurrencies?: CurrenciesEnum[] | undefined
	needLogin?: boolean
	isTpMaintain?: boolean
	eventIcons?: {
		icon:
			| 'icon icon-new'
			| 'live'
			| 'icon icon-star-full'
			| 'icon icon-mediafire'

		text: 'NEW' | 'HOT' | 'LIVE'
		period: { start: null | string; end: null | string }
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

/**
 * @param eventIcons fds
 */
export type IMenuData<T> = {
	[module in MenuKeyEnum]: {
		displayKey?: string
		displayText?: string
		className: string
		subMenuClassName?: string
		menuActionType: MenuActionTypeEnum
		product?: IStaticProduct
		query?: { provider: string; type: string }
		pathname?: string
		eventIcons?: {
			icon:
				| 'icon icon-new'
				| 'live'
				| 'icon icon-star-full'
				| 'icon icon-mediafire'
			text: 'NEW' | 'HOT' | 'LIVE'
			period: { start: null | string; end: null | string }
		}[]

		allowCurrencies: CurrenciesEnum[] | boolean // * true: 全開, false: 全關
		subMenuSort?: {
			[key: number]: T[]
		}
		menuType?: 'menu' | 'banner'
		subMenuAllowCurrenciesWithAuth: boolean // * 決定是否需要登入後才過濾
		subMenu?: ISubMenu<T>[]
	}
}

export enum SocialChannelEnum {
	HOME = 1,
	CONTACT_US,
	APP,
	FOOTER,
}

export const footerImgName: Record<string, string> = {
	Youtube: 'yta.png',
	Telegram: 'tga.png',
	Facebook: 'fba.png',
	Twitter: 'twa.png',
	Instagram: 'ina.png',
	Pinterest: 'pta.png',
	WhatsApp: 'waa.png',
	'E-mail': 'ema.png',
	Livechat: 'chat.png',
	LINE: 'line.png',
}
