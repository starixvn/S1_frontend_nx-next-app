import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import {
	IOlympicEventTicketData,
	useGetOlympicEventTicketQuery,
} from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'

const useOlympic = () => {
	const { t } = useTranslation()
	const {
		auth: { isLogin },
		userInfo: { langId },
	} = useAuth()
	const { modal, closeModal } = useGlobalModal()
	const {
		data: { data: olympicEventTicketData = {} as IOlympicEventTicketData } = {},
		refetch: refetchOlympicEventTicket,
		isUninitialized: isOlympicEventTicketUninitialized,
	} = useGetOlympicEventTicketQuery(null, {
		skip: !isLogin,
		// 確保每次進來頁面都拉最新的資料
		refetchOnMountOrArgChange: true,
	})

	const {
		olympicEventPromotionMissionProgress,
		promotionMission = [],
		errorCode,
	} = olympicEventTicketData || {}

	// 取得玩家已存金額(deposit)與已玩有效流水(turnover)
	const userMoneyData = {
		deposit: olympicEventPromotionMissionProgress?.depositAmount,
		turnover: olympicEventPromotionMissionProgress?.turnoverSum,
	}

	// 達成目標所需總額
	const missionTotal = {
		totalDeposit: promotionMission[0]?.depositAmount,
		totalTurnover: promotionMission[1]?.turnoverAmount,
	}

	// progress bar的完成比例
	const getProgressPercentage = (had: number, total: number) =>
		had >= total ? 100 : ((had / total) * 100).toFixed(2)
	const progressPercentage = {
		deposit: getProgressPercentage(
			olympicEventPromotionMissionProgress?.depositAmount,
			promotionMission[0]?.depositAmount
		),
		turnover: getProgressPercentage(
			olympicEventPromotionMissionProgress?.turnoverSum,
			promotionMission[1]?.turnoverAmount
		),
	}

	useEffect(() => {
		// 還未驗證手機跟信箱的狀態先跳出錯誤訊息
		if (errorCode === 104) {
			modal.info(t('Label_EuropeCup_Verify_Email_Phone'), {
				onOK: () => closeModal(),
			})
		}
	}, [errorCode])

	// 切換語系重撈 (因為這支 payload 不帶 currencyId langId，沒有辦法自動重撈)
	useEffect(() => {
		if (!isOlympicEventTicketUninitialized) {
			refetchOlympicEventTicket()
		}
	}, [langId, isOlympicEventTicketUninitialized])

	return {
		olympicEventTicketData,
		userMoneyData,
		missionTotal,
		progressPercentage,
	}
}

export { useOlympic }

export type UseEuropeCupProps = ReturnType<typeof useOlympic>
