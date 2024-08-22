import {
	IChineseZodiacStickerData,
	ILotteryInfoData,
	ILotteryRoundData,
	ILotteryWinnerList,
	useGetChineseZodiacStickerListQuery,
	useGetLotteryInfoQuery,
} from '@nx-next-app/service'
import { createContext, ReactNode, useContext } from 'react'

export interface ILotteryData {
	initialServerTime?: number | null
	winnerList?: ILotteryWinnerList | null
	drawingRound?: ILotteryRoundData | null
	roundList?: ILotteryRoundData[] | null
	isJackpot?: boolean
}

interface ILotteryDataContext extends ILotteryData {
	lotteryInfo?: ILotteryInfoData
	stickerInfo?: IChineseZodiacStickerData
	drawTime?: number
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
	const { winnerList, initialServerTime, drawingRound, roundList } = data || {}
	const { data: { data: lotteryInfo } = {} } = useGetLotteryInfoQuery(null)
	const { data: { data: stickerInfo } = {} } =
		useGetChineseZodiacStickerListQuery(null)

	const drawDate = drawingRound?.drawDate

	let drawTime
	if (drawDate && initialServerTime) {
		const tillDraw = new Date(drawDate).getTime() - initialServerTime
		drawTime = new Date().getTime() + tillDraw
	}

	const isJackpot = Boolean(
		winnerList?.ticketNo.includes(winnerList.firstPrize[0]) &&
			winnerList.stickerId === winnerList.custStickerId
	)

	const value = {
		drawingRound,
		lotteryInfo,
		stickerInfo,
		winnerList,
		roundList,
		drawTime,
		isJackpot,
	}

	return (
		<LotteryDataContext.Provider value={value}>
			{children}
		</LotteryDataContext.Provider>
	)
}

export const useLotteryDataContext = () => useContext(LotteryDataContext)
