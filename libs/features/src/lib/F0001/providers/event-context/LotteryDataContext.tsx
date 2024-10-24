import {
	IChineseZodiacStickerData,
	ILotteryInfoData,
	ILotteryRoundData,
	ILotteryWinnerList,
	useGetChineseZodiacStickerListQuery,
	useGetLotteryInfoQuery,
	useGetLotteryMaintainQuery,
} from '@nx-next-app/service'
import { orderBy } from 'lodash-es'
import { ReactNode, createContext, useContext, useMemo } from 'react'

export interface ILotteryData {
	initialServerTime?: number | null
	winnerList?: ILotteryWinnerList | null
	drawingRound?: ILotteryRoundData | null
	roundList?: ILotteryRoundData[] | null
	isJackpot?: boolean
	isUnderMaintenance?: boolean
}

interface ILotteryDataContext extends ILotteryData {
	lotteryInfo?: ILotteryInfoData
	stickerInfo?: IChineseZodiacStickerData
	drawTime?: number | null
}

const LotteryDataContext = createContext<ILotteryDataContext>(
	{} as ILotteryDataContext
)

interface ILotteryProviderProps {
	children: ReactNode
	data: ILotteryData
}

export const LotteryDataProvider = ({
	children,
	data,
}: ILotteryProviderProps) => {
	const {
		winnerList,
		initialServerTime,
		drawingRound,
		roundList: originalRoundList,
	} = data || {}
	const { data: { data: lotteryInfo } = {} } = useGetLotteryInfoQuery(null)
	const { data: { data: stickerInfo } = {} } =
		useGetChineseZodiacStickerListQuery(null)
	const { data: { data: lotteryStatus } = {} } =
		useGetLotteryMaintainQuery(null)

	const isUnderMaintenance = Boolean(lotteryStatus?.isMaintain)

	const drawDate = drawingRound?.drawDate

	// 使用 server 的初始時間與抽獎開始的時間差來計算 client 的開獎時間，避免 client 時間與 server 時間不同步
	const drawTime = useMemo(() => {
		if (!drawDate || !initialServerTime) return null

		const currentTime = new Date().getTime()
		const timeTillDraw = new Date(drawDate).getTime() - initialServerTime

		return currentTime + timeTillDraw
	}, [drawDate, initialServerTime])

	const isJackpot = Boolean(
		winnerList?.ticketNo.includes(winnerList.firstPrize[0]) &&
			winnerList.stickerId === winnerList.custStickerId
	)

	const roundList = orderBy(originalRoundList, 'roundId', 'desc')

	const value = {
		drawingRound,
		lotteryInfo,
		stickerInfo,
		winnerList,
		roundList,
		drawTime,
		isJackpot,
		isUnderMaintenance,
	}

	return (
		<LotteryDataContext.Provider value={value}>
			{children}
		</LotteryDataContext.Provider>
	)
}

export const useLotteryDataContext = () => useContext(LotteryDataContext)
