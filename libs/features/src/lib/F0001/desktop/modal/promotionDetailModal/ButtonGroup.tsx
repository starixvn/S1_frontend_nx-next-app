import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { IPromotionData } from '@nx-next-app/service'
import { PromotionTypeEnum } from '@nx-next-app/types'
import { openLiveChat } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'

dayjs.extend(isBetween)

const ButtonGroup = ({
	promotionDetail,
	onJoinPromotion,
}: {
	promotionDetail: IPromotionData
	onJoinPromotion: () => void
}) => {
	const { promotionType, isJoin, beenUsed, periodFrom, periodTo } =
		promotionDetail
	const { t } = useTranslation()

	const joinButton = () => {
		// 確認是否顯示 join button
		const canJoin = !(
			// 加入過
			(
				isJoin ||
				// 已使用過
				beenUsed ||
				// rebate
				promotionType === PromotionTypeEnum.Rebate ||
				// 超過區間
				!dayjs().isBetween(dayjs.unix(periodFrom), dayjs.unix(periodTo))
			)
		)

		return canJoin ? (
			<button className='orange' onClick={onJoinPromotion}>
				{promotionType === PromotionTypeEnum.Cashback
					? t('Label_Promotion_ClaimNow')?.toUpperCase()
					: t('Label_Promotion_JoinNow')?.toUpperCase()}
			</button>
		) : null
	}

	return promotionType === PromotionTypeEnum.SpecialBonus ? (
		<button className='red' onClick={openLiveChat}>
			{t('Label_Promotion_ApplyNow')}
		</button>
	) : (
		joinButton()
	)
}

export { ButtonGroup }
