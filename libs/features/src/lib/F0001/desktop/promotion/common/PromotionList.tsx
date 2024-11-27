import { usePromotion } from '@nx-next-app/features/F0001/providers'
import {
	PromotionActionType,
	PromotionFilterEnum,
	PromotionTypeEnum,
} from '@nx-next-app/types'
import {
	getExpiryTime,
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
		promotionData,
		activeFilterType,
		setClaimPromotionHandler,
		onGetPromotionDetail,
		onUpdatePromotionData,
	} = usePromotion()

	return promotionData.length >= 1 ? (
		<div className='proListNew'>
			{promotionData.map(item => {
				const {
					isJoin,
					promotionType,
					canJoin,
					beenUsed,
					periodFrom,
					periodTo,
					custExpiryTime,
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

				const expiryTime = getExpiryTime({
					custExpiryTime,
					periodTo,
					t,
				})

				return (
					<div
						className={classNames('proListNew-item', {
							active: isPromotionClaimed({
								isJoin,
								status,
							}),
						})}
						key={bonusCode}
					>
						<div
							className={classNames('promotion-status', {
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
										activeFilterType,
									}),
							})}
						/>
						<div className='promoImg'>
							<img src={banner} alt={title} />
						</div>
						<div className='promoInfo'>
							<div className='group-heading'>
								<div className='promoInfo-heading'>{title}</div>
								<div className='promoInfo-description'>{description}</div>
							</div>

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
										className='btn-secondary'
									>
										{t('Label_General_MoreInfo')}
									</a>
								) : (
									<button
										className='btn-secondary'
										onClick={() => onGetPromotionDetail({ bonusCode })}
									>
										{t('Label_General_MoreInfo')}
									</button>
								)}
							</div>
						</div>

						<div className='remain'>
							<div className='date-titem'>
								<div className='group-icon'>
									<i className='icon icon-minus_circle' />{' '}
									{t('Label_Promotion_RemainingTime')}
								</div>
								<div className='time'>{expiryTime}</div>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	) : (
		<div className='nodata icon icon-nodata'>
			<div>{t('Label_General_NoData')}</div>
		</div>
	)
}

export default PromotionList
