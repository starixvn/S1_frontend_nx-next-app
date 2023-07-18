export * from './Names'
export * from './paths'
export * from './areaCode'
export * from './currency'
export * from './regex'
export * from './timeFormat'

export const CURRENCY_TO_LANG_KEY: {
	[key: string | number]: string
} = {
	2: 'ch',
	3: 'gb',
	4: 'th',
	13: 'cs',
	15: 'id',
	61: 'in',
	72: 'kh',
	74: 'bd',
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
}
