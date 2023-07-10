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
