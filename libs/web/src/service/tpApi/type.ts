import { DeviceTypeEnum } from '@nx-next-app/types'

export interface IGotoGameArg {
	tpId: number
	langId: string
	appType: DeviceTypeEnum | number
	inputs: {
		gameId?: null | string | number
		fun: '0' | '1' // * '1' 為開啟模式
		gameType?: string
		tpGameType: null | string | number | undefined
		loginGameType?: string
	}
}

export interface ITransferHistoryData {
	tpName: string
	transId: string
	amount: number
	direction: number
	createTime: string
	status: number
	memo: string
	isAdjustment: boolean
}

export interface IGetTransferHistoryArgs {
	startDate: number
	endDate: number
	pageNumber: number
}

export interface ITransferArgs {
	amount: number
	toTpId: number | null | undefined
	fromTpId: number | null | undefined
	transferAction: number
	langId: string
	selectSendingWalletCallback?: () => void
	selectReceivingCallback?: () => void
	transferModalCallback?: (
		turnover: number,
		rollover: number,
		percentage: number
	) => void
	errorCallback?: (message: string) => void
}

export interface ITransferData {
	status: number
	thirdId: number | null
	difference: number
	bonus: number
	rollover: number
	turnover: number
	bonusStatus: number
}
