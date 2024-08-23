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

	const {
		userInfo: { currencyId, langId },
		auth: { isLogin },
	} = useAuth()

	const retentionBonusCode = useGetRetentionPromotionQuery(
		{ langId },
		{ skip: !langId || !isLogin }
	)?.data?.data?.bonusCode

	const isLotteryUnderMaintenance =
		useGetLotteryMaintainQuery(null)?.data?.data?.isMaintain ?? false

	const { ALLOWED_CURRENCIES } = useStaticData()

	const events: {
		name: string
		path: string
		access: boolean
		underMaintenance?: boolean
	}[] = filter(
		[
			{
				name: t('Label_LuckyWheel_Title'),
				path: paths.luckyWheel.root,
				access: includes(ALLOWED_CURRENCIES['LUCKY_WHEEL'], currencyId),
			},
			{
				name: t('Label_General_Lottery'),
				path: paths.event.lottery.root,
				access: Boolean(isLogin),
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
