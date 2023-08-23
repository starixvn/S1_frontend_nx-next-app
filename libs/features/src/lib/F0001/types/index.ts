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
	WindowOpen,
	Null,
}

// * 子選單資訊，h5、desktop 內為分裝置的資訊，以外的是共用資訊
export type ISubMenu<T> = {
	h5?: {
		className?: ''
		img?: string
	}
	desktop?: {
		className?: string
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
	productKey?: T
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
}

// * 主選單資訊，h5、desktop 內為分裝置的資訊，以外的是共用資訊
export type IMenuData<T> = {
	[module in MenuKeyEnum]: {
		display: 'h5' | 'desktop' | 'all'
		h5: {
			className?: string
			subMenuClassName?: string
			img?: string
			icon?: string
			eventIcons?: {
				icon: 'icon icon-new' | 'icon icon-mediafire'
				text: 'NEW' | 'HOT'
				period: { start: null | string; end: null | string }
			}[]
		}
		desktop: {
			className?: string
			subMenuClassName?: string
			img?: string
			icon?: string
			eventIcons?: {
				icon:
					| 'icon icon-new'
					| 'live'
					| 'icon icon-star-full'
					| 'icon icon-mediafire'
				text: 'NEW' | 'HOT' | 'LIVE'
				period: { start: null | string; end: null | string }
			}[]
			menuType?: 'menu' | 'banner'
		}
		displayKey?: string
		displayText?: string
		menuActionType: MenuActionTypeEnum
		product?: IStaticProduct
		query?: { provider: string; type: string }
		pathname?: string
		allowCurrencies: CurrenciesEnum[] | boolean // * true: 全開, false: 全關
		subMenuSort?: {
			[key: number]: T[]
		}
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

export enum GameTypeEnum {
	All,
}

export const channelIconClass: { [channelName: string]: string } = {
	Livechat: 'icon icon icon-chat',
	WhatsApp: 'icon icon-whatsapp',
	Telegram: 'icon icon-telegram',
	'E-mail': 'icon icon icon-envelope',
	Facebook: 'icon icon-facebook2',
	Twitter: 'icon icon-twitter',
	Instagram: 'icon icon-instagram',
	LINE: 'icon icon-line',
	Youtube: 'icon icon-youtube',
}
