import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import {
	IAxiosError,
	IOlympicEventTicketData,
	useGetOlympicEventTicketQuery,
	useSetOlympicEventPrizeMutation,
} from '@nx-next-app/service'
import { numberFormat } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'

const useOlympic = () => {
	const { t } = useTranslation()
	const {
		auth: { isLogin },
		userInfo: { langId, currencyId },
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

	const [setOlympicEventPrize] = useSetOlympicEventPrizeMutation()

	const {
		olympicEventPromotionMissionProgress,
		promotionMission = [] || null,
		errorCode,
	} = olympicEventTicketData || {}

	// 取得玩家已存金額(deposit)與已玩有效流水(turnover)
	const userMoneyData = {
		deposit: numberFormat(
			olympicEventPromotionMissionProgress?.depositAmount,
			currencyId,
			0,
			true
		),
		turnover: numberFormat(
			olympicEventPromotionMissionProgress?.turnoverSum,
			currencyId,
			0,
			true
		),
	}

	// 達成目標所需總額
	const missionTotal = {
		totalDeposit:
			promotionMission &&
			numberFormat(promotionMission[0]?.depositAmount, currencyId, 0, true),
		totalTurnover:
			promotionMission &&
			numberFormat(promotionMission[1]?.turnoverAmount, currencyId, 0, true),
	}

	// progress bar的完成比例
	const getProgressPercentage = (had: number, total: number) =>
		had >= total ? 100 : ((had / total) * 100).toFixed(2)
	const progressPercentage = {
		deposit: getProgressPercentage(
			olympicEventPromotionMissionProgress?.depositAmount,
			promotionMission?.[0]?.depositAmount || 0
		),
		turnover: getProgressPercentage(
			olympicEventPromotionMissionProgress?.turnoverSum,
			promotionMission?.[1]?.turnoverAmount || 0
		),
	}

	// 處理金牌兌換Bonus的function
	const handleRedeem = async (
		CustId: number | undefined,
		UsedGoldMetalCount: number,
		successModal: () => void,
		insufficientModal: () => void
	) => {
		const data = { CustId: CustId ?? 0, UsedGoldMetalCount }
		try {
			await setOlympicEventPrize(data).unwrap()

			// 如果成功用金牌兌換Bonus，就跳出對應的金額彈窗
			successModal()
		} catch (error) {
			const { errorCode } = error as IAxiosError
			if (errorCode === -1205) {
				// 如果玩家身上還有Bonus未用完(含非奧運的Bonus)，跳錯誤警告訊息
				// TODO: 待ＰＭ補上u18n記得再跑一次 sh locales.sh
				modal.error(t('Label_Olympic_Still_Running_Bonus'))
			} else {
				// 如果金牌數量不夠兌換該Bonus，跳出數量不足彈窗
				insufficientModal()
			}
		}
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
		errorCode,
		handleRedeem,
	}
}

export { useOlympic }

export type UseOlympicProps = ReturnType<typeof useOlympic>
