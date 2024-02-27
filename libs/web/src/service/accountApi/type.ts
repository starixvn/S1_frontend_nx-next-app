import { IAxiosResponse } from 'libs/web/src/service/axiosBaseQuery'

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

export interface IGetMsgListArgs {
	pageNumber: number
	pageSize?: number
}

export interface IMsgData {
	id: number
	type: number
	senderCustId: number
	sender: string
	title: string
	createTime: string
	flag: boolean
	isBatch: boolean
}

export type IGetMsgListResponse = IAxiosResponse<IMsgData[]>

export interface IBasicMsg {
	msgId: number
	isBatch: boolean
}

export interface IDelMsgArgs {
	deleteList: IBasicMsg[]
}

export interface ISetMsgReadArgs {
	setList: IBasicMsg[]
}

export interface IGetMsgContentArgs {
	msgId: number
	isBatch: number
}

export interface IMsgContentData {
	content: string
}

export type IMsgContentResponse = IAxiosResponse<IMsgContentData>

export interface IReferralSettingData {
	bonusAmount: number
	deposit: number
	periodDays: number
	status: boolean
	vaildBet: number
}

export interface IWithdrawalAvailableBalanceData {
	availableBalance: number
	balance: number
	deduction: number
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

export type IBankInfoData = {
	accountNo: string
	bankLogo: string
	bankName: string
	bankSite: string
	disabled: boolean
	ifscCode: string
	sysId: number
}

export type IUsdtDetailData = {
	currencyId: number
	currencyName: string
	disabled: boolean
	network: string
	nickName: string
	usdtAddress: string
}

export interface ICustBankInfoData {
	accountName: string
	defAccountNo: number
	bankInfoDetail: IBankInfoData[]
	uSDTDetail: IUsdtDetailData[]
}

export type IEWalletData = {
	accountNo: string
	eWalletLogo: string
	eWalletName: string
	eWalletSite: string
	sysId: number
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

export interface IUSDTDetail {
	nickName: string
	usdtAddress: string
	network: string
	currencyId: number
	currencyName: string
	disabled: boolean
}

export interface ICustEWalletInfoData {
	eWalletName: string
	eWalletLogo: string
	eWalletSite: string | null
	sysId: number
	accountNo: string
}

export interface IWalletInfoData {
	balance: number
	isHideBalance: boolean
	lastLoginTime: string
	lastTransaction: string
	tpWallets: ITpWalletInfoData[]
}

export interface ITpGameTypeData {
	categoryId: number
	tpId: number
	gameType: number
	noShow: boolean
	noPlay: boolean
}
