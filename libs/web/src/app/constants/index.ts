export * from './Names'
export * from './paths'
export * from './areaCode'
export * from './currency'
export * from './regex'
export * from './timeFormat'
export * from './profile'
export * from './transferFunds'
export * from './products'
export * from './eWallet'
export * from './excludedProducts'
export * from './deposit'
export * from './eventPeriod'
export * from './userInfo'

export const CURRENCY_TO_LANG_KEY: {
	[key: string | number]: string
} = {
	2: 'ch',
	3: 'gb',
	4: 'th',
	13: 'cs',
	15: 'id',
	45: 'ko',
	51: 'vn',
	61: 'in',
	72: 'kh',
	74: 'bd',
	82: 'br',
}

export const LIVESTREAM_CURRENCY_TO_LANG_KEY: {
	[key: string | number]: string
} = {
	2: 'my',
	3: 'global',
	4: 'th',
	13: 'cs',
	15: 'id',
	45: 'ko',
	51: 'vn',
	61: 'hi',
	72: 'kh',
	74: 'bd',
	82: 'br',
}

export const LANG_GROUP_COUNTRY: {
	[key: string]: string
} = {
	ch: 'Malaysia',
	th: 'Thailand',
	id: 'Indonesia',
	in: 'India',
	cs: 'China',
	gb: 'Global',
	bd: 'Bangladesh',
	kh: 'Cambodia',
	vn: 'Vietnam',
	br: 'Brazil',
	ko: 'Korea',
}

export const DEVICE_TYPE = {
	Desktop: 1,
	Mobile: 2,
	NativeAPP: 3,
}

export const CURRENCY_TO_TIMEZONE: { [key: number]: string } = {
	2: '+08:00',
	4: '+07:00',
	15: '+07:00',
	3: '+00:00',
	72: '+07:00',
	74: '+06:00',
	61: '+05:30',
	13: '+08:00',
	51: '+07:00',
	82: '-03:00',
	45: '+09:00',
	32: '+09:00',
}
