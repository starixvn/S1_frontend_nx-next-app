export interface IUserMoneyData {
	deposit: string | undefined
	turnover: string | undefined
}

export interface IMissionTotal {
	totalDeposit: string | undefined
	totalTurnover: string | undefined
}

export interface IProgressPercentage {
	deposit: string | undefined
	turnover: string | undefined
}

export enum CustPrizeListEventEnum {
	Nova88 = 18,
	Goal123,
	Bwing,
}

export enum OlympicErrorCodeEnum {
	ProfileNotVerify = 104,
	BonusOngoing = -1205,
}
