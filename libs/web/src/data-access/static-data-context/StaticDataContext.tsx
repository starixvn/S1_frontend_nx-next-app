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
	IStaticSlotTpGameType,
	IStaticVipEventCurrenciesLimitationInfo,
	ITermsConditions,
} from '@nx-next-app/types'

export interface IStaticDataContext {
	MENU_DATA: ({
		currencyId,
		langId,
	}: {
		currencyId: number
		langId: string
	}) => any
	META_DATA: IMetaData
	PRODUCTS: {
		[key: string]: IStaticProduct
	}
	ALLOWED_CURRENCIES: IStaticAllowedCurrencies
	SLOT_TP_GAME_TYPE: IStaticSlotTpGameType
	LANG_GROUPS: IStaticLangGroups
	CURRENCY_LIST: { [key: string]: number }
	CURRENCY_TO_TIMEZONE: { [key: number]: string }
	VIP_CLUB_IMAGES: (deviceType: number) => IImageData[]
	VIP_EVENT_CURRENCIES_LIMITATION_INFO: IStaticVipEventCurrenciesLimitationInfo
	VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY: (
		langId: string | number,
		deviceType: number
	) => IBannerByCurrencyData[]
	FEATURE_BONUS: { [key: number]: string }
	TERMS_CONDITIONS: ({ langId }: { langId: string }) => ITermsConditions
	USERNAME_REGEX: RegExp
	PASSWORD_REGEX: RegExp
	REALNAME_REGEX: RegExp
	BANNER_IMAGE_LIST: { [lang: string]: string }
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
	SLOT_TP_GAME_TYPE,
	LANG_GROUPS,
	CURRENCY_LIST,
	CURRENCY_TO_TIMEZONE,
	VIP_CLUB_IMAGES,
	VIP_EVENT_CURRENCIES_LIMITATION_INFO,
	VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY,
	FEATURE_BONUS,
	TERMS_CONDITIONS,
	USERNAME_REGEX,
	PASSWORD_REGEX,
	REALNAME_REGEX,
	BANNER_IMAGE_LIST,
}: IStaticDataProviderProps) => {
	const value: IStaticDataContext = {
		MENU_DATA,
		META_DATA,
		PRODUCTS,
		ALLOWED_CURRENCIES,
		SLOT_TP_GAME_TYPE,
		LANG_GROUPS,
		CURRENCY_LIST,
		CURRENCY_TO_TIMEZONE,
		VIP_CLUB_IMAGES,
		VIP_EVENT_CURRENCIES_LIMITATION_INFO,
		VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY,
		FEATURE_BONUS,
		TERMS_CONDITIONS,
		USERNAME_REGEX,
		PASSWORD_REGEX,
		REALNAME_REGEX,
		BANNER_IMAGE_LIST,
	}

	return (
		<StaticDataContext.Provider value={value}>
			{children}
		</StaticDataContext.Provider>
	)
}

export { StaticDataContext, StaticDataProvider }
