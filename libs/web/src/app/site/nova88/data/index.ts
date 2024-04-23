import { CurrenciesEnum, IStaticLangGroups } from '@nx-next-app/types'

export * from './vip'
export * from './join'
export * from './menu'
export * from './slots'
export * from './images'
export * from './footer'
export * from './leftMenu'
export * from './metaData'
export * from './affiliate'
export * from './eventPeriod'
export * from './allowCurrency'
export * from './termsConditions'
export * from './gtmData'
export * as ThirdPartyJS from './thirdPartyJS'

export const LANG_GROUPS: IStaticLangGroups = {
	bd: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.BDT,
		},
		{
			displayText: 'বাংলা',
			value: 'bd',
			currencyId: CurrenciesEnum.BDT,
			mainLanguage: true,
		},
	],
	br: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.BRL,
		},
		{
			displayText: 'Portugese',
			value: 'br',
			currencyId: CurrenciesEnum.BRL,
			mainLanguage: true,
		},
	],
	cs: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.CNY,
		},
		{
			displayText: '简体中文',
			value: 'cs',
			currencyId: CurrenciesEnum.CNY,
			mainLanguage: true,
		},
	],
	gb: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.USD,
			mainLanguage: true,
		},
		{
			displayText: '简体中文',
			value: 'cs',
			currencyId: CurrenciesEnum.USD,
		},
	],
	id: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.IDR,
		},
		{
			displayText: 'Indonesian',
			value: 'id',
			currencyId: CurrenciesEnum.IDR,
			mainLanguage: true,
		},
	],
	in: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.INR,
		},
		{
			displayText: 'हिंदी',
			value: 'hi',
			currencyId: CurrenciesEnum.INR,
			mainLanguage: true,
		},
	],
	// 日本語位置
	kh: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.KHM,
		},
		{
			displayText: 'ខ្មែរ',
			value: 'kh',
			currencyId: CurrenciesEnum.KHM,
			mainLanguage: true,
		},
	],
	ko: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.KRW,
		},
		{
			displayText: '한국어',
			value: 'ko',
			currencyId: CurrenciesEnum.KRW,
			mainLanguage: true,
		},
	],
	ch: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.MYR,
		},
		{
			displayText: '简体中文',
			value: 'cs',
			currencyId: CurrenciesEnum.MYR,
		},
		{
			displayText: 'Malay',
			value: 'my',
			currencyId: CurrenciesEnum.MYR,
			mainLanguage: true,
		},
	],
	th: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.THB,
		},
		{
			displayText: 'ภาษาไทย',
			value: 'th',
			currencyId: CurrenciesEnum.THB,
			mainLanguage: true,
		},
	],
	vn: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.VND,
		},
		{
			displayText: 'Tiếng Việt',
			value: 'vn',
			currencyId: CurrenciesEnum.VND,
			mainLanguage: true,
		},
	],
}

// liveChat 專屬
export const LIVE_CHAT_ID_BY_LANG_ID: {
	[langId: string]: number
} = {
	en: 1,
	id: 2,
	cs: 3,
	th: 4,
	hi: 8,
	ko: 13,
	br: 14,
	jp: 15,
}
