import { CurrenciesEnum, IStaticLangGroups } from '@nx-next-app/types'

export * from './allowCurrency'
export * from './vip'
export * from './products'
export * from './termsConditions'
export * from './join'
export * from './metaData'
export * from './menu'

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
}
