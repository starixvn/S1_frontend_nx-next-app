import { IPromotionData } from '@nx-next-app/service'
import { PromotionTypeEnum } from '@nx-next-app/types'
import { openLiveChat } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'

const ButtonGroup = ({
	promotionDetail,
	onJoinPromotion,
}: {
	promotionDetail: IPromotionData
	onJoinPromotion: () => void
}) => {
	const { promotionType } = promotionDetail
	const { t } = useTranslation()
	return promotionType === PromotionTypeEnum.Other ? (
		<button className='red' onClick={openLiveChat}>
			{t('Label_Promotion_ApplyNow')}
		</button>
	) : (
		<button className='orange' onClick={onJoinPromotion}>
			{promotionType === PromotionTypeEnum.Cashback
				? t('Label_Promotion_ClaimNow')?.toUpperCase()
				: t('Label_Promotion_JoinNow')?.toUpperCase()}
		</button>
	)
}

export { ButtonGroup }
