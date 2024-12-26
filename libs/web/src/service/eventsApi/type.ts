export interface IGetLeaderBoardListMonthArgs {
	lBCategoryId: number
	TopNum: number
	SelectDays: string
	EventCode: string
}

export interface ILeaderBoardMonthData {
	custId: number
	status: number
	userName: string
	wTurnover: number
}

export interface IGetLeaderBoardListArgs {
	lBCategoryId: number
	TopNum: number
	BeforeDays: number
	EventCode: string
}

export interface IGetLeaderBoardSettingArgs {
	siteId: number
	currencyId: number
}

export type ILeaderBoardCalculationData = {
	data: string
	siteId: number
	currencyId: number
	sportTurnover: number
	slotTurnover: number
	liveCasinoTurnover: number
}

export type ILeaderBoardRankingData = {
	siteId: number
	siteName: string
	currency: string
	currencyId: number
	ranking: string
	minPoint: number
	bonus: number
}
export interface ILeaderBoardSettingData {
	leaderboardPointCalculation: ILeaderBoardCalculationData
	leaderboardRankingBonus: ILeaderBoardRankingData[]
}

export interface IGetLeaderBoardData {
	custId: number
	userName: string
	wTurnover: number
	status: number
}

export interface IGetCustRankArgs {
	LBCategoryId: number
	BeforeDays: number
	EventCode: string
}

export interface ICustRankData {
	custRank: number
	point: number
	status: number
}

export interface IGetCustRankMonthArgs {
	LBCategoryId: number
	SelectDays: string
	EventCode: string
}

export type ICustRankMonthData = ICustRankData

export interface IDisplayDrawPrizeData {
	eventId: number
	index: number
	prizeId: number
	prizeIndex: number
	prizeName: string
}

// * 幸運輪盤抽獎紀錄
export interface ICustDrawPrizeData {
	amount: number
	drawTime: string
	eventDate: string
	prizeId: number
	prizeName: string
}

export interface ICheckDrawPrizeData {
	jackpot: number
	prizeId: number
	prizeName: null | string
	ticketCount: number
}

export type TPromotionPredictionData = {
	bonusCode: string
	banner: string
	description: string
	startTime: string
	endTime: string
	rollOver: number
	requiredAmount: number
	depositCountAchieved: number
	depositTermPeriodDays: number
	bonus: number
	homeTeamPic: string
	awayTeamPic: string
	homeScore: number
	awayScore: number
	custHomeScore: number
	custAwayScore: number
	result: boolean
	isPredict: boolean
	sportLeaguesTitle: string
	matchId: number
	tpId: string
	gameId: string
	homeTeamLeaguesId: number
	homeTeamId: number
	homeTeamName: string
	awayTeamLeaguesId: number
	awayTeamId: number
	awayTeamName: string
	battleTime: string
	homeOdds?: number
	awayOdds?: number
	handicap?: number
}

export type TPredictionTeamInfoData = {
	bonusCode: string
	promotionPrediction: TPromotionPredictionData[]
}

export interface IGetPredictionWinnerListArgs {
	siteId: number
	currencyId: number
}
export type TGetPredictionWinnerListData = {
	bonusCode: string
	bonus: number
	isoCode: string
	winners?: string[]
	sportLeaguesTitle?: string
	matchId?: number
	tpId?: string
	gameId?: string
	homeTeamLeaguesId?: number
	homeTeamId?: number
	homeTeamName?: string
	awayTeamLeaguesId?: number
	awayTeamId?: number
	awayTeamName?: string
	battleTime?: string
	homeOdds?: number
	awayOdds?: number
	handicap?: number
}
export interface IPromotionPredictScoreArgs {
	matchId: number
	homeTeamScore: number
	awayTeamScore: number
}

export interface ICheckPromotionMissionData {
	newYearMission2024: IMissionData[]
	eggTicket: number
}

export interface IMissionData {
	type: number
	missionDate: string
	missionName: string
	missionNo: number
	tpCategoryId: number
	goalAmount: number
	progressAmount: number
	eggCount: number
	isCompleted: boolean
}

export interface IDrawPrizeData {
	jackpot: number
	prizeId: number
	prizeName: null | string
	ticketCount: number
	drawPrizeType: number
}

export interface IGetCustBlessingsStickerData {
	isClaimedBigPrize: boolean
	stickers: number
}
