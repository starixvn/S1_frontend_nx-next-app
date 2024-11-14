export interface IGetHotGameListArgs {
	deviceType: number
	top: number
	tpCategory: string
	currencyId: number
}

export type IHotGame = {
	gameId: string
	gameLogo: string
	gameName: string
	sort: number
	tpCategory: number
	tpGameType: number
	tpId: number
	tpLogo: string
	tpName: string
}

export interface IHotGameData {
	HotGame: IHotGame[]
	NewGame: IHotGame[]
	Progressive: IHotGame[]
	TopCasino: IHotGame[]
}
