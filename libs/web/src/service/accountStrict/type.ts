// * 判斷會員是不是有存款過
export enum UserInfoActStatusEnum {
	NonDeposit = 1,
	HasDeposit,
}

// *  會員類型
export enum UserInfoMemberType {
	Normal = 1,
	Affiliate,
	LiveStreaming,
}

export interface IUserInfoData {
	currencyName?: string // * 由前端透過 i18n 塞進的值
	userName: string
	currencyId: number
	langId: string
	email?: string
	accountName?: string
	birth_d?: string
	birth_m?: string
	birth_y?: string
	regTime?: string
	lastLogin?: string
	country?: string
	areaCode?: string
	phoneNo?: string
	perCountry?: string
	userLevel?: number
	phoneVerified?: false
	phoneReward?: number
	emailVerified?: false
	emailReward?: number
	enablePromotion?: number
	isLineBinding?: boolean
	addressCountry?: null | string
	addressState?: null | string
	addressPostCode?: null | string
	addressCity?: null | string
	addressLineFirst?: null | string
	addressLineSecond?: null | string
	isResetPwd?: boolean
	actStatus?: UserInfoActStatusEnum
	memberType?: UserInfoMemberType
}

export interface IOTPSMSData {
	startUnixTime: number
	status: number
}

export interface ISetProfileArgs {
	AccountName: string
	AreaCode: string
	Birth_d: string
	Birth_m: string
	Birth_y: string
	PhoneNo: string
}

export interface ISetProfileAddressArgs {
	AddressCountry: string
	AddressState: string
	AddressPostCode: string
	AddressCity: string
	AddressLineFirst: string
	AddressLineSecond?: string
}

export interface ISetCustBankInfoArgs {
	accountName?: string
	accountNo: string
	sysId: number
	ifscCode?: string | null
}
