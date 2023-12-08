/* eslint-disable react/no-danger */

import { useAuth } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useSetClaimPromotionFetcher } from '@nx-next-app/features/F0002/hooks'
import { useGetPromotionDetailQuery } from '@nx-next-app/service'
import {
	getIsHidePromotionJoinButton,
	isShowPromotionProgressBar,
} from '@nx-next-app/utils'
import { PromotionTypeEnum } from '@nx-next-app/types'
import { includes, toUpper } from 'lodash-es'

import PromotionRule from './PromotionRule'
import CashbackInfo from './CashbackInfo'
import DepositSlip from './DepositSlip'
import DepositMenu from './DepositMenu'
import PromotionProgressBar from '../../promotion/PromotionProgressBar'

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

	const { onUpdatePromotionDetail } = useSetClaimPromotionFetcher()

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
		<div className='pop'>
			<div className='popTit'>
				{t('Label_General_Promotion')}
				<div className='icon icon-close' onClick={closeModal} />
			</div>
			<div className='promotions'>
				<div className='proInfomodule'>
					<div className='btn-group'>
						{!isHideJoinButton && (
							<button className='orange'>
								{promotionDetail.promotionType === PromotionTypeEnum.Cashback
									? toUpper(t('Label_Promotion_ClaimNow') || '')
									: toUpper(t('Label_General_JoinNow') || '')}
							</button>
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

					<PromotionRule promotionDetail={promotionDetail} />

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
