export interface IDepositCashierQRCodeInfo {
	url: string
	formData: {
		DepositAmount?: number
		BankName?: string
		AccountNumber?: number
		AccountName?: string
		Token?: string
		Rate?: string
		RequestAmount: string // * Crypto 換匯後的數字
		PromotionAmount?: number
		PromotionRate?: number
		Promotion?: string
	}
	thirdId: string
	message?: null | string
	mode?: number
}

export interface IPostDepositLoadCardPayReqArgs {
	langId: string
	channelId?: number
	code?: string
	serial?: string
	amount: number
}
