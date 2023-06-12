/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createContext, ReactNode } from 'react'
import {
	IImageData,
	IStaticAllowedCurrencies,
	IStaticLangGroups,
	IStaticProducts,
	IStaticSlotTpGameType,
	IStaticVipEventCurrenciesLimitationInfo,
} from '@nx-next-app/types'

export interface IStaticDataContext {
	PRODUCTS: IStaticProducts
	ALLOWED_CURRENCIES: IStaticAllowedCurrencies
	SLOT_TP_GAME_TYPE: IStaticSlotTpGameType
	LANG_GROUPS: IStaticLangGroups
	VIP_CLUB_IMAGES: IImageData[]
	VIP_EVENT_CURRENCIES_LIMITATION_INFO: IStaticVipEventCurrenciesLimitationInfo
	VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY: (
		langId: string | number
	) => IImageData[]
}

const StaticDataContext = createContext<IStaticDataContext>(null!)

interface IStaticDataProviderProps extends IStaticDataContext {
	children: ReactNode
}

const StaticDataProvider = ({
	children,
	PRODUCTS,
	ALLOWED_CURRENCIES,
	SLOT_TP_GAME_TYPE,
	LANG_GROUPS,
	VIP_CLUB_IMAGES,
	VIP_EVENT_CURRENCIES_LIMITATION_INFO,
	VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY,
}: IStaticDataProviderProps) => {
	const value: IStaticDataContext = {
		PRODUCTS,
		ALLOWED_CURRENCIES,
		SLOT_TP_GAME_TYPE,
		LANG_GROUPS,
		VIP_CLUB_IMAGES,
		VIP_EVENT_CURRENCIES_LIMITATION_INFO,
		VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY,
	}

	return (
		<StaticDataContext.Provider value={value}>
			{children}
		</StaticDataContext.Provider>
	)
}

export { StaticDataContext, StaticDataProvider }
