export interface IGetPopUpDataListArgs {
	deviceType: number
}

export interface IPopUpData {
	tpId: number
	gameId: string | null
	tpGameType: number
	tpCategory: number
	gameName: string | null
	userName: string | null
	amount: number
}
