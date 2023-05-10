export enum TpWalletListTypeEnum {
	All,
	Transferred,
}

export interface ISetLangArgs {
	langId: string
}

export interface IWalletBalanceData {
	balance: number
	lastLoginTime: string
	lastTransaction: string
	isHideBalance: boolean
}

export interface IPopUpMsgData {
	id: number
	popupMessage: string
	pageNumber: number
}

export interface ITpWalletData {
	tpId: number
	tpName: string
	displayKey: string
	description: string
	walletMode: number
}
