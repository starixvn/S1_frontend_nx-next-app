/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type IProducts } from '@nx-next-app/constants'
import {
	IBannerByCurrencyData,
	IImageData,
	ILeftMenuData,
	IMenuData,
	IMetaData,
	IStaticAllowedCurrencies,
	IStaticLangGroups,
	ITermsConditions,
} from '@nx-next-app/types'
import { ReactNode, createContext } from 'react'

export interface IStaticDataContext {
	MENU_DATA: IMenuData[]
	META_DATA: IMetaData
	PRODUCTS: IProducts
	LEFT_MENU_DATA: ILeftMenuData
	LANG_TO_CURRENCY?: { [key: string]: number }
	ALLOWED_CURRENCIES: IStaticAllowedCurrencies
	LANG_GROUPS: IStaticLangGroups
	CURRENCY_TO_TIMEZONE: { [key: number]: string }
	VIP_CLUB_IMAGES: IImageData[]
	VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY: (
		langId: string | number,
		currencyId?: string | number
	) => IBannerByCurrencyData[]
	FEATURE_BONUS?: { [key: number]: string }
	TERMS_CONDITIONS: ({ langId }: { langId: string }) => ITermsConditions
	BANNER_IMAGE_LIST?: { [lang: string]: string }
	LIVE_CHAT_ID_BY_LANG_ID: {
		[langId: string]: number
	}
	GET_AFFILIATE_LINK?: ({
		currencyId,
		langId,
	}: {
		currencyId: number
		langId: string
	}) => string
}

const StaticDataContext = createContext<IStaticDataContext>(null!)

interface IStaticDataProviderProps extends IStaticDataContext {
	children: ReactNode
}

const StaticDataProvider = ({
	children,
	MENU_DATA,
	META_DATA,
	PRODUCTS,
	ALLOWED_CURRENCIES,
	LANG_GROUPS,
	CURRENCY_TO_TIMEZONE,
	VIP_CLUB_IMAGES,
	VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY,
	FEATURE_BONUS,
	TERMS_CONDITIONS,
	BANNER_IMAGE_LIST,
	LEFT_MENU_DATA,
	LANG_TO_CURRENCY,
	LIVE_CHAT_ID_BY_LANG_ID,
	GET_AFFILIATE_LINK,
}: IStaticDataProviderProps) => {
	const value: IStaticDataContext = {
		MENU_DATA,
		META_DATA,
		PRODUCTS,
		ALLOWED_CURRENCIES,
		LANG_GROUPS,
		CURRENCY_TO_TIMEZONE,
		VIP_CLUB_IMAGES,
		VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY,
		FEATURE_BONUS,
		TERMS_CONDITIONS,
		BANNER_IMAGE_LIST,
		LEFT_MENU_DATA,
		LANG_TO_CURRENCY,
		LIVE_CHAT_ID_BY_LANG_ID,
		GET_AFFILIATE_LINK,
	}

	return (
		<StaticDataContext.Provider value={value}>
			{children}
		</StaticDataContext.Provider>
	)
}

export { StaticDataContext, StaticDataProvider }
