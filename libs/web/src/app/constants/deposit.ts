import { DepositTypeEnum } from '../types'

export const AllowUploadReceiptType = [
	DepositTypeEnum.BankTransfer,
	DepositTypeEnum.OnlineBanking,
	DepositTypeEnum.QuickTransfer,
	DepositTypeEnum.CryptoPay,
	DepositTypeEnum.CryptoWallet,
	DepositTypeEnum.MobilePayment,
	DepositTypeEnum.ChatTransfer,
	DepositTypeEnum.TopUpCard,
	DepositTypeEnum.BankAutoChannel,
	DepositTypeEnum.QRPay,
]

// 只有 BankTransfer 才有銀行相關資料需要顯示
export const WithReceiptInfoType = [DepositTypeEnum.BankTransfer]
