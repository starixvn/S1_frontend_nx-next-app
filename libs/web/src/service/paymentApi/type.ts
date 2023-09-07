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

export interface IGetWithdrawalInfoHistoryArgs
	extends IGetDepositInfoHistoryArgs {}

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

export interface IGetStatementArgs extends IGetDepositInfoHistoryArgs {}

export interface IUploadReceiptArgs {
	receipt: string
	transId: string
}
