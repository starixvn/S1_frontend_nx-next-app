export enum CupEventUserTicketStatus {
	Active = 1,
	Finish = 2,
	UnStarted = 3,
}

interface IPromotionMissionData {
	missionName: string
	missionNo: number
	depositFlag: boolean
	depositAmount: number
	turnoverFlag: boolean
	turnoverAmount: number
	tpCategoryId: number
	affFlag: boolean
	affCount: number
	ticketCount: number
	isCompleted: boolean
}

export interface ITicketData {
	ticketType: number
	countryId: number | null // null 代表還未預測的初始狀態
	ticketStatus: CupEventUserTicketStatus
}

export interface IGroupData {
	countryId: number
	countryName: string
	imageName: string
}

export interface ICupEventTicketData {
	userName: string
	promotionMission: IPromotionMissionData[]
	cupEventPromotionMissionProgress: {
		depositAmount: number
		turnoverSum: number
		affCount: number
	}
	availableTickets: number
	usedTickets: number
	unUsedTickets: number
	userTicketResult: {
		ticketList: ITicketData[]
		groupCountryTicket: string | null
	}
	selectOptions: Record<string, IGroupData[]>
	errorCode: number
}

export interface IGetUserPollTicketArgs {
	ticketType: number
	countryId: number
}

export interface ITeamData {
	countryName: string
	imageName: string
}

export interface ICupEventPredictionSettingData {
	data: {
		top24Team: (ITeamData & { sort: number })[]
		roundOf16: (ITeamData & { sort: number })[]
		quarterFinals: (ITeamData & { sort: number })[]
		semiFinals: (ITeamData & { sort: number })[]
		'3rdPlace': (ITeamData & { sort: number })[]
		final: (ITeamData & { sort: number })[]
		matchTimes: {
			matchName: string
			matchTime: string
		}[]
		selectOptions: {
			[key in
				| 'groupA'
				| 'groupB'
				| 'groupC'
				| 'groupD'
				| 'groupE'
				| 'groupF']: (ITeamData & { countryId: number })[]
		}
	}
	errorCode: number
	message: string
	rawErrorCode: string
	rawMessage: string
}

export interface IGetCupEventPredictionSettingArgs {
	langId: string
}
