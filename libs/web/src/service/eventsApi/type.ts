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
