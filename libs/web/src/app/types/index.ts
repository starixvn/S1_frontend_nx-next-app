import { ReactNode } from 'react'

export interface IEventPeriod {
	start: null | string
	end: null | string
}

export enum CurrenciesEnum {
	MYR = 2,
	USD = 3,
	THB = 4,
	CNY = 13,
	IDR = 15,
	KRW = 45,
	VND = 51,
	INR = 61,
	KHM = 72,
	BDT = 74,
	BRL = 82,
	USDT = 96,
}

export enum DeviceTypeEnum {
	Desktop = 1,
	Mobile,
	NativeAPP,
}

export interface IImageData {
	url: string
	alt: string
	headerUrl?: string
	displayKey?: string
	settingDisplayKey?: string
	levelTabsName?: string
	level?: number
}

export interface IBannerByCurrencyData {
	url: string
	level: number
	levelText: string
}

export interface IStaticLangGroups {
	[lang: string]: {
		displayText: string
		value: string
		currencyId: number
		mainLanguage?: boolean
	}[]
}

export interface IStaticAllowedCurrencies {
	VIP?: CurrenciesEnum[]
	AFFILIATE?: CurrenciesEnum[]
	EXCHANGE?: CurrenciesEnum[]
	REWARDS?: CurrenciesEnum[]
	LEADER_BOARD?: CurrenciesEnum[]
	APP_DOWNLOAD?: CurrenciesEnum[]

	TRANSFER?: CurrenciesEnum[]
	BANK_INFO?: CurrenciesEnum[]

	GAMES_MPOKER?: CurrenciesEnum[]

	JACKPOT?: CurrenciesEnum[]

	ESPORT_IM_E_SPORT?: CurrenciesEnum[]
	ESPORT_TF_GAMING?: CurrenciesEnum[]
	SPORTS_E_SPORTS_TFG?: CurrenciesEnum[]

	SPORTS_CRICKET?: CurrenciesEnum[]
	SPORTS_SABA_CLUB?: CurrenciesEnum[]
	SPORTS_VOLLEYBALL?: CurrenciesEnum[]
	SLOTS_PEGASUS?: CurrenciesEnum[]
	SLOTS_SPRIBE?: CurrenciesEnum[]
	SLOTS_END?: CurrenciesEnum[]

	LIVE_CASINO_PP?: CurrenciesEnum[]
	LIVE_CASINO_WM?: CurrenciesEnum[]
	LIVE_CASINO_ALL_BET?: CurrenciesEnum[]
	LIVE_CASINO_AG?: CurrenciesEnum[]
	LIVE_CASINO_N2?: CurrenciesEnum[]
	LIVE_SKY_WIND?: CurrenciesEnum[]
	LIVE_CASINO_PT?: CurrenciesEnum[]
	LIVE_CASINO_DG?: CurrenciesEnum[]
	LIVE_CASINO_MG?: CurrenciesEnum[]
	LIVE_CASINO_SA?: CurrenciesEnum[]
	LIVE_CASINO_BG?: CurrenciesEnum[]

	SLOTS_PP?: CurrenciesEnum[]
	SLOTS_AMB?: CurrenciesEnum[]
	SLOTS_PG?: CurrenciesEnum[]
	SLOTS_FA_CHAI?: CurrenciesEnum[]
	SLOTS_SKY_WIND?: CurrenciesEnum[]
	SLOTS_JOKER?: CurrenciesEnum[]
	SLOTS_PT?: CurrenciesEnum[]
	SLOTS_MGPSW?: CurrenciesEnum[]
	SLOTS_SIMPLE_PLAY?: CurrenciesEnum[]
	SLOTS_SG?: CurrenciesEnum[]
	SLOTS_AMIGO?: CurrenciesEnum[]
	SLOTS_ES?: CurrenciesEnum[]

	GAMES_V8_POKER?: CurrenciesEnum[]
	GAMES_POKER_M_POKER?: CurrenciesEnum[]
	GAMES_POKER_AMB_POKER?: CurrenciesEnum[]
	GAME_SPACEMAN?: CurrenciesEnum[]
	GAME_AVIATOR?: CurrenciesEnum[]
	GAME_MINES?: CurrenciesEnum[]
	GAME_GOAL?: CurrenciesEnum[]
	GAME_DICE?: CurrenciesEnum[]

	FISHING_SG?: CurrenciesEnum[]
	FISHING_CQ9_ONE_SHOT_FISHING?: CurrenciesEnum[]
	FISHING_HUNTING_HAPPY_FISH_5?: CurrenciesEnum[]
	FISHING_HAIBA?: CurrenciesEnum[]
	FISHING_HUNTING_MONSTER_AWAKEN?: CurrenciesEnum[]
	FISHING_SGW?: CurrenciesEnum[]
	FISHING_ZOMBIE_PARTY?: CurrenciesEnum[]
	FISHING_ALIEN_HUNTER?: CurrenciesEnum[]

	FOUR_D_GRAND_DRAGON?: CurrenciesEnum[]

	LOTTERY_GPI_THAILOTTERY?: CurrenciesEnum[]
	LOTTERY_GPI_FAST3?: CurrenciesEnum[]

	BANK_CARD?: CurrenciesEnum[]
	E_WALLET?: CurrenciesEnum[]
	REFER_FRIENDS?: CurrenciesEnum[]

	// === Profile method ===
	ADDRESS?: CurrenciesEnum[]

	// Deposit
	RECEIPT: CurrenciesEnum[]

	// Home
	LIVE_STREAMING_LINK: CurrenciesEnum[]
	LUCKY_WHEEL?: CurrenciesEnum[]

	// Euro-Cup
	Euro_Cup: CurrenciesEnum[]

	Retention?: CurrenciesEnum[]
}

export interface ITermsConditions {
	TermsConditions: string
	OurPolicies: string
	PrivacyPolicy: string
	CookiePolicy: string
	RuleRegulations: string
	AccountTerms: string
	FAQ: string
	AboutUs: string
	Terms: string
	ContactUs: string
	ResposibleGaming: string
}

export interface IMetaData {
	[path: string]: {
		[lang: string]: {
			title?: string
			description?: string
			keyword?: string
			links: {
				rel?: string
				href?: string
				media?: string
				hrefLang?: string
			}[]
		}
	}
}

// 稽查 Admin 目前後端的設定 1 為 MainBanner
export enum BannerTypeEnum {
	Main = 1,
	HotEvent = 2,
	Slots,
}

export enum BannerActionEnum {
	NoAction = 1,
	GoToGame,
	GoToBonus,
	OpenWindow,
	RedirectPage,
	RedirectPageOfThisSite,
}

export enum BonusTypeEnum {
	Percentage = 1,
	Amount,
}

export enum MainMenuIcon {
	newTag = 'newTag',
	hotTag = 'hotTag',
}

export enum TpGameType {
	All,
}

export enum LinkTypeEnum {
	Url = 1,
	QRCode,
}

export enum LeftMenuKeyEnum {
	'Cashier' = 'Cashier',
	'MyAccount' = 'MyAccount',
	'Message' = 'Message',
}

export type ILeftMenuData = {
	[key in LeftMenuKeyEnum]: {
		displayKey: string
		subMenu: {
			[key: string]: {
				displayKey: string
				pathname: string
				allowCurrencies?: CurrenciesEnum[] | boolean // * true: 全開, false: 全關
			}
		}
	}
}

export type SelectOptionType = {
	className?: string
	value: string | number | undefined
	label: string | number | null | ReactNode
	disabled?: boolean
	prefixOptionIcon?: ReactNode
}

//* 有特殊開啟遊戲需求（例：以 api 回傳的 message 另開頁面）
export enum LoginGameTypeEnum {
	returnGameUrl = 1,
	returnHtml,
}

export * from './footer'
export * from './promotion'
export * from './history'
export * from './deposit'
export * from './menu'
export * from './vip'
export * from './leaderBoard'
export * from './milestone'

// * 在 Deposit 中如果 extraDataType 為 1 需顯示銀行卡下拉、2 需顯示 E-Wallet 下拉、0 則不顯示任何下拉
export enum DepositExtraDataTypeEnum {
	none,
	bankCard,
	eWallt,
}
