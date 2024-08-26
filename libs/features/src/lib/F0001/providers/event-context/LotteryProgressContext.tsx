import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { DEVICE_TYPE, PRIZE_CATEGORY_I18N_KEYS } from '@nx-next-app/constants'
import {
	ICustLotteryHistoryWinnerData,
	LotteryPrizeCategory,
} from '@nx-next-app/service'
import dayjs from 'dayjs'
import { findLastIndex, includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'
import DesktopPrizeModal from '@nx-next-app/features/F0001/desktop/event/lottery/modals/PrizeModal'
import MobilePrizeModal from '@nx-next-app/features/F0001/h5/event/lottery/modals/PrizeModal'
import { useLotteryDataContext } from './LotteryDataContext'

export enum StageEvent {
	'BeforeStart',
	'DrawingTop3',
	'DrawingConsolation',
	'DrawingSmall',
	'Drawing3rd1st2nd',
	'DrawingJackpot',
	'RunningNumbers',
	'PlayBootUpAnimation',
	'PlayStandbyAnimation',
	'PlayTicketPrintAnimation',
	'PlayTicketCutOffAnimation',
	'PlayShutdownAnimation',
	'FinalResult',
}

/** 各開獎階段事件 */
const stages: Set<StageEvent>[] = [
	[StageEvent.BeforeStart],
	[StageEvent.PlayBootUpAnimation],
	[StageEvent.DrawingTop3, StageEvent.PlayTicketPrintAnimation],
	[StageEvent.DrawingTop3, StageEvent.RunningNumbers],
	[
		StageEvent.DrawingTop3,
		StageEvent.RunningNumbers,
		StageEvent.PlayTicketCutOffAnimation,
	],
	[StageEvent.DrawingConsolation, StageEvent.PlayTicketPrintAnimation],
	[StageEvent.DrawingConsolation, StageEvent.RunningNumbers],
	[
		StageEvent.DrawingConsolation,
		StageEvent.RunningNumbers,
		StageEvent.PlayTicketCutOffAnimation,
	],
	[StageEvent.DrawingSmall, StageEvent.PlayTicketPrintAnimation],
	[StageEvent.DrawingSmall, StageEvent.RunningNumbers],
	[
		StageEvent.DrawingSmall,
		StageEvent.RunningNumbers,
		StageEvent.PlayTicketCutOffAnimation,
	],
	[StageEvent.Drawing3rd1st2nd, StageEvent.PlayTicketPrintAnimation],
	[StageEvent.Drawing3rd1st2nd, StageEvent.RunningNumbers],
	[StageEvent.DrawingJackpot, StageEvent.PlayTicketPrintAnimation],
	[StageEvent.DrawingJackpot, StageEvent.RunningNumbers],
	[
		StageEvent.DrawingJackpot,
		StageEvent.FinalResult,
		StageEvent.PlayTicketCutOffAnimation,
	],
	[
		StageEvent.DrawingJackpot,
		StageEvent.FinalResult,
		StageEvent.PlayShutdownAnimation,
	],
	[StageEvent.DrawingJackpot, StageEvent.FinalResult],
].map(events => new Set(events))

/**	預先錄製的各階段開始時間 */
const scheduledStageStarts = [
	-1, 0, 8988, 11112, 26276, 27558, 34773, 135994, 137274, 137288, 187863,
	189165, 189177, 204318, 211524, 213576, 214000, 217000,
]

interface IWiningStatus {
	ticket: string
	prize: string
}

interface ILotteryProgressContext {
	stage: Set<StageEvent>
	winning?: IWiningStatus | null
	remainingTickets: string[]
	runningNumberIndex: number
	toNext: () => void
	handleSlotNumberChange: (num: string) => void
	handleSlotNumberFinish: (
		announcedNumber: string,
		lotteryPrizeCategory?: LotteryPrizeCategory
	) => void
}

const LotteryProgressContext = createContext<ILotteryProgressContext>(
	{} as ILotteryProgressContext
)

export const LotteryProgressProvider = ({
	children,
}: {
	children: ReactNode
}) => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { reload } = useRouter()
	const { drawTime } = useLotteryDataContext()
	const [stageIndex, setStageIndex] = useState(0)

	const stage = stages[stageIndex]
	const [runningNumberIndex, setRunningNumberIndex] = useState(0)
	const toNext = () =>
		setStageIndex(prev => (prev < stages.length - 1 ? prev + 1 : 0))

	const { winnerList, drawingRound, isJackpot } = useLotteryDataContext()
	const tickets = winnerList?.ticketNo ?? []
	const [remainingTickets, setRemainingTickets] = useState<string[]>(tickets)
	const [winning, setWinning] = useState<null | IWiningStatus>(null)
	const handleSlotNumberChange = (num: string) =>
		setRemainingTickets(prev => prev.filter(number => number.endsWith(num)))

	const isDesktop =
		Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DEVICE_TYPE.Desktop

	const PrizeModal = isDesktop ? DesktopPrizeModal : MobilePrizeModal

	// 針對每次開完獎的號碼及獎項類別做處理，中獎彈窗
	const handleSlotNumberFinish = (
		announcedNumber: string,
		lotteryPrizeCategory?: LotteryPrizeCategory
	) => {
		setRunningNumberIndex(prev => prev + 1)

		// 若無中獎號碼則直接返回
		if (!includes(remainingTickets, announcedNumber)) return

		// 開始的前三獎不顯示是第幾獎，僅顯示為「前三獎」
		if (stage.has(StageEvent.DrawingTop3)) {
			setWinning({
				ticket: announcedNumber,
				prize: t('Label_Event_Top3PrizeTicket'),
			})
			return
		}

		if (!lotteryPrizeCategory) return
		setWinning({
			ticket: announcedNumber,
			prize: t(PRIZE_CATEGORY_I18N_KEYS[lotteryPrizeCategory]),
		})

		if (!drawingRound || !winnerList) return

		// 若中大獎則在大獎階段再另做處理彈窗
		if (isJackpot) return

		const prizeData: ICustLotteryHistoryWinnerData = {
			startDate: drawingRound.startDate,
			endDate: drawingRound.endDate,
			roundId: winnerList.roundId,
			lotteryPrizeCategory,
			jackpot: 0,
			ticketNo: announcedNumber,
			stickerId: winnerList.stickerId,
		}

		modal.open(<PrizeModal data={prizeData} />)
	}

	// 在播放印票動畫時，重置當前跑到第幾個數字
	useEffect(() => {
		if (stage.has(StageEvent.PlayTicketPrintAnimation)) setRunningNumberIndex(0)
	}, [stage])

	// 同步途中進場開獎進度
	useEffect(() => {
		if (!drawTime) return

		const timeElapsedSinceDrawStarted = dayjs().diff(drawTime)

		if (timeElapsedSinceDrawStarted <= 0) {
			const timer = setTimeout(reload, -timeElapsedSinceDrawStarted)
			return () => clearTimeout(timer)
		}

		const syncedStageIndex = findLastIndex(
			scheduledStageStarts,
			eachStageStart => timeElapsedSinceDrawStarted >= eachStageStart
		)

		const currentStage = stages[syncedStageIndex]

		// 用各開獎階段的時間差來計算開到第幾張票
		if (currentStage?.has(StageEvent.RunningNumbers)) {
			let numberOfWinningTickets = 0
			if (
				currentStage.has(StageEvent.DrawingTop3) ||
				currentStage.has(StageEvent.Drawing3rd1st2nd)
			) {
				numberOfWinningTickets = 3
			} else if (currentStage.has(StageEvent.DrawingConsolation)) {
				numberOfWinningTickets = winnerList?.consolationPrize?.length ?? 0
			} else if (currentStage.has(StageEvent.DrawingSmall)) {
				numberOfWinningTickets = winnerList?.smallPrize?.length ?? 0
			}

			const currentStageStart = scheduledStageStarts[syncedStageIndex]
			const nextStageStart = scheduledStageStarts[syncedStageIndex + 1]
			const currentStageDuration = nextStageStart - currentStageStart

			const timeElapsedSinceCurrentStageStarted =
				timeElapsedSinceDrawStarted - currentStageStart

			const stageCompletionRatio =
				timeElapsedSinceCurrentStageStarted / currentStageDuration

			const syncedRunningNumberIndex = Math.floor(
				numberOfWinningTickets * stageCompletionRatio
			)

			setRunningNumberIndex(syncedRunningNumberIndex)
		}

		setStageIndex(syncedStageIndex)
		return undefined
	}, [])

	// 控制開獎階段，當當前開獎數字跑完時進入下一階段
	useEffect(() => {
		if (!drawingRound || !winnerList) return

		if (
			isJackpot &&
			stage.has(StageEvent.FinalResult) &&
			stage.has(StageEvent.PlayShutdownAnimation)
		) {
			const prizeData: ICustLotteryHistoryWinnerData = {
				startDate: drawingRound.startDate,
				endDate: drawingRound.endDate,
				roundId: winnerList.roundId,
				jackpot: 1,
				lotteryPrizeCategory: LotteryPrizeCategory.FirstPrize,
				ticketNo: winnerList.firstPrize[0],
				stickerId: winnerList.stickerId,
			}
			modal.open(<PrizeModal data={prizeData} />)
			return
		}

		// 只在跑號碼時判斷是否進入下一階段
		if (!stage.has(StageEvent.RunningNumbers)) return

		// 若播放剪票動畫時則由動畫控制
		if (stage.has(StageEvent.PlayTicketCutOffAnimation)) return

		setRemainingTickets(tickets)

		let numberOfPrizeTickets
		if (stage.has(StageEvent.DrawingTop3)) {
			numberOfPrizeTickets = 3
		} else if (stage.has(StageEvent.DrawingConsolation)) {
			numberOfPrizeTickets = winnerList?.consolationPrize?.length ?? 0
		} else if (stage.has(StageEvent.DrawingSmall)) {
			numberOfPrizeTickets = winnerList?.smallPrize?.length ?? 0
		} else if (stage.has(StageEvent.Drawing3rd1st2nd)) {
			numberOfPrizeTickets = 3
		}

		if (numberOfPrizeTickets && runningNumberIndex >= numberOfPrizeTickets) {
			toNext()
		}

		if (stage.has(StageEvent.DrawingJackpot)) {
			const timer = setTimeout(toNext, 3000)
			return () => clearTimeout(timer)
		}

		return undefined
	}, [runningNumberIndex, stage, winnerList])

	const value = {
		stage,
		toNext,
		winning,
		remainingTickets,
		runningNumberIndex,
		handleSlotNumberChange,
		handleSlotNumberFinish,
	}

	return (
		<LotteryProgressContext.Provider value={value}>
			{children}
		</LotteryProgressContext.Provider>
	)
}

export const useLotteryProgressContext = () =>
	useContext(LotteryProgressContext)
