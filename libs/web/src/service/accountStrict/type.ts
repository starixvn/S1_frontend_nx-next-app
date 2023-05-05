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
	userName: string
	email: string
	accountName: string
	birth_d: string
	birth_m: string
	birth_y: string
	regTime: string
	lastLogin: string
	country: string
	areaCode: string
	phoneNo: string
	perCountry: string
	currencyId: number
	langId: string
	userLevel: number
	phoneVerified: false
	phoneReward: number
	emailVerified: false
	emailReward: number
	enablePromotion: number
	isLineBinding: boolean
	addressCountry: null
	addressState: null | string
	addressPostCode: null | string
	addressCity: null | string
	addressLineFirst: null | string
	addressLineSecond: null | string
	isResetPwd: boolean
	actStatus: UserInfoActStatusEnum
	memberType: UserInfoMemberType
}
