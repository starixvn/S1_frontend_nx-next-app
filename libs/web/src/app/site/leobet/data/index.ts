import { CurrenciesEnum, IStaticLangGroups } from '@nx-next-app/types'

export * from './vip'
export * from './join'
export * from './menu'
export * from './slots'
export * from './images'
export * from './footer'
export * from './leftMenu'
export * from './metaData'
export * from './appDownload'
export * from './eventPeriod'
export * from './allowCurrency'
export * from './termsConditions'

export const LANG_GROUPS: IStaticLangGroups = {
	// ch: [
	// 	{
	// 		displayText: 'English',
	// 		value: 'en',
	// 		currencyId: CurrenciesEnum.MYR,
	// 	},
	// 	{
	// 		displayText: '简体中文',
	// 		value: 'cs',
	// 		currencyId: CurrenciesEnum.MYR,
	// 	},
	// 	{
	// 		displayText: 'Malay',
	// 		value: 'my',
	// 		currencyId: CurrenciesEnum.MYR,
	// 	},
	// ],
	// th: [
	// 	{
	// 		displayText: 'English',
	// 		value: 'en',
	// 		currencyId: CurrenciesEnum.THB,
	// 	},
	// 	{ displayText: 'ไทย', value: 'th', currencyId: CurrenciesEnum.THB },
	// ],
	// id: [
	// 	{
	// 		displayText: 'English',
	// 		value: 'en',
	// 		currencyId: CurrenciesEnum.IDR,
	// 	},
	// 	{
	// 		displayText: 'Bhs Indonesia',
	// 		value: 'id',
	// 		currencyId: CurrenciesEnum.IDR,
	// 	},
	// ],
	in: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.INR,
		},
		{
			displayText: 'Hindi',
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
	// kh: [
	// 	{
	// 		displayText: 'English',
	// 		value: 'en',
	// 		currencyId: CurrenciesEnum.KHM,
	// 	},
	// 	{
	// 		displayText: 'ខ្មែរ',
	// 		value: 'kh',
	// 		currencyId: CurrenciesEnum.KHM,
	// 	},
	// ],
	// cs: [
	// 	{
	// 		displayText: 'English',
	// 		value: 'en',
	// 		currencyId: CurrenciesEnum.CNY,
	// 	},
	// 	{
	// 		displayText: '简体中文',
	// 		value: 'cs',
	// 		currencyId: CurrenciesEnum.CNY,
	// 	},
	// ],
	// gb: [
	// 	{
	// 		displayText: 'English',
	// 		value: 'en',
	// 		currencyId: CurrenciesEnum.USD,
	// 	},
	// 	{
	// 		displayText: '简体中文',
	// 		value: 'cs',
	// 		currencyId: CurrenciesEnum.USD,
	// 	},
	// ],
}

export const LANG_TO_CURRENCY: { [key: string]: number } = {
	en: 61,
	cs: 2,
	my: 2,
	th: 4,
	id: 15,
	hi: 61,
	kh: 72,
	bd: 74,
}
