import { useSetClaimPromotionFetcher } from '@nx-next-app/features/F0001/hooks'
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

	const {
		onSetClaimPromotionForUploadCustList, // 雖然用法和useSetClaimPromotionMutation類似，但因為後端資料結構關係，所以另外寫一個for有在名單內才能領取的玩家
	} = useSetClaimPromotionFetcher()

	console.log('promotionData :>> ', promotionData)
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
						className={classNames({
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
										activeFilterType,
									}),
							})}
						/>
						<div className='promoImg'>
							<img src={banner} alt={title} />
						</div>
						<div className='promoInfo'>
							<div className='txt-darkBlue'>{title}</div>
							<div className='txt-gray'>{description}</div>

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
										className='orange'
										onClick={() => setClaimPromotionHandler(item)}
									>
										{isShowClaimNowButton
											? t('Label_Promotion_ClaimNow')
											: t('Label_Promotion_JoinNow')}
									</button>
								)}

								{/* 有在名單內的 Special Bonus 才有 ClaimNow 按鈕直接兌換 */}
								{canJoin &&
									!isJoin &&
									promotionType === PromotionTypeEnum.SpecialBonus && (
										<button
											className='orange'
											// 用新的setClaimPromotionForUploadCustList
											onClick={() =>
												onSetClaimPromotionForUploadCustList({
													bonusCode: item.bonusCode,
													lockedAmount: 0,
												})
											}
										>
											{t('Label_Promotion_ClaimNow')}
										</button>
									)}
								{/* 只有 Special Bonus 有 Link Type 另開視窗 */}
								{promotionType === PromotionTypeEnum.SpecialBonus &&
								promotionAction === PromotionActionType.Link ? (
									<a
										href={promotionLink as string}
										target='_blank'
										rel='noreferrer'
										className='btn-check'
									>
										{t('Label_General_MoreInfo')}
									</a>
								) : (
									<button
										className='btn-check'
										onClick={() =>
											onGetPromotionDetail({
												bonusCode,
											})
										}
									>
										{t('Label_General_MoreInfo')}
									</button>
								)}
							</div>
						</div>

						<div className='remain'>
							<div className='icon icon-icon32px_time'>
								{t('Label_Promotion_RemainingTime')}
								<div>{expiryTime}</div>
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
