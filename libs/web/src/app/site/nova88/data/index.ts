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
		},
	],
	th: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.THB,
		},
		{ displayText: 'ไทย', value: 'th', currencyId: CurrenciesEnum.THB },
	],
	vn: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.VND,
		},
		{ displayText: 'Tiếng Việt', value: 'vn', currencyId: CurrenciesEnum.VND },
	],
	id: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.IDR,
		},
		{
			displayText: 'Bhs Indonesia',
			value: 'id',
			currencyId: CurrenciesEnum.IDR,
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
		},
	],
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
		},
	],
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
		},
	],
	gb: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.USD,
		},
		{
			displayText: '简体中文',
			value: 'cs',
			currencyId: CurrenciesEnum.USD,
		},
	],
	ko: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.KRW,
		},
		{
			// TODO
			displayText: '韓文',
			value: 'ko',
			currencyId: CurrenciesEnum.KRW,
		},
	],
	br: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.BRL,
		},
		{
			// TODO
			displayText: '巴西',
			value: 'br',
			currencyId: CurrenciesEnum.BRL,
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
}
