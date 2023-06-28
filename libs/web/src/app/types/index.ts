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

export interface IImageData {
	url: string
	alt: string
	displayKey?: string
}

export interface IStaticSlotTpGameType {
	[key: string]: {
		TP_ID: number
		TP_GAME_TYPE: number
		NAME: string
	}
}

export interface IStaticProducts {
	[key: string]: {
		TP_ID: number
		NAME?: string
		BET_TYPE?: number
		TP_GAME_TYPE?: number
		GAME_ID?: number | string
	}
}

export interface IStaticLangGroups {
	[lang: string]: { displayText: string; value: string; currencyId: number }[]
}

export interface IStaticAllowedCurrencies {
	VIP: CurrenciesEnum[]
	AFFILIATE: CurrenciesEnum[]
	EXCHANGE: CurrenciesEnum[]
	WORLD_CIP: CurrenciesEnum[]
	REWARDS: CurrenciesEnum[]
	WITHDRAWAL_METHOD: {
		BANK_CARD: CurrenciesEnum[]
		E_WALLET: CurrenciesEnum[]
	}
	PRODUCTS: {
		SLOT_AMB: CurrenciesEnum[]
		SLOT_WM: CurrenciesEnum[]
		GAME_M_POKER: CurrenciesEnum[]
		GAME_AMB: CurrenciesEnum[]
		GAME_V_GAMING: CurrenciesEnum[]
		FISHING_GOD: CurrenciesEnum[]
		FISHING_ONT_SHOT: CurrenciesEnum[]
		FISHING_THAI_LOTTERY: CurrenciesEnum[]
	}
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
