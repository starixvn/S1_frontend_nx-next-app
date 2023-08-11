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
	[key: string]: CurrenciesEnum[]
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

// 根據 Admin 新的 bonusType 調整
export enum PromotionTypeEnum {
	FirstDeposit = 1,
	Redeposit = 2,
	FreeBet = 3,
	WalletBonus = 5,
	Rebate = 6,
	Cashback = 7,
	SpecialBonus = 8,
}

export enum BonusTypeEnum {
	Percentage = 1,
	Amount,
}

export enum MenuKeyEnum {
	'Sports' = 'Sports',
	'Reward' = 'Reward',
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

export * from './footer'
