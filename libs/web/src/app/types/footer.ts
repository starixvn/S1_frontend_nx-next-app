import { IStaticAllowedCurrencies } from '@nx-next-app/types'

export interface IResponseConvertedFooterData {
	copyRightList: ICopyRightListData[]
	platformList: IPlatformListData[]
	servicePlanData: IServicePlanData
	promotionTextList: IPromotionTextListData[]
	licenseData: ILicenseData
	sfpData: ISfpData
}

export interface ICopyRightListData {
	displayName: string
	href: string
}
export interface IPlatformListData {
	key: string
	imgName: string
	hoverImgName: string
}
export interface IServicePlanListData {
	key: string
	icon: string
	displayName: string
	description: string
	hotKeyName: string
	applyNowLink: string
}

export interface IServicePlanData {
	allowedCurrencies: IStaticAllowedCurrencies
	servicePlanList: IServicePlanListData[]
}

export interface IPromotionTextListData {
	key: number
	content: {
		title: string
		description: string
	}[]
}
export interface ILicenseData {
	defaultScript: string
	defaultXCMScript: string
}

export interface ISfpData {
	currencyPaymentList: {
		[currency: string]: { name: string; img: string }[]
	}
	langToCurrency: {
		[key: string]: number
	}
}

export interface IRequestConvertedFooterData {
	currentLang: string
	currencyId: number
	isLogin: boolean | undefined
	tpIds: number[]
}

export interface ISeoData {
	siteId?: number
	meta?: string
	defaultLang?: string
	activeDomain?: boolean
	followUs?: null
	paymentMethod?: null
	script?: string
	xcmScript?: string
	title?: string
	keyword?: string
	description?: string
	links?: {
		rel?: string
		href?: string
		hrefLang?: string
	}[]
}
