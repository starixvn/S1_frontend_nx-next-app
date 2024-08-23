import {
	ChineseZodiacStickerId,
	ICustLotteryHistoryWinnerData,
	LotteryPrizeCategory,
} from '@nx-next-app/service'
import { useRouter } from 'next/router'
import LotteryPrize from './LotteryPrize'

export const LotteryPrizePage = () => {
	const { query } = useRouter()

	const data: ICustLotteryHistoryWinnerData = {
		startDate: String(query['startDate']),
		endDate: String(query['endDate']),
		roundId: Number(query['roundId']),
		ticketNo: String(query['ticketNo']),
		jackpot: Number(query['jackpot']) ? 1 : 0,
		stickerId: Number(query['stickerId']) as ChineseZodiacStickerId,
		lotteryPrizeCategory: Number(query['prize']) as LotteryPrizeCategory,
	}

	return <LotteryPrize data={data} />
}
