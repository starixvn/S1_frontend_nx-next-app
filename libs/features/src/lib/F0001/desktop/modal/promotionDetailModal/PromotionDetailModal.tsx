import { useTranslation } from 'next-i18next'
import Image from 'next/future/image'
import Link from 'next/link'
import { useAuth } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useGetPromotionDetailQuery } from '@nx-next-app/service'
import { useSetClaimPromotionFetcher } from '@nx-next-app/features/F0001/hooks'

import {
	getIsHidePromotionJoinButton,
	isShowPromotionProgressBar,
	isUrl,
} from '@nx-next-app/utils'
import { paths } from '@nx-next-app/constants'
import { PromotionTypeEnum } from '@nx-next-app/types'
import { includes, toUpper } from 'lodash-es'
import CashbackInfo from './CashbackInfo'
import DepositSlip from './DepositSlip'
import DepositMenu from './DepositMenu'
import PromotionProgressBar from '../../promotion/PromotionProgressBar'
import PromoRule from './PromoRule'
import PromoMission from './PromoMission'

const deviceType = Number(process.env['NEXT_PUBLIC_DEVICE_TYPE'])

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
	const {
		userInfo: { langId, currencyId },
	} = useAuth()
	const { closeModal } = useGlobalModal()

	const { data: { data: promotionDetail } = {} } = useGetPromotionDetailQuery({
		currencyId,
		langId,
		bonusCode,
		deviceType,
	})

	const { onUpdatePromotionDetail, setClaimPromotionHandler } =
		useSetClaimPromotionFetcher()

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

	return (
		<div className='promoInfoPop active'>
			<div className='promoInfoPopMask active' onClick={closeModal} />
			<div className='promotionsInfo'>
				<div className='icon icon-close' onClick={closeModal} />
				{isUrl(banner) ? (
					<Image src={banner} alt={title} width={1920} height={500} />
				) : null}
				<div className='proData'>
					<div className='proDataTitle'>
						<div className='txt-darkBlue'>
							{title}
							<div className='txt-gray'>{description}</div>
						</div>
						<div className='btnGroup'>
							{!isHideJoinButton && (
								<button
									className='orange'
									onClick={() => {
										setClaimPromotionHandler(promotionDetail)
									}}
								>
									{promotionDetail.promotionType === PromotionTypeEnum.Cashback
										? toUpper(t('Label_Promotion_ClaimNow') || '')
										: toUpper(t('Label_General_JoinNow') || '')}
								</button>
							)}

							{!isHideAllPromoButton && (
								<Link href={paths.promotion.root}>
									<button className='btn-check'>
										{t('Label_Promotion_AllPromos')}
									</button>
								</Link>
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
