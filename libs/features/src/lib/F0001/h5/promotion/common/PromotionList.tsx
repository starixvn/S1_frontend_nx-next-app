import { usePromotion } from '@nx-next-app/features/F0001/providers'
import {
	PromotionActionType,
	PromotionFilterEnum,
	PromotionTypeEnum,
} from '@nx-next-app/types'
import {
	getIsHidePromotionJoinButton,
	isPromotionClaimed,
	isPromotionNew,
	isShowPromotionProgressBar,
} from '@nx-next-app/utils'
import classNames from 'classnames'
import { includes } from 'lodash-es'
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

	if (promotionData.length === 0) {
		return (
			<div className='nodata icon icon-nodata'>
				<div className='txt-white'>{t('Label_General_NoData')}</div>
			</div>
		)
	}

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
					promotionAction,
					promotionLink,
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

				// * 是否顯示 ClaimNowButton
				const isShowClaimNowButton = includes(
					[PromotionTypeEnum.Cashback, PromotionTypeEnum.RetentionFreeBet],
					promotionType
				)

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

						<div className='btnGroup'>
							{!isHideJoinButton && (
								<button
									className='btn-primary'
									onClick={() => setClaimPromotionHandler(item)}
								>
									{isShowClaimNowButton
										? t('Label_Promotion_ClaimNow')
										: t('Label_Promotion_JoinNow')}
								</button>
							)}
							{/* 只有 Special Bonus 有 Link Type 另開視窗 */}
							{promotionType === PromotionTypeEnum.SpecialBonus &&
							promotionAction === PromotionActionType.Link ? (
								<a
									href={promotionLink as string}
									target='_blank'
									rel='noreferrer'
									className='btn-primary'
								>
									{t('Label_General_MoreInfo')}
								</a>
							) : (
								<button onClick={() => onGetPromotionDetail({ bonusCode })}>
									{t('Label_General_MoreInfo')}
								</button>
							)}
						</div>
					</div>
				)
			})}
		</>
	)
}

export default PromotionList
