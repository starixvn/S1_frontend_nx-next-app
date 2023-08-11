import { IPromotionData } from '@nx-next-app/service'
import { BonusTypeEnum, PromotionTypeEnum } from '@nx-next-app/types'

// TODO
const PromoRule = ({
	promotionDetail,
}: {
	promotionDetail: IPromotionData
}) => {
	const {
		bonus,
		bonusType,
		maxBonus,
		rollOver,
		winOver,
		promotionType,
		requiredAmount,
		fullFillType,
		tierAmountList,
	} = promotionDetail

	const isPercentage = bonusType === BonusTypeEnum.Percentage

	const isStaticOrRebate =
		promotionType === PromotionTypeEnum.SpecialBonus ||
		promotionType === PromotionTypeEnum.Rebate
}
