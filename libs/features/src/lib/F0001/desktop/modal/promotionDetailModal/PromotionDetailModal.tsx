import { useTranslation } from 'next-i18next'
import {
	openLiveChat,
	getIsHidePromotionJoinButton,
	isShowPromotionProgressBar,
	isUrl,
} from '@nx-next-app/utils'
import { useAuth } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useGetPromotionDetailQuery } from '@nx-next-app/service'
import { useSetClaimPromotionFetcher } from '@nx-next-app/features/F0001/hooks'
import { useRouter } from 'next/router'
import { paths } from '@nx-next-app/constants'
import { PromotionTypeEnum } from '@nx-next-app/types'
import { includes, toUpper } from 'lodash-es'
import CashbackInfo from './CashbackInfo'
import DepositSlip from './DepositSlip'
import DepositMenu from './DepositMenu'
import PromotionProgressBar from '../../promotion/common/PromotionProgressBar'
import PromoRule from './PromoRule'
import PromoMission from './PromoMission'

interface IPromotionDetailModalProps {
	bonusCode: string
	// 是否隱藏全部優惠的 button , 預設為 false
	isHideAllPromoButton?: boolean
}

const PromotionDetailModal = ({
	bonusCode,
	isHideAllPromoButton = false,
}: IPromotionDetailModalProps) => {
	const { t } = useTranslation()
	const { push } = useRouter()
	const {
		userInfo: { langId, currencyId },
	} = useAuth()
	const { closeModal, modal } = useGlobalModal()
	const { data: { data: promotionDetail } = {}, status: statusResult } = useGetPromotionDetailQuery({
		currencyId,
		langId,
		bonusCode,
	})

	const { onUpdatePromotionDetail, setClaimPromotionHandler } =
		useSetClaimPromotionFetcher()

	if (statusResult !== 'pending' && promotionDetail === null) {
		modal.error(t('Label_Promotion_Unavailable'))
		return null
	}
	if (!promotionDetail) return null

	const {
		banner,
		title,
		description,
		cashBackDetails,
		promotionType,
		details,
		depositAmount,
		refList,
		depositId,
		canJoin,
		isJoin,
		custTurnOver,
		custRollOver,
		status,
		beenUsed,
		periodFrom,
		periodTo,
		tpId,
		categoryId,
	} = promotionDetail ?? {}

	// * 是否顯示 Cashback 相關資訊
	const isShowCashbackInfo = cashBackDetails && bonusCode

	// * 是否顯示 存款單(Multi) 相關資訊
	const isShowDepositSlip = promotionType === PromotionTypeEnum.Redeposit

	// * 是否顯示 存款單(Single) 相關資訊
	const isShowDepositMenu =
		depositId &&
		canJoin &&
		!isJoin &&
		includes(
			[PromotionTypeEnum.FirstDeposit, PromotionTypeEnum.Redeposit],
			promotionType
		)

	// * 是否顯示Join按鈕(進行中||已完成||無資格則不顯示)
	const isHideJoinButton = getIsHidePromotionJoinButton({
		isJoin,
		promotionType,
		beenUsed,
		periodFrom,
		periodTo,
	})

	// * 是否顯示 ClaimNowButton
	const isShowClaimNowButton = includes(
		[PromotionTypeEnum.Cashback, PromotionTypeEnum.RetentionFreeBet],
		promotionDetail.promotionType
	)

	// * 只有 Special Bonus 顯示 Apply Now 按鈕
	const isShowApplyNowButton =
		PromotionTypeEnum.SpecialBonus === promotionDetail.promotionType

	return (
		<div className='promoInfoPop active'>
			<div className='promoInfoPopMask active' onClick={closeModal} />
			<div className='promotionsInfo'>
				<div className='icon icon-close' onClick={closeModal} />
				{isUrl(banner) ? <img src={banner} alt={title} /> : null}
				<div className='proData'>
					<div className='proDataTitle'>
						<div className='txt-darkBlue'>
							{title}
							<div className='txt-gray'>{description}</div>
						</div>
						<div className='btnGroup'>
							{!isHideJoinButton && !isShowApplyNowButton && (
								<button
									className='orange'
									onClick={() => {
										setClaimPromotionHandler(promotionDetail)
									}}
								>
									{isShowClaimNowButton
										? toUpper(t('Label_Promotion_ClaimNow') || '')
										: toUpper(t('Label_Promotion_JoinNow') || '')}
								</button>
							)}
							{isShowApplyNowButton && (
								<button className='red' onClick={openLiveChat}>
									{t('Label_Promotion_ApplyNow')}
								</button>
							)}
							{!isHideAllPromoButton && (
								<button
									className='btn-check'
									onClick={() => {
										push(paths.promotion.root)
										closeModal()
									}}
								>
									{t('Label_Promotion_AllPromos')}
								</button>
							)}
						</div>
					</div>
					{isShowCashbackInfo && (
						<CashbackInfo
							bonusCode={bonusCode}
							cashBackDetails={cashBackDetails}
						/>
					)}

					{isShowDepositSlip && (
						<DepositSlip depositAmount={depositAmount} refList={refList} />
					)}

					{isShowDepositMenu && (
						<DepositMenu depositId={depositId} depositAmount={depositAmount} />
					)}

					{isShowPromotionProgressBar({
						isJoin,
						status,
						promotionType,
					}) && (
							<PromotionProgressBar
								custTurnOver={custTurnOver}
								custRollOver={custRollOver}
								onSpinButton={() =>
									onUpdatePromotionDetail({
										bonusCode,
										tpId,
										promoCategoryId: String(categoryId),
									})
								}
							/>
						)}
					{promotionType === PromotionTypeEnum.MissionBonus && !isJoin && (
						<PromoMission promotionDetail={promotionDetail} />
					)}

					{promotionType !== PromotionTypeEnum.MissionBonus && (
						<PromoRule promotionDetail={promotionDetail} />
					)}

					{details && (
						<div
							className='proDataBody'
							// eslint-disable-next-line react/no-danger
							dangerouslySetInnerHTML={{
								__html: details,
							}}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default PromotionDetailModal
