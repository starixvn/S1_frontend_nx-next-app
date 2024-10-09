import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { usePromotion, useSetClaimPromotion } from '@nx-next-app/operations'
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
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import PromotionProgressBar from './PromotionProgressBar'

const ClaimAmountModal = dynamic(
	() => import('@12b-h5/components/promotion/common/ClaimAmountModal'),
	{ ssr: false }
)

const PromotionList = () => {
	const router = useRouter()
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const {
		activeFilterType,
		promotionData,
		onOpenPromotionDetail,
		onUpdatePromotionData,
	} = usePromotion()

	const { setClaimPromotionHandler } = useSetClaimPromotion({
		loginCallback: () => {
			router.push(`${paths.login.root}?from=${paths.promotion.root}`)
		},
		amountCallback: props => modal.open(<ClaimAmountModal {...props} />),
	})

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

						<div className='btn-group'>
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
									className='info'
								>
									{t('Label_General_MoreInfo')}
								</a>
							) : (
								<button
									className='info'
									onClick={() => onOpenPromotionDetail(bonusCode)}
								>
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
