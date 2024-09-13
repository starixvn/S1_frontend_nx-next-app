import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import {
	useGetLotteryMaintainQuery,
	useGetRetentionPromotionQuery,
} from '@nx-next-app/service'
import { filter, includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'

export const useRetentionEvents = () => {
	const { t } = useTranslation()
	const { ALLOWED_CURRENCIES } = useStaticData()
	const {
		userInfo: { currencyId, langId },
		auth: { isLogin },
	} = useAuth()

	const { data: LotteryStatus, isLoading: isLoadingLotteryStatus } =
		useGetLotteryMaintainQuery(null, { skip: !isLogin })
	const isLotteryUnderMaintenance = LotteryStatus?.data?.isMaintain ?? true
	const isRestrictedFromLottery = LotteryStatus?.data?.isRestricted ?? true

	const { data: retentionPromotion, isLoading: isLoadingRetentionPromotion } =
		useGetRetentionPromotionQuery({ langId }, { skip: !langId || !isLogin })
	const retentionBonusCode = retentionPromotion?.data?.bonusCode

	const isLoading = isLoadingLotteryStatus || isLoadingRetentionPromotion

	const events = isLoading
		? []
		: filter(
				[
					{
						name: t('Label_LuckyWheel_Title'),
						path: paths.luckyWheel.root,
						access: includes(ALLOWED_CURRENCIES['LUCKY_WHEEL'], currencyId),
					},
					{
						name: t('Label_General_Lottery'),
						path: paths.event.lottery.root,
						access: !isRestrictedFromLottery,
						underMaintenance: isLotteryUnderMaintenance,
					},
					{
						name: t('Label_Retention_SurpriseReward'),
						path: paths.retention.root,
						access: Boolean(retentionBonusCode),
					},
				],
				'access'
		  )

	return { events }
}
