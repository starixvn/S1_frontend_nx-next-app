export interface IGetDataListArgs {
	currencyId: number
	langId: string
}

export interface ILiveStreamingData {
	sportLeaguesTitle: string
	matchId: number
	tpId: string
	gameId: string
	homeTeamName: string
	awayTeamName: string
	battleTime: string
	homeOdds: number
	awayOdds: number
	handicap: number
	backgroundPic: string
	homeTeamPic: string
	awayTeamPic: string
}
