import { CurrenciesEnum, IStaticLangGroups } from '@nx-next-app/types'

export * from './vip'
export * from './join'
export * from './menu'
export * from './slots'
export * from './images'
export * from './footer'
export * from './leftMenu'
export * from './metaData'
export * from './eventPeriod'
export * from './allowCurrency'
export * from './termsConditions'

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

export const CURRENCY_PAYMENT_LIST: {
	[currency: string]: { name: string; img: string }[]
} = {
	MYR: [
		{
			name: 'help2pay',
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/help2pay.png`,
		},
		{
			name: 'fpay',
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/fpay.png`,
		},
		{
			name: 'truepay',
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/truepay.png`,
		},
		{
			name: 'tngqr',
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/tngqr.png`,
		},
		{
			name: 'duitnowqr',
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/duitnowqr.png`,
		},
	],
	THB: [
		{
			name: 'help2pay',
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/help2pay.png`,
		},
		{
			name: 'thaiqr',
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/thaiqr.png`,
		},
	],
	IDR: [
		{
			name: 'help2pay',
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/help2pay.png`,
		},
		{
			name: 'ovo',
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/ovo.png`,
		},
		{
			name: 'gopay',
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/gopay.png`,
		},
		{
			name: 'dana',
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/dana.png`,
		},
		{
			name: 'sakuku',
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/sakuku.png`,
		},
		{
			name: 'linkaja',
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/linkaja.png`,
		},
		{
			name: 'shopeepay',
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/shopeepay.png`,
		},
		{
			name: 'doku',
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/doku.png`,
		},
	],
	INR: [
		{
			name: 'tenpay',
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/tenpay.png`,
		},
	],
	BDT: [
		{
			name: 'DirePay',
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/direpay.png`,
		},
		{
			name: 'FxBit',
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/fxbit.png`,
		},
	],
	CNY: [
		{
			name: 'DirePay',
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/direpay.png`,
		},
		{
			name: 'FxBit',
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/fxbit.png`,
		},
	],
	USD: [
		{
			name: 'DirePay',
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/direpay.png`,
		},
		{
			name: 'FxBit',
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/fxbit.png`,
		},
	],
}
