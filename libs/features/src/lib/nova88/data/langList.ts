import { CurrenciesEnum } from '../types'

const LANG_GROUPS = {
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

const CURRENCY_TO_LANG_KEY = {
	2: 'ch',
	3: 'gb',
	4: 'th',
	13: 'cs',
	15: 'id',
	61: 'in',
	72: 'kh',
	74: 'bd',
}

const LANG_GROUP_COUNTRY = {
	ch: 'Malaysia',
	th: 'Thailand',
	id: 'Indonesia',
	in: 'India',
	cs: 'China',
	gb: 'Global',
	bd: 'Bangladesh',
	kh: 'Cambodia',
}

export const LANG_DATA = {
	langGroups: LANG_GROUPS,
	currencyToLangKey: CURRENCY_TO_LANG_KEY,
	langGroupCountry: LANG_GROUP_COUNTRY,
}

export const LANG_TO_CURRENCY: { [key: string]: number } = {
	en: 2,
	cs: 2,
	my: 2,
	th: 4,
	id: 15,
	hi: 61,
	kh: 72,
	bd: 74,
}
