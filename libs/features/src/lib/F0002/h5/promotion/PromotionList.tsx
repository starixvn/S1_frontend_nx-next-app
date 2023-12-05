import { usePromotion } from '@nx-next-app/features/F0002/providers'
import { PromotionFilterEnum, PromotionTypeEnum } from '@nx-next-app/types'
import {
	getIsHidePromotionJoinButton,
	isPromotionClaimed,
	isPromotionNew,
	isShowPromotionProgressBar,
} from '@nx-next-app/utils'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import PromotionProgressBar from './PromotionProgressBar'

const PromotionList = () => {
	const { t } = useTranslation()
	const {
		activeFilterType,
		promotionData,
		setClaimPromotionHandler,
		onGetPromotionDetail,
		onUpdatePromotionData,
	} = usePromotion()

	return (
		<>
			{promotionData.map(item => {
				const {
					isJoin,
					promotionType,
					canJoin,
					beenUsed,
					periodFrom,
					periodTo,
					custTurnOver,
					custRollOver,
					status,
					bonusCode,
					banner,
					title,
					description,
					tpId,
					categoryId,
				} = item

				// * activeFilterType 只存在在 List，所以不加進 getIsHidePromotionJoinButton 的邏輯裡
				const isHideJoinButton =
					(activeFilterType === PromotionFilterEnum.PromoCode && !canJoin) ||
					getIsHidePromotionJoinButton({
						isJoin,
						promotionType,
						beenUsed,
						periodFrom,
						periodTo,
					})

				return (
					<div
						className={classNames('promodule', {
							active: isPromotionClaimed({
								isJoin,
								status,
							}),
						})}
						key={bonusCode}
					>
						<div
							className={classNames({
								claimed: isPromotionClaimed({
									isJoin,
									status,
								}),
								'new active':
									!isPromotionClaimed({
										isJoin,
										status,
									}) &&
									isPromotionNew({
										canJoin,
										periodFrom,
									}),
							})}
						/>
						<img src={banner} alt={title} />

						<div className='protitle'>{title}</div>
						<div className='text'>{description}</div>

						{isShowPromotionProgressBar({
							isJoin,
							status,
							promotionType,
						}) && (
							<PromotionProgressBar
								custTurnOver={custTurnOver}
								custRollOver={custRollOver}
								onSpinButton={() => {
									onUpdatePromotionData({
										bonusCode,
										tpId,
										promoCategoryId: String(categoryId),
									})
								}}
							/>
						)}

						<div className='btn-group'>
							{!isHideJoinButton && (
								<button
									className='orange'
									onClick={() => setClaimPromotionHandler(item)}
								>
									{promotionType === PromotionTypeEnum.Cashback
										? t('Label_Promotion_ClaimNow')
										: t('Label_General_JoinNow')}
								</button>
							)}

							<button onClick={() => onGetPromotionDetail({ bonusCode })}>
								{t('Label_General_MoreInfo')}
							</button>
						</div>
					</div>
				)
			})}
		</>
	)
}

export default PromotionList
