import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useAuth } from '@nx-next-app/data-access'
import {
	IAxiosError,
	ICustDrawPrizeData,
	useGetCustDrawPrizeListQuery,
	useLazyGetOlympicEventTicketQuery,
	useSetOlympicEventPrizeMutation,
} from '@nx-next-app/service'
import {
	CustPrizeListEventEnum,
	DeviceTypeEnum,
	IMissionTotal,
	IProgressPercentage,
	IUserMoneyData,
	OlympicErrorCodeEnum,
} from '@nx-next-app/types'
import { numberFormat } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { paths } from '@nx-next-app/constants'
import LoginModal from '../../desktop/modal/LoginModal'

interface IOlympicContext {
	availableGoldMetals: number
	userMoneyData: IUserMoneyData
	missionTotal: IMissionTotal
	progressPercentage: IProgressPercentage
	handleRedeem: (
		custId: number | undefined,
		usedGoldMetalCount: number,
		successModal: () => void,
		insufficientModal: () => void
	) => void
	custRedeemHistoryList: ICustDrawPrizeData[]
}

interface IOlympicProviderProps {
	children: ReactNode
}

const OlympicContext = createContext<IOlympicContext>(
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	null!
)

const EVENT_ID = CustPrizeListEventEnum.Nova88 // 代表Nova88站台  goal123是19  bwing是20

const getProgressPercentage = (had: number, total: number) =>
	had >= total ? '100' : ((had / total) * 100).toFixed(2)

export const useOlympic = () => useContext(OlympicContext)

export const OlympicProvider = ({ children }: IOlympicProviderProps) => {
	const { t } = useTranslation()
	const { push } = useRouter()
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
	const [availableGoldMetals, setAvailableGoldMetals] = useState<number>(0)

	// 取得玩家目前存款與流水和金牌數量 api
	const [getOlympicEventTicket] = useLazyGetOlympicEventTicketQuery()
	const handleOlympicEventTicketData = async () => {
		try {
			const { data: olympicEventTicketData } = await getOlympicEventTicket(
				null
			).unwrap()
			const { errorCode } = olympicEventTicketData

			// 如果有登入且登入的帳號是以驗證過手機和信箱的：
			if (
				olympicEventTicketData &&
				!(
					olympicEventTicketData?.errorCode ===
					OlympicErrorCodeEnum.ProfileNotVerify
				)
			) {
				const {
					olympicEventPromotionMissionProgress: {
						depositAmount = 0,
						turnoverSum = 0,
					} = {},
					promotionMission: [
						{ depositAmount: missionDepositAmount = 0 } = {},
						{ turnoverAmount: missionTurnoverAmount = 0 } = {},
					] = [],
					availableGoldMetals,
				} = olympicEventTicketData

				// 取得玩家已存金額(deposit)與已玩有效流水(turnover)
				setUserMoneyData({
					deposit: numberFormat(depositAmount, currencyId, 0, true),
					turnover: numberFormat(turnoverSum, currencyId, 0, true),
				})

				// 達成目標所需總額
				setMissionTotal({
					totalDeposit: numberFormat(missionDepositAmount, currencyId, 0, true),
					totalTurnover: numberFormat(
						missionTurnoverAmount,
						currencyId,
						0,
						true
					),
				})

				// progress bar的完成比例
				setProgressPercentage({
					deposit: getProgressPercentage(depositAmount, missionDepositAmount),
					turnover: getProgressPercentage(turnoverSum, missionTurnoverAmount),
				})

				// 取得目前擁有金牌數量
				setAvailableGoldMetals(availableGoldMetals)
			}

			// 如果有登入但還未驗證手機跟信箱的狀態先跳出叮嚀訊息
			if (errorCode === OlympicErrorCodeEnum.ProfileNotVerify) {
				modal.info(t('Label_EuropeCup_Verify_Email_Phone'), {
					onOK: () => closeModal(),
				})
			}
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	// 用金牌兌換Bonus api
	const [setOlympicEventPrize] = useSetOlympicEventPrizeMutation()

	// 取得用戶兌換Bonus紀錄
	const {
		data: { data: custRedeemHistoryList = [] } = {},
		refetch: refetchCustRedeemHistoryList,
	} = useGetCustDrawPrizeListQuery(
		{
			eventId: EVENT_ID,
		},
		{
			skip: !isLogin,
		}
	)

	// 處理金牌兌換Bonus的function
	const handleRedeem = async (
		custId: number | undefined,
		usedGoldMetalCount: number,
		successModal: () => void,
		insufficientModal: () => void
	) => {
		const data = { custId: custId ?? 0, usedGoldMetalCount }

		// 未登入時想兌換會告知使用者需登入
		if (!isLogin) {
			if (
				Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) ===
				DeviceTypeEnum.Desktop
			) {
				modal.open(<LoginModal />)
			} else {
				push(`${paths.login.root}?from=${paths.olympic.root}`)
			}
			return
		}

		try {
			await setOlympicEventPrize(data).unwrap()

			// 如果成功用金牌兌換Bonus，就跳出對應的金額彈窗
			successModal()
			handleOlympicEventTicketData()
		} catch (error) {
			const { errorCode } = error as IAxiosError
			if (errorCode === OlympicErrorCodeEnum.BonusOngoing) {
				// 如果玩家身上還有Bonus未用完(含非奧運的Bonus)，跳錯誤警告訊息
				modal.error(t('Label_Olympic_Still_Running_Bonus'))
			} else {
				// 如果金牌數量不夠兌換該Bonus，跳出數量不足彈窗
				insufficientModal()
			}
		}
	}

	// 呼叫getOlympicEventTicket && GetCustDrawPrizeList api
	useEffect(() => {
		if (!isLogin) return
		handleOlympicEventTicketData() // 呼叫玩家目前資訊資料
		refetchCustRedeemHistoryList() // 重新取得玩家兌換紀錄
	}, [langId])

	const value = {
		availableGoldMetals,
		userMoneyData,
		missionTotal,
		progressPercentage,
		custRedeemHistoryList,
		handleRedeem,
	}
	return (
		<OlympicContext.Provider value={value}>{children}</OlympicContext.Provider>
	)
}

export type UseOlympicProps = ReturnType<typeof useOlympic>
