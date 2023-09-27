export type WithdrawalMessageData = {
	createTime: string
	errorTypeName: string
	message: string
}

export interface IWithdrawalRecentInfoData {
	amount: number
	canCancel: boolean
	chargeFee: number
	createTime: string
	memo: string
	status: number
	transId: string
	withdrawalMessage: string
	withdrawalMessageDetail: WithdrawalMessageData[]
}

export type IUsdtData = {
	currencyId: number
	currencyName: string
	maxTimes: number
	network: string
	unlimited: boolean
	withdrawalAvailableAmount: number
	withdrawalMin: number
	withdrawalTimes: number
}

export interface IWithdrawalLimitData {
	eWalletStatus: number
	eWalletUnlimited: boolean
	eWalletWithdrawalAvailableAmount: number
	eWalletWithdrawalMin: number
	maxTimes: number
	totalWithdrawalMax: number
	unlimited: boolean
	withdrawalAvailableAmount: number
	withdrawalMin: number
	withdrawalTimes: number
	usdtList: IUsdtData[]
}

export interface IBankInfoSysData {
	bankCode: string
	bankLogo: string
	bankName: string
	bankSite: string
	currencyId: number
	status: number
	sysId: number
}

export interface IEWalletInfoData {
	currencyId: number
	eWalletCode: string
	eWalletLogo: string
	eWalletName: string
	eWalletSite: string
	sort: number
	status: number
	sysId: number
}

export interface IGetExchangeInfoArgs {
	amount: number
	currencyName: string
	network: string
}

export interface IExchangeInfoData {
	rate: number
	to_Amount: number
	updated_timestamp: number
}

export interface IDepositInfoHistoryData {
	createTime: string
	depositType: number
	transId: string
	amount: number
	status: number
	depositRep: {
		ver: number
		sysId: number
		accountName: string
		accountNo: string
		ifscCode: string
		currencyId: number
		isLocalPay: boolean
		groupId: number
		code: null
	}
	bankInfo: {
		sysId: number
		currencyId: number
		bankCode: string
		bankName: string
		bankLogo: string
		bankSite: string
		status: number
	}
	thirdId: string | number
	refId: null
	depositTime: null
	depositReceipt: {
		depositId: number
		picFileName: string
		receiptNo: number
		depositPic: null
	}[]
	depositMessage: string
	depositMessageDetail: {
		errorTypeName: string
		message: string
		createTime: string
	}[]
}

export interface IGetDepositInfoHistoryArgs {
	startDate: number
	endDate: number
	pageNumber: number
}

export interface IWithdrawalInfoHistoryData {
	createTime: string
	transId: string
	amount: number
	chargeFee: number
	status: number
	memo: string
	canCancel: boolean
	withdrawalMessage: string
	withdrawalMessageDetail: {
		errorTypeName: string
		message: string
		createTime: string
	}[]
}

export type IGetWithdrawalInfoHistoryArgs = IGetDepositInfoHistoryArgs

export interface IStatementData {
	type: string
	changeAmount: number
	beforeAmount: number
	afterAmount: number
	refTransId: string
	createTime: string
	createTimeOffset: string
	direction: number
	typeName: string
	custTimeZone: string
}

export type IGetStatementArgs = IGetDepositInfoHistoryArgs

export interface IUploadReceiptArgs {
	receipt: string
	transId: string
}

export interface ISubmitWithdrawalArgs {
	accountNo: string
	amount: number
	sysId: number
	memo?: string
	blackbox?: string
	ifscCode?: string
}

export interface ISubmitCryptoWithdrawalArgs {
	accountNo: string
	amount: number
	blackbox: string
	currencyId: number
	exchangeRate: number
	exchangeAmount: number
}

export interface ICryptoCurrency {
	currencyId: number
	currencyName: string
}

export interface ICryptoNetwork {
	currencyId: number
	network: string
}

export interface ISupportCryptoInfo {
	cryptoCurrency: ICryptoCurrency[]
	cryptoNetwork: ICryptoNetwork[]
}

export interface IEWalletInfoSysData {
	currencyId: number
	eWalletCode: string
	eWalletLogo: string
	eWalletName: string
	eWalletSite: string | null
	sort: number
	status: number
	sysId: number
}

export interface ICustTpBetRecordListDateRangeData {
	settledDate: string
	turnOver: number
	validBet: number
	winlostAmount: number
}

export interface ICustTpBetRecordListDateRangeArgs {
	startDate: string
	endDate: string
	pageNumber: number
	pageSize: number
}

export interface ICustTpBetRecordListOneDayData {
	settledDate: string
	categoryName: string
	categoryId: number
	turnOver: number
	validBet: number
	winlostAmount: number
}

export interface ICustTpBetRecordListOneDayArgs {
	selDate: string
	pageNumber: number
	pageSize: number
}

export interface ICustTpBetRecordListbyCategoryIdData {
	settledDate: string
	gameTypeName: string
	gameTypeID: number
	turnOver: number
	validBet: number
	winlostAmount: number
}

export interface ICustTpBetRecordListbyCategoryIdArgs {
	selDate: string
	categoryId: number
	pageNumber: number
	pageSize: number
}

export interface ICustTpBetRecordDetailListbyGameTypeData {
	transId: string
	bonusId: number
	bonusCode: null | string
	turnOver: number
	validBet: number
	winlostAmount: number
	transTime: string
	settledTime: string
}

export interface ICustTpBetRecordDetailListbyGameTypeArgs {
	selDate: string
	gameTypeId: number
	pageNumber: number
	pageSize: number
}
