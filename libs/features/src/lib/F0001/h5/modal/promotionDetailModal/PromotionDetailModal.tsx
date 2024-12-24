/* eslint-disable react/no-danger */

import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useSetClaimPromotionFetcher } from '@nx-next-app/features/F0001/hooks'
import { useGetPromotionDetailQuery } from '@nx-next-app/service'
import { PromotionTypeEnum } from '@nx-next-app/types'
import {
	getIsHidePromotionJoinButton,
	isShowPromotionProgressBar,
} from '@nx-next-app/utils'
import { includes, toUpper } from 'lodash-es'
import { useTranslation } from 'next-i18next'

import { useRouter } from 'next/router'
import PromotionProgressBar from '../../promotion/common/PromotionProgressBar'
import CashbackInfo from './CashbackInfo'
import DepositMenu from './DepositMenu'
import DepositSlip from './DepositSlip'
import PromotionMission from './PromotionMission'
import PromotionRule from './PromotionRule'

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
	const router = useRouter()
	const { closeModal } = useGlobalModal()
	const { LIVE_CHAT_ID_BY_LANG_ID } = useStaticData()

	const { data: { data: promotionDetail } = {} } = useGetPromotionDetailQuery({
		currencyId,
		langId,
		bonusCode,
	})

	const {
		onUpdatePromotionDetail,
		setClaimPromotionHandler,
		onSetClaimPromotionForUploadCustList,
	} = useSetClaimPromotionFetcher()

	if (!promotionDetail) return null

	const {
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
		maxAmount,
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
		<div className='pop'>
			<div className='popTit'>
				{t('Label_General_Promotion')}
				<div className='icon icon-close' onClick={closeModal} />
			</div>
			<div className='promotions'>
				<div className='proInfomodule'>
					<div className='btn-group'>
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

						{/* 在名單內的 Special Bonus 而且還沒claim過的才有 ClaimNow 按鈕直接兌換 */}
						{!isJoin && isShowApplyNowButton && (
							<a
								className={`${canJoin && !isJoin ? 'orange' : 'red'}`}
								rel='noreferrer'
								target='_blank'
								onClick={() => {
									canJoin && !isJoin
										? onSetClaimPromotionForUploadCustList({
												bonusCode,
												lockedAmount: maxAmount,
										  })
										: router.push(
												`https://direct.lc.chat/${
													process.env['NEXT_PUBLIC_LIVECHAT_LICENSE']
												}/${LIVE_CHAT_ID_BY_LANG_ID[langId] || 'en'}`
										  )
								}}
							>
								{canJoin && !isJoin
									? toUpper(t('Label_Promotion_ClaimNow') || '')
									: toUpper(t('Label_Promotion_ApplyNow') || '')}
							</a>
						)}
					</div>
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
						<PromotionMission promotionDetail={promotionDetail} />
					)}

					{promotionType !== PromotionTypeEnum.MissionBonus && (
						<PromotionRule promotionDetail={promotionDetail} />
					)}

					{isShowDepositSlip && (
						<DepositSlip depositAmount={depositAmount} refList={refList} />
					)}

					{isShowDepositMenu && (
						<DepositMenu depositId={depositId} depositAmount={depositAmount} />
					)}

					{isShowCashbackInfo && (
						<CashbackInfo
							bonusCode={bonusCode}
							cashBackDetails={cashBackDetails}
						/>
					)}

					{details && (
						<div
							className='text'
							dangerouslySetInnerHTML={{
								__html: `<pre>${details}</pre>`,
							}}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default PromotionDetailModal
