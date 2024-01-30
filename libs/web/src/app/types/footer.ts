import { IProduct } from '@nx-next-app/constants'

export interface IFooterData {
	copyRightList?: ICopyRightData[]
	quickLinks?: IQuickLinksData[]
	platformList?: IPlatformListData[]
	programList?: IProgramData[]
	promotionTextList?: IPromotionTextData[]
	programDescriptionList?: IProgramDescriptionData[]
	licenseData: ILicenseData
	suggestedBrowser: ISuggestedBrowserData[]
	paymentMethodsByCurrencyId: {
		[key: number]: IPaymentMethod[]
	}
}

interface IQuickLinksData {
	displayKey: string
	href: string
}

type ICopyRightData = IQuickLinksData

export interface IPlatformListData extends IProduct {
	imgName: string
	hoverImgName?: string
}

interface IProgramData {
	applyNowLink: string
	icon: string
	displayKey: string
	description: string
	hotKeyName: string
}

interface IProgramDescriptionData {
	contents: {
		displayKey: string
		description: string
	}[]
}

interface ILicenseData {
	defaultScript: string
	defaultXCMScript: string
}

interface ISuggestedBrowserData {
	imageSrc: string
	alt: string
	width: number
	height: number
}

interface IPaymentMethod {
	name: string
	img: string
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

export interface IPromotionTextData {
	title: string
	content: string
}
