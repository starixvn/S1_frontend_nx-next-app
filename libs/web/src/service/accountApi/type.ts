export enum TpWalletListTypeEnum {
	All,
	Transferred,
}

export interface ISetLangArgs {
	langId: string
}

export interface IMainWalletInfoData {
	balance: number
	lastLoginTime: string
	lastTransaction: string
	isHideBalance: boolean
}

export interface ITpWalletData {
	tpId: number
	tpName: string
	displayKey: string
	description: string
	walletMode: number
}

export interface ITpWalletInfoData {
	tpId: number
	balance: number
	bonus: number
	walletStatus: number
	// tpName 為 前端自行 mapping 進來的值
	tpName?: string
}

export interface IPopUpMsgData {
	id: number
	popupMessage: string
	pageNumber: number
}

export enum CustBonusWalletStatusEnum {
	Initial = 0,
	Running,
	Canceled,
	Expiry,
	Fulfill,
}

export enum CustBonusWalletFullFillTypeEnum {
	RollOver = 1,
	WinOver,
}

export interface ICustBonusWalletData {
	bonusId: number
	bonus: number
	rollover: number
	turnover: number
	promoCategoryId: number
	tpId: number
	dateTime: string
	expiryTime: string
	status: CustBonusWalletStatusEnum
	fullFillType: CustBonusWalletFullFillTypeEnum
}

// custSpecificBonus
// 取得 bonus 達成進度
export interface IGetCustSpecificBonusArgs {
	bonusCode: string
	tpId: number
	promoCategoryId?: string
}

export interface ICustSpecificBonusData {
	bonusId: number
	bonus: number
	rollover: number // custRollOver
	turnover: number // custTurnOver
	fullFillType: number
	promoCategoryId: number // categoryId
	tpId: number
	status: number
	expiryTime: string // custExpiryTime
}

export interface IReferralSettingData {
	bonusAmount: number
	deposit: number
	periodDays: number
	status: boolean
	vaildBet: number
}

export interface ISetChangePasswordArgs {
	oldPassword: string
	newPassword: string
}
