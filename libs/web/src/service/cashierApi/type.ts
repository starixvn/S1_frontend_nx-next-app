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
	paramsUrl: string
}

// 新的通用 DepositRequest API，可逐步全部調整成此 api
export interface IDepositReqArgs {
	langId: string
	channelId?: number
	code?: string
	serial?: string
	amount: number
	paramsUrl: string
	// leobet 用的錯誤頁
	errorUrl?: string
}
