/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createContext, ReactNode } from 'react'
import {
	IBannerByCurrencyData,
	IImageData,
	IMetaData,
	IStaticAllowedCurrencies,
	IStaticLangGroups,
	IStaticProduct,
	ITermsConditions,
	ILeftMenuData,
	IMenuData,
} from '@nx-next-app/types'

export interface IStaticDataContext {
	MENU_DATA: ({
		currencyId,
		langId,
	}: {
		currencyId: number
		langId: string
	}) => IMenuData
	META_DATA: IMetaData
	PRODUCTS: {
		[key: string]: IStaticProduct
	}
	LEFT_MENU_DATA: ILeftMenuData
	ALLOWED_CURRENCIES: IStaticAllowedCurrencies
	LANG_GROUPS: IStaticLangGroups
	CURRENCY_TO_TIMEZONE: { [key: number]: string }
	VIP_CLUB_IMAGES: IImageData[]
	VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY: (
		langId: string | number
	) => IBannerByCurrencyData[]
	FEATURE_BONUS: { [key: number]: string }
	TERMS_CONDITIONS: ({ langId }: { langId: string }) => ITermsConditions
	BANNER_IMAGE_LIST: { [lang: string]: string }
	LIVE_CHAT_ID_BY_LANG_ID: {
		[langId: string]: number
	}
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
	LIVE_CHAT_ID_BY_LANG_ID,
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
		LIVE_CHAT_ID_BY_LANG_ID,
	}

	return (
		<StaticDataContext.Provider value={value}>
			{children}
		</StaticDataContext.Provider>
	)
}

export { StaticDataContext, StaticDataProvider }
