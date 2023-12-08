import { DepositActionModeEnum } from '../../app/types/deposit'

export interface IBankInfoSysData {
	sysId: number
	currencyId: number
	bankCode: string
	bankName: string
	bankLogo: string
	bankSite: string
	status: number
	transId: string
	withdrawalMessage: string
	withdrawalMessageDetail: WithdrawalMessageData[]
}

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
		code: null | string
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
	thirdId: null | string
	refId: null | string
	depositTime: null
	depositReceipt: {
		depositId: number
		picFileName: string
		receiptNo: number
		depositPic: string
	}[]
	depositMessage: null | string
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

export interface IPaymentAutoDepositData {
	bankId: number
	sysId: number
	bankCode: string
	bankName: string
	ifscCode: null | string
	bankLogo: string
	bankSite: null | string
	minAmount: number
	maxAmount: number
	status: number
	qrCodeUrl: null | string
}
export interface IPaymentBankTransferData {
	bankCode: string
	bankId: number
	bankLogo: string
	bankName: string
	bankSite: string
	canSubmit: boolean
	groupIds: null | number[]
	ifscCode: string
	maxAmount: number
	minAmount: number
	qrCodeUrl: string
	status: number
	supportChannel: number[]
	sysId: number
}

export interface IPaymentOnlineBankingData {
	channelId: number
	maxAmount: number
	minAmount: number
	mode: number
	payId: number
	payName: string
	selBank: boolean
}

export interface IPaymentMobilePayData {
	channelName: string
	gSort: number
	groupId: number
	groupName: string
	maxAmount: number
	minAmount: number
	mode: number
}

export interface IPaymentCryptoPayData {
	amountList: null | number[]
	amountRule: number
	channelId: number
	channelName: string
	currencyId: number
	currencyName: string
	gSort: number
	groupId: number
	groupName: string
	maxAmount: number
	minAmount: number
	mode: number
	payCode: null | string
	payCurrencyId: null | number
	payId: number
	payName: string
	pointLevel: number
	sSort: number
}

export interface IChannelMobilePayData {
	amountList: null | number[]
	amountRule: number
	channelId: number
	channelName: string
	currencyId: number
	gSort: number
	groupId: number
	groupName: string
	maxAmount: number
	minAmount: number
	mode: DepositActionModeEnum
	payCode: null | string
	payCurrencyId: null | string
	payId: number
	payName: null | string
	pointLevel: number
	sSort: number
}

export interface IBankAccountInfoData {
	accountName: string
	accountNo: string
	bankLogo: string
	bankName: string
	bankSite: string
	ifscCode: string
	maxAmount: number
	minAmount: number
	postScript: string
	transId: string
}

export interface IPostDepositBankTransferReqArgs {
	amount: number
	sysId?: number
	fromChannel?: number
	fromSysId?: number
	fromAccountNum?: string
	hasPromotion: boolean
	bankId?: number
}
export interface IDepositBankTransferReqData {
	bankName: string
	bankLogo: string
	bankSite: string
	accountNo: string
	accountName: string
	ifscCode: string
	transId: string
	postScript: string
	minAmount: number
	maxAmount: number
}

export interface IPaymentLinePayInfo {
	currencyId: number
	id: number
	isoCode: string
	link: string
	siteId: number
	siteName: string
}

export interface IPaymentQRPayData {
	channelName: string
	gSort: number
	groupId: number
	groupName: string
	maxAmount: number
	minAmount: number
	mode: number
}

export interface IChannelQrPayData {
	amountList: null | number[]
	amountRule: number
	channelId: number
	channelName: string
	currencyId: number
	gSort: number
	groupId: number
	groupName: 'ACB'
	maxAmount: number
	minAmount: number
	mode: DepositActionModeEnum
	payCode: string
	payCurrencyId: string
	payId: number
	payName: string
	pointLevel: number
	sSort: number
}

export interface IPaymentTopUpCardPayData {
	gSort: number
	groupId: number
	groupName: string
	maxAmount: number
	minAmount: number
	mode: number
	payName: string
}

export interface IChannelTopUpCardPayData {
	amountList: number[]
	amountRule: number
	channelId: number
	channelName: string
	code: number
	currencyId: number
	gSort: number
	groupId: number
	groupName: string
	maxAmount: number
	minAmount: number
	mode: number
	payCode: string
	payCurrencyId: string
	payId: number
	payName: string
	pointLevel: number
	sSort: number
	serial: null | string
	updated_timestamp: number
}

export interface IDepositLocalPayReqData {
	amount: number
	bankLogo: string
	code: string
	generateQr: boolean
	returnUrl: string // ex:pay-qrcode/1683277168.png
	transId: string // ex:'DD1408405'
}

export interface IDepositInfoRecentData {
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
		code: null | string
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
	thirdId: null | string
	refId: null | string
	depositTime: null
	depositReceipt: [
		{
			depositId: number
			picFileName: string
			receiptNo: number
			depositPic: string
		}
	]
	depositMessage: null | string
	depositMessageDetail: {
		errorTypeName: string
		message: string
		createTime: string
	}[]
}

export interface IWithdrawalSetting {
	currencyId: number
	status: boolean
	type: number
}

export enum IWithdrawalTypeEnum {
	BankCard = 1,
	EWallet = 3,
	Crypto = 4,
}
