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
