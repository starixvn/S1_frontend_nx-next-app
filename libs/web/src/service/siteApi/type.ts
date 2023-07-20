export interface TpMaintainData {
  siteId: number
  tpId: number
  tpGameType: number
  tpCategoryId: number
  beginDate: null | string
  endDate: null | string
  maintainType: number
  typeValue: number
  beginTime: null | string
  endTime: null | string
}

export interface ISocialChannelData {
	id: number
	channelName: string
	title: string
	link: string
	linkType: number
	scheme: {
		ios: string
		android: string
	}
}

export interface ISeoData {
	siteId: number
	title: string
	meta: string
	defaultLang: string
	activeDomain: boolean
	keyword: string
	followUs: null
	paymentMethod: null
	script: string
	xcmScript: string
}

export interface ISetForgetPasswordArgs {
	langId: string
	email: string
	flag: FlagEnum
}

// url 有帶 langId , flag 給 1 其餘給 2
// 目前 nova 帶 1 其餘帶 2
export enum FlagEnum {
	hasLang = 1,
	unSetLang = 2,
}

export interface ISignUpArgs {
	affCode?: string
	affId?: string
	areaCode: string
	currencyId: number
	email: string
	phoneNo: string
	realName: string
	reCaptchaToken: string
	referralUrl?: string
	userLang: string
	userName: string
	userpwd: string
	blackbox?: string
	langId: string
	lineUserId?: string
}

export interface IGetBannerArgs {
	langId: string
	bannerTypes: number[]
	currencyId: number
}
export interface IBannerData {
	actionMode: number
	backgroundPic: string
	bannerLink: string
	bannerMobileUrl: string
	bannerName: string
	bannerPCUrl: string
	bannerType: number
	bonusCode: string
	details: string
	gameId: string
	logo: string
	tpGameType: number
	tpId: string
	urlRouter: string
}
