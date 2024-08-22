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

export interface ILotteryRoundInfo {
	roundId: number
	startDate: string
	endDate: string
	drawDate: string
	status: number
}

export interface ILotteryTierList {
	siteId: number
	currencyId: number
	level: number
	turnOverStart: number
	turnOverEnd: number
}

export interface ILotteryInfoData {
	lotteryRoundInfo: ILotteryRoundInfo
	lotteryTierList: ILotteryTierList[]
	ticketNo: string[]
	ticketCount: number
	turnoverGoal: number
	custTurnoverProccessing: number
	custTurnoverSummary: number
	jackpotAmount: number
}

export enum ChineseZodiacStickerId {
	Rat = 1,
	Ox,
	Tiger,
	Cat,
	Dragon,
	Snake,
	Horse,
	Goat,
	Monkey,
	Rooster,
	Dog,
	Pig,
}

export interface IChineseZodiacStickerData {
	stickerId: ChineseZodiacStickerId
	stickerPrize: number
	canBuy: boolean
}

export interface IBuyChineseZodiacStickerArgs {
	stickerId: ChineseZodiacStickerId
}

export interface IGetLotteryHistoryWinnerArgs {
	roundId: number
}

export interface ILotteryWinnerList {
	siteId: number
	roundId: number
	firstPrize: string[]
	secondPrize: string[]
	thirdPrize: string[]
	consolationPrize: string[]
	smallPrize: string[]
	stickerId: ChineseZodiacStickerId
	ticketNo: string[]
	custStickerId: ChineseZodiacStickerId
}

export interface ILotteryRoundData {
	siteId: number
	roundId: number
	startDate: string
	endDate: string
	drawDate: string
}

export enum LotteryPrizeCategory {
	FirstPrize = 1,
	SecondPrize,
	ThirdPrize,
	ConsolationPrize,
	SmallPrize,
}

export interface ICustLotteryHistoryWinnerData {
	roundId: number
	startDate: string
	endDate: string
	stickerId: ChineseZodiacStickerId
	jackpot: number
	ticketNo: string
	lotteryPrizeCategory: LotteryPrizeCategory
}
