import { CurrenciesEnum, IStaticLangGroups } from '@nx-next-app/types'

export * from './affiliate'
export * from './allowCurrency'
export * from './appDownload'
export * from './footer'
export * from './gameProviders'
export * from './gtmData'
export * from './history'
export * from './leaderBoard'
export * from './leftMenu'
export * from './menu'
export * from './metaData'
export * from './monthlyData'
export * from './payment'
export * from './quickPick'
export * from './referral'
export * from './slots'
export * from './sponsorData'
export * from './termsConditions'
export * as ThirdPartyJS from './thirdPartyJS'
export * from './vip'

export const LANG_GROUPS: IStaticLangGroups = {
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
}

// liveChat 專屬
export const LIVE_CHAT_ID_BY_LANG_ID: {
	[langId: string]: number
} = {
	en: 1,
	id: 2,
}
