/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createContext, ReactNode } from 'react'
import {
	IImageData,
	IMetaData,
	IStaticAllowedCurrencies,
	IStaticLangGroups,
	IStaticProducts,
	IStaticSlotTpGameType,
	IStaticVipEventCurrenciesLimitationInfo,
	ITermsConditions,
} from '@nx-next-app/types'

export interface IStaticDataContext {
	META_DATA: IMetaData
	PRODUCTS: IStaticProducts
	ALLOWED_CURRENCIES: IStaticAllowedCurrencies
	SLOT_TP_GAME_TYPE: IStaticSlotTpGameType
	LANG_GROUPS: IStaticLangGroups
	VIP_CLUB_IMAGES: IImageData[]
	VIP_EVENT_CURRENCIES_LIMITATION_INFO: IStaticVipEventCurrenciesLimitationInfo
	VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY: (
		langId: string | number
	) => IImageData[]
	FEATURE_BONUS: { [key: number]: string }
	TERMS_CONDITIONS: ({ langId }: { langId: string }) => ITermsConditions
	USERNAME_REGEX: RegExp
	PASSWORD_REGEX: RegExp
	REALNAME_REGEX: RegExp
}

const StaticDataContext = createContext<IStaticDataContext>(null!)

interface IStaticDataProviderProps extends IStaticDataContext {
	children: ReactNode
}

const StaticDataProvider = ({
	children,
	META_DATA,
	PRODUCTS,
	ALLOWED_CURRENCIES,
	SLOT_TP_GAME_TYPE,
	LANG_GROUPS,
	VIP_CLUB_IMAGES,
	VIP_EVENT_CURRENCIES_LIMITATION_INFO,
	VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY,
	FEATURE_BONUS,
	TERMS_CONDITIONS,
	USERNAME_REGEX,
	PASSWORD_REGEX,
	REALNAME_REGEX,
}: IStaticDataProviderProps) => {
	const value: IStaticDataContext = {
		META_DATA,
		PRODUCTS,
		ALLOWED_CURRENCIES,
		SLOT_TP_GAME_TYPE,
		LANG_GROUPS,
		VIP_CLUB_IMAGES,
		VIP_EVENT_CURRENCIES_LIMITATION_INFO,
		VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY,
		FEATURE_BONUS,
		TERMS_CONDITIONS,
		USERNAME_REGEX,
		PASSWORD_REGEX,
		REALNAME_REGEX,
	}

	return (
		<StaticDataContext.Provider value={value}>
			{children}
		</StaticDataContext.Provider>
	)
}

export { StaticDataContext, StaticDataProvider }
