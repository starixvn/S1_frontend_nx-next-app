import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import {
	IAxiosError,
	useGetCustDrawPrizeListQuery,
	useLazyGetOlympicEventTicketQuery,
	useSetOlympicEventPrizeMutation,
} from '@nx-next-app/service'
import {
	IMissionTotal,
	IProgressPercentage,
	IUserMoneyData,
} from '@nx-next-app/types'
import { numberFormat } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

const EVENT_ID = 18 // 代表Nova88站台  goal123是19  bwing是20
const getProgressPercentage = (had: number, total: number) =>
	had >= total ? '100' : ((had / total) * 100).toFixed(2)

const useOlympic = () => {
	const { t } = useTranslation()
	const {
		auth: { isLogin },
		userInfo: { langId, currencyId },
	} = useAuth()
	const { modal, closeModal } = useGlobalModal()
	const [userMoneyData, setUserMoneyData] = useState<IUserMoneyData>({
		deposit: '0',
		turnover: '0',
	})
	const [missionTotal, setMissionTotal] = useState<IMissionTotal>({
		totalDeposit: '0',
		totalTurnover: '0',
	})
	const [progressPercentage, setProgressPercentage] =
		useState<IProgressPercentage>({
			deposit: '0',
			turnover: '0',
		})
	const [availableGoldMetals, setAvalableGoldMetals] = useState<number>(0)

	// 取得玩家目前存款與流水和金牌數量 api
	const [getOlympicEventTicket] = useLazyGetOlympicEventTicketQuery()
	const handleOlympicEventTicketData = async () => {
		try {
			const { data: olympicEventTicketData } = await getOlympicEventTicket(
				null
			).unwrap()
			const {
				olympicEventPromotionMissionProgress,
				promotionMission = [] || null,
				availableGoldMetals,
				errorCode,
			} = olympicEventTicketData

			if (olympicEventTicketData) {
				// 取得玩家已存金額(deposit)與已玩有效流水(turnover)
				setUserMoneyData({
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
				})

				// 達成目標所需總額
				setMissionTotal({
					totalDeposit: numberFormat(
						promotionMission[0]?.depositAmount,
						currencyId,
						0,
						true
					),
					totalTurnover: numberFormat(
						promotionMission[1]?.turnoverAmount,
						currencyId,
						0,
						true
					),
				})

				// progress bar的完成比例
				setProgressPercentage({
					deposit:
						errorCode === 104 || !isLogin
							? '0'
							: getProgressPercentage(
									olympicEventPromotionMissionProgress?.depositAmount,
									promotionMission?.[0]?.depositAmount || 0
							  ),
					turnover:
						errorCode === 104 || !isLogin
							? '0'
							: getProgressPercentage(
									olympicEventPromotionMissionProgress?.turnoverSum,
									promotionMission?.[1]?.turnoverAmount || 0
							  ),
				})

				// 取得目前擁有金牌數量
				setAvalableGoldMetals(availableGoldMetals)
			}

			// 還未驗證手機跟信箱的狀態先跳出錯誤訊息
			if (errorCode === 104) {
				modal.info(t('Label_EuropeCup_Verify_Email_Phone'), {
					onOK: () => closeModal(),
				})
			}
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const [setOlympicEventPrize] = useSetOlympicEventPrizeMutation()

	// 取得用戶兌換Bonus紀錄
	const { data: { data: custRedeemHistoryList } = {} } =
		useGetCustDrawPrizeListQuery({
			eventId: EVENT_ID,
		})

	// 處理金牌兌換Bonus的function
	const handleRedeem = async (
		custId: number | undefined,
		usedGoldMetalCount: number,
		successModal: () => void,
		insufficientModal: () => void
	) => {
		const data = { custId: custId ?? 0, usedGoldMetalCount }
		try {
			await setOlympicEventPrize(data).unwrap()

			// 如果成功用金牌兌換Bonus，就跳出對應的金額彈窗
			successModal()
		} catch (error) {
			const { errorCode } = error as IAxiosError
			if (errorCode === -1205) {
				// 如果玩家身上還有Bonus未用完(含非奧運的Bonus)，跳錯誤警告訊息
				modal.error(t('Label_Olympic_Still_Running_Bonus'))
			} else {
				// 如果金牌數量不夠兌換該Bonus，跳出數量不足彈窗
				insufficientModal()
			}
		}
	}

	// 呼叫getOlympicEventTicket api 並設置好所有會需要的state
	useEffect(() => {
		if (!isLogin) return
		handleOlympicEventTicketData()
	}, [langId])

	return {
		availableGoldMetals,
		userMoneyData,
		missionTotal,
		progressPercentage,
		custRedeemHistoryList,
		handleRedeem,
	}
}

export { useOlympic }

export type UseOlympicProps = ReturnType<typeof useOlympic>
