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

export interface IOlympicEventTicketData {
	userName: string
	promotionMission: IPromotionMissionData[]
	olympicEventPromotionMissionProgress: {
		depositAmount: number
		turnoverSum: number
	}
	availableGoldMetals: number
	errorCode: number
}
