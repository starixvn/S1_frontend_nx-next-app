import { DepositPaymentEnum } from '@nx-next-app/types'

/**
 * 存款選項的開關與排序
 */
export const DEPOSIT_PAYMENT_ORDERS = [
	DepositPaymentEnum.AutoDeposit,
	DepositPaymentEnum.BankTransfer,
	DepositPaymentEnum.LinePay,
	DepositPaymentEnum.OnlineBanking,
	DepositPaymentEnum.MobilePay,
	DepositPaymentEnum.CryptoPay,
	DepositPaymentEnum.QRPay,
	DepositPaymentEnum.TopUpCardPay,
	DepositPaymentEnum.QuickTransfer,
	DepositPaymentEnum.ChatTransfer,
]

export const DEPOSIT_PAYMENT_OPTIONS = {
	[DepositPaymentEnum.AutoDeposit]: {
		labelDisplayKey: 'Label_Deposit_AutoDeposit',
		timeDisplayKey: 'Label_General_Instant',
		icon: 'icon icon-library fast',
	},
	[DepositPaymentEnum.BankTransfer]: {
		labelDisplayKey: 'Label_Deposit_BankTransfer',
		timeDisplayKey: 'Label_Deposit_5Mins',
		icon: 'icon icon-library',
	},
	[DepositPaymentEnum.LinePay]: {
		labelDisplayKey: 'Label_General_LinePay',
		timeDisplayKey: 'Label_Deposit_5Mins',
		icon: 'icon icon-line',
	},
	[DepositPaymentEnum.OnlineBanking]: {
		labelDisplayKey: 'Label_Deposit_OnlineBanking',
		timeDisplayKey: 'Label_General_Instant',
		icon: 'icon icon-connection',
	},
	[DepositPaymentEnum.MobilePay]: {
		labelDisplayKey: 'Label_Deposit_MobileEWallet',
		timeDisplayKey: 'Label_General_Instant',
		icon: 'icon icon-mobile',
	},
	[DepositPaymentEnum.CryptoPay]: {
		labelDisplayKey: 'Label_Deposit_Crypto',
		timeDisplayKey: 'Label_General_Instant',
		icon: 'icon icon-USDT',
	},
	[DepositPaymentEnum.QRPay]: {
		labelDisplayKey: 'Label_Deposit_QR_Pay',
		timeDisplayKey: 'Label_General_Instant',
		icon: 'icon icon-qrpay',
	},
	[DepositPaymentEnum.TopUpCardPay]: {
		labelDisplayKey: 'Label_Deposit_Top_Up_Card',
		timeDisplayKey: 'Label_General_Instant',
		icon: 'icon icon-topup',
	},
	[DepositPaymentEnum.QuickTransfer]: {
		labelDisplayKey: 'Label_Deposit_Quick_Transfer',
		timeDisplayKey: 'Label_General_Instant',
		icon: 'icon-quick',
	},
	[DepositPaymentEnum.ChatTransfer]: {
		labelDisplayKey: 'Label_Deposit_Quick_ChatTransfer',
		timeDisplayKey: 'Label_General_Instant',
		icon: 'icon-dou',
	},
}
