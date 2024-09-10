import {
	IChineseZodiacStickerData,
	ILotteryInfoData,
	ILotteryRoundData,
	ILotteryWinnerList,
	useGetChineseZodiacStickerListQuery,
	useGetLotteryInfoQuery,
	useGetLotteryMaintainQuery,
} from '@nx-next-app/service'
import { ReactNode, createContext, useContext } from 'react'

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
	const { data: { data: lotteryStatus } = {} } =
		useGetLotteryMaintainQuery(null)

	const isUnderMaintenance = Boolean(lotteryStatus?.isMaintain)

	const drawDate = drawingRound?.drawDate

	let drawTime

	// 使用 server 的初始時間與抽獎開始的時間差來計算 client 的開獎時間，避免 client 時間與 server 時間不同步
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
		isUnderMaintenance,
	}

	return (
		<LotteryDataContext.Provider value={value}>
			{children}
		</LotteryDataContext.Provider>
	)
}

export const useLotteryDataContext = () => useContext(LotteryDataContext)
