export interface IBankInfoSysData {
	sysId: number
	currencyId: number
	bankCode: string
	bankName: string
	bankLogo: string
	bankSite: string
	status: number
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
