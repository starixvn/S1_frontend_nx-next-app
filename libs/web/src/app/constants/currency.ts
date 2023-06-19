import { CurrenciesEnum } from '@nx-next-app/types'

export const AREA_CODE_BY_CURRENCY: { [key: number]: string } = {
	[CurrenciesEnum.MYR]: '+60',
	[CurrenciesEnum.THB]: '+66',
	[CurrenciesEnum.IDR]: '+62',
	[CurrenciesEnum.INR]: '+91',
	[CurrenciesEnum.BDT]: '+880',
	[CurrenciesEnum.CNY]: '+86',
	[CurrenciesEnum.USD]: '',
	[CurrenciesEnum.KHM]: '+855',
	[CurrenciesEnum.VND]: '+84',
}

export const PHONE_DIGITS_LIMIT: { [key: string]: string } = {
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.MYR]]: '9-10',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.THB]]: '9',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.IDR]]: '10-13',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.INR]]: '10',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.BDT]]: '10-11',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.CNY]]: '10',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.KHM]]: '8-9',
}

export const FLAG_PREFIX_ICON_BY_CURRENCIES: { [key: number]: string } = {
	[CurrenciesEnum.MYR]: 'ch',
	[CurrenciesEnum.USD]: 'gb',
	[CurrenciesEnum.THB]: 'th',
	[CurrenciesEnum.CNY]: 'cs',
	[CurrenciesEnum.IDR]: 'id',
	[CurrenciesEnum.INR]: 'in',
	[CurrenciesEnum.KHM]: 'kh',
	[CurrenciesEnum.BDT]: 'bd',
	[CurrenciesEnum.VND]: 'vn',
}

export const RECAPTCHAT_LANG_BY_LANG_ID: { [key: string]: string } = {
	en: 'en',
	cs: 'zh-CN',
	hi: 'hi',
	id: 'id',
	my: 'ms',
	th: 'th',
	bd: 'bn',
	kh: 'en',
	vn: 'vi',
}
