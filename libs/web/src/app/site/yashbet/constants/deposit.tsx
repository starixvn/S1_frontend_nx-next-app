import { DepositChannelIdEnum, DepositPaymentEnum } from '@nx-next-app/types'
import { TFunction } from 'next-i18next'

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
		labelDisplayKey: 'QR Pay',
		timeDisplayKey: 'Label_General_Instant',
		icon: 'icon icon-qrpay',
	},
	[DepositPaymentEnum.TopUpCardPay]: {
		labelDisplayKey: 'TOP-UP CARD',
		timeDisplayKey: 'Label_General_Instant',
		icon: 'icon icon-topup',
	},
}

export const DEPOSIT_CHANNEL_OPTIONS = ({ t }: { t: TFunction }) => [
	{
		label: t('Label_Deposit_DepositChannelOption1'),
		value: DepositChannelIdEnum.OnlineBanking,
	},
	{
		label: t('Label_Deposit_DepositChannelOption2'),
		value: DepositChannelIdEnum.CashDepositMachine,
	},
	{
		label: t('Label_Deposit_DepositChannelOption3'),
		value: DepositChannelIdEnum.ATM,
	},
	{
		label: t('Label_Deposit_DepositChannelOption4'),
		value: DepositChannelIdEnum.OverTheCounter,
	},
	{
		label: t('Label_Deposit_DepositChannelOption5'),
		value: DepositChannelIdEnum.BankQR,
	},
]
