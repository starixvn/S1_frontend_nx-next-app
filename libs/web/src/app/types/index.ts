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
	VND = 51,
	INR = 61,
	KHM = 72,
	BDT = 74,
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
	levelTabsName?: string
	level?: number
}

export interface IBannerByCurrencyData {
	url: string
	level: number
	levelText: string
}

export interface IStaticSlotTpGameType {
	[key: string]: {
		TP_ID: number
		TP_GAME_TYPE: number
		NAME: string
	}
}

export interface IStaticProduct {
	TP_ID: number
	GAME_ID?: number | string
	TP_GAME_TYPE?: number | null
	BET_TYPE?: number
	NAME?: string
	GAME_TYPE?: string
}

export interface IStaticLangGroups {
	[lang: string]: { displayText: string; value: string; currencyId: number }[]
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

	SPORTS_CRICKET?: CurrenciesEnum[]
	SPORTS_SABA_CLUB?: CurrenciesEnum[]
	SPORTS_VOLLEYBALL?: CurrenciesEnum[]

	LIVE_CASINO_WM?: CurrenciesEnum[]
	LIVE_CASINO_ALL_BET?: CurrenciesEnum[]
	LIVE_CASINO_AG?: CurrenciesEnum[]

	SLOTS_AMB?: CurrenciesEnum[]

	GAMES_POKER_M_POKER?: CurrenciesEnum[]
	GAMES_POKER_AMB_POKER?: CurrenciesEnum[]

	FISHING_SG?: CurrenciesEnum[]
	FISHING_CQ9_ONE_SHOT_FISHING?: CurrenciesEnum[]

	LOTTERY_GPI_THAILOTTERY?: CurrenciesEnum[]
	LUCKY_WHEEL?: CurrenciesEnum[]

	BANK_CARD?: CurrenciesEnum[]
	E_WALLET?: CurrenciesEnum[]
	ADDRESS?: CurrenciesEnum[]
	REFER_FRIENDS?: CurrenciesEnum[]
}

export interface IStaticVipEventCurrenciesLimitationInfo {
	[key: number]: {
		dailyWithdrawalLimitation: (number | null)[]
		tierUpGradeBonus: (number | null)[]
		monthlyMinimumDeposit: (number | null)[]
		minimumDepositWithinValidityPeriod: (number | null)[]
		minimumTurnoverWithinValidityPeriod: (number | null)[]
	}
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

export enum MenuKeyEnum {
	'Sports' = 'Sports',
	'Reward' = 'Reward',
	'Casino' = 'Casino',
	'Exchange' = 'Exchange',
	'Home' = 'Home',
	// 'AppDownload' = 'AppDownload',
	// 'CryptoSports' = 'CryptoSports',
	'ESports' = 'ESports',
	'Slot' = 'Slot',
	'Game' = 'Game',
	'Fishing' = 'Fishing',
	'Lottery' = 'Lottery',
	'Promotion' = 'Promotion',
	'VIP' = 'VIP',
	'LeaderBoard' = 'LeaderBoard',
	'Affiliates' = 'Affiliates',
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
				allowCurrencies: CurrenciesEnum[] | boolean // * true: 全開, false: 全關
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

export * from './footer'
export * from './promotion'
export * from './history'
export * from './deposit'
export * from './menu'
