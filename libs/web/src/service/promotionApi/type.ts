import { DeviceTypeEnum } from '@nx-next-app/types'

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
	canJoinTierAmountList: {
		bonus: number
		bonusAmount: number
		lockedAmount: number
		requiredAmount: number
		requiredTurnover: number
	}[]
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
	refList: {
		depositId: number
		amount: number
	}[]
	requiredAmount: number
	result: number // * 0=成功
	rollOver: number
	sort: number
	status: number
	tierAmountList: {
		requiredAmount: number
		requiredTurnover: number
		bonus: number
		maxBonus: number
		winOver: number
		rollOver: number
	}[]
	title: string
	tpId: number
	walletType: number
	winOver: number
	periodType: number
	missionBonusProgress: {
		depositAmountSum: number
		turnoverSum: number
	}
}

// promotion detail
export interface IGetPromotionDetailArgs extends IGetPromotionArgs {
	bonusCode: string
}

export interface IRebateExcludeGameData {
	gameName: string
	tpCategoryName: string
	tpGameType: number
	tpGameTypeName: string
	tpName: string
}

export interface ISetClaimPromotionArgs {
	langId: string
	bonusCode: string
	deviceType: DeviceTypeEnum
	lockedAmount: number
}

export interface IDepositPromotionCanJoinTierAmountData {
	requiredAmount: number
	bonusAmount: number
	lockedAmount: number
}

export interface IDepositPromotionTierAmountData {
	requiredAmount: number
	bonus: number
	maxBonus: number
}

export interface IDepositPromotionData {
	banner: string
	beenUsed: boolean
	bonus: number
	bonusCode: string
	bonusType: number
	canJoin: boolean
	canJoinTierAmountList: IDepositPromotionCanJoinTierAmountData[]
	cashBackDetails: null
	categoryId: number
	custExpiryTime: null | string
	custRollOver: number
	custTurnOver: number
	depositAmount: number
	depositId: null | string
	description: string
	details: null
	deviceType: null
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
	promotionLink: null
	promotionType: number
	refList: null
	requiredAmount: number
	result: number
	rollOver: number
	sort: number
	status: number
	tierAmountList: IDepositPromotionTierAmountData[]
	title: string
	tpId: number
	walletType: number
	winOver: number
}

export interface ISetDepositPromotionQueueArgs {
	langId: string
	transId: string
	bonusCode: string
	deviceType: number
}

export interface IGetPopUpPromotionArgs {
	deviceType: number
	langId: string
}

export interface IGetRetentionPromotionArgs {
	deviceType: number
	langId: string
}



