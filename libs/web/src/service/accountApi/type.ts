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

export interface IReferralSummaryData {
	amountCount: number
	amountSum: number
	conditionCount: number
	hasReferral: boolean
	referralCount: number
}

export interface IReferralSettingDetailData {
	referralReward: number
	invitationLimit: number
	agentValidBet: number
	agentDeposit: number
	memberReward: number
	vaildBet: number
	deposit: number
	periodDays: number
	depositRewardPercentage: number
	minPayout: number
	maxPayout: number
	referralContent: {
		langId: string
		bannerUrl: null | string
		title: null | string
		description: null | string
		detail: null | string
		type: number
	}
}

export interface IReferralData {
	custId: number
	userName: string
	registerDate: string
	currencyId: number
	totalDeposit: number
	depositC: number
	totalBet: number
	vaildBetC: number
	bonusAmount: number
	status: number
}

export interface IGetReferralArgs {
	startDate: number
	endDate: number
	pageNumber: number
	pageSize: number
}

export interface IBankInfoDetail {
	bankName: string
	bankLogo: string
	bankSite: string
	disabled: boolean
	sysId: number
	accountNo: string
	ifscCode: string | null
}

interface IUSDTDetail {
	nickName: string
	usdtAddress: string
	network: string
	currencyId: number
	currencyName: string
	disabled: boolean
}

export interface IGetCustBankInfoData {
	accountName: string
	defAccountNo: string
	bankInfoDetail: IBankInfoDetail[]
	uSDTDetail: IUSDTDetail[]
}
