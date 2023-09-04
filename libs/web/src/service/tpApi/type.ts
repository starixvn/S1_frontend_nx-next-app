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
