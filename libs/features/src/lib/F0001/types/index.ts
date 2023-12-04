import { PRODUCTS } from '@nx-next-app/constants'
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
export type IMenuData = {
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
			menuActionType: MenuActionTypeEnum
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

export enum SocialChannelEnum {
	HOME = 1,
	CONTACT_US,
	APP,
	FOOTER,
}

export const footerImgName: Record<string, string> = {
	Youtube: 'youtube.png',
	Telegram: 'tga.png',
	Facebook: 'fb.png',
	Twitter: 'twitter.png',
	Instagram: 'ig.png',
	WhatsApp: 'whatsapp.png',
	'E-mail': 'email-2.png',
	Livechat: 'livechat-2.png',
	LINE: 'line-1.png',
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

export enum WithdrawalStatusEnum {
	Pending = 1,
	OnHold,
	Verify,
	Process,
	Cancelled,
	Approved,
	Rejected,
	ToKyc,
}

export const statusClassNames: { [status: number]: string } = {
	[WithdrawalStatusEnum.Pending]: 'pending',
	[WithdrawalStatusEnum.OnHold]: 'pending',
	[WithdrawalStatusEnum.Verify]: 'pending',
	[WithdrawalStatusEnum.Process]: 'pending',
	[WithdrawalStatusEnum.Cancelled]: 'cancel',
	[WithdrawalStatusEnum.Approved]: 'approved',
	[WithdrawalStatusEnum.Rejected]: 'reject',
	[WithdrawalStatusEnum.ToKyc]: 'pending',
}

// 前端用來管理 withdrawal 介面狀態的 enum
export enum WithdrawalPanelStatusEnum {
	Init,
	Confirm,
}

// 僅用於前端判斷卡片類型使用的 enum
export enum WithdrawalBankCardEnum {
	Undefined,
	LocalBank,
	EWallet,
	Crypto,
}

// 僅用於前端判斷 kyc 狀態的 enum
export enum KycStatusEnum {
	Normal,
	KycUpload,
	KycPending,
}

export * from './home'
