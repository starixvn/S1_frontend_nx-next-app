/* eslint-disable @typescript-eslint/no-explicit-any */
export enum DepositPaymentEnum {
	AutoDeposit = 'AutoDeposit',
	BankTransfer = 'BankTransfer',
	LinePay = 'LinePay',
	OnlineBanking = 'OnlineBanking',
	MobilePay = 'MobilePay',
	CryptoPay = 'CryptoPay',
	QRPay = 'QRPay',
	TopUpCardPay = 'TopUpCardPay',
	// LocalBanking = 'LocalBanking',

	// LoadCard = 'LoadCard',
	// BankAutoChannel = 'BankAutoChannel',
}

export enum DepositChannelIdEnum {
	OnlineBanking = 1,
	CashDepositMachine,
	ATM,
	OverTheCounter,
	BankQR,
}

export enum DepositActionModeEnum {
	inHtml = 1, // * 開新視窗，將 HTML 置入
	windowOpen, // * 開新視窗，導轉 URL
	QrCode, // * 將 URL 以 QR CODE 呈現
}

export interface IDepositPaymentOption {
	labelDisplayKey: string
	timeDisplayKey: string
	icon: string
}
