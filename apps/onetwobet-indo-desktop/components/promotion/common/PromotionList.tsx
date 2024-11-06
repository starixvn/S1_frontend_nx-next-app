import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { usePromotion, useSetClaimPromotion } from '@nx-next-app/operations'
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
import dynamic from 'next/dynamic'
import PromotionProgressBar from './PromotionProgressBar'

const LoginModal = dynamic(
	() => import('@12b-indo-desktop/components/modal/LoginModal'),
	{ ssr: false }
)

const ClaimAmountModal = dynamic(
	() =>
		import('@12b-indo-desktop/components/promotion/common/ClaimAmountModal'),
	{ ssr: false }
)

const PromotionList = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const {
		promotionData,
		activeFilterType,
		onOpenPromotionDetail,
		onUpdatePromotionData,
	} = usePromotion()

	const { setClaimPromotionHandler } = useSetClaimPromotion({
		loginCallback: () => modal.open(<LoginModal />),
		amountCallback: props => modal.open(<ClaimAmountModal {...props} />),
	})

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
							<div className='txt-black'>{title}</div>
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
										className='primary'
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
										className='btn-check info'
									>
										{t('Label_General_MoreInfo')}
									</a>
								) : (
									<button
										className='btn-check info'
										onClick={() => onOpenPromotionDetail(bonusCode)}
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
