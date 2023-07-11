export interface IGetPromotionArgs {
	langId: string
	currencyId: number
	deviceType: number
}

export type ICashBackDetail = {
	totalBonus: number // Total Bonus Claimable
	maxBonus: number // Max Bonus
	totalLossAmount: number // Total Net Loss
	minLossAmount: number // Min Net Loss Required
	originalTotalBonus: number // Total Bonus
	percentage: string // percentage
	tpName: string
	lossAmountWithBonus: number
	lossAmount: number
	cashBackDetail: ICashBackDetail[]
}
export interface IPromotionData {
	banner: string
	beenUsed: boolean
	bonus: number
	bonusCode: string
	bonusType: number
	canJoin: boolean
	canJoinTierAmountList: any[]
	cashBackDetails: ICashBackDetail
	categoryId: number
	custExpiryTime: string
	custRollOver: number
	custTurnOver: number
	depositAmount: number
	depositId: string | null
	description: string
	details: string | null
	deviceType: number | null
	displayFrom: number
	displayTo: number
	fullFillType: number
	isJoin: boolean
	lockedType: number
	maxAmount: number
	maxBonus: number
	periodFrom: number
	periodTo: number
	promotionAction: number
	promotionLink: string | null
	promotionType: number
	refList: unknown
	requiredAmount: number
	result: number
	rollOver: number
	sort: number
	status: number
	tierAmountList: []
	title: string
	tpId: number
	walletType: number
	winOver: number
}

// promotion detail
export interface IGetPromotionDetailArgs extends IGetPromotionArgs {
	bonusCode: string
}
