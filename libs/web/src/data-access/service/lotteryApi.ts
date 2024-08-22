import {
	baseAxios,
	eventApiUrl,
	ILotteryRoundData,
	ILotteryWinnerList,
} from '@nx-next-app/service'
import { AxiosRequestConfig } from 'axios'
import dayjs from 'dayjs'
import { ILotteryData } from '../../../../features/src/lib/F0001/providers/event-context'

export const getCustomLotteryDataForClient = async (
	config?: AxiosRequestConfig
): Promise<ILotteryData | null> => {
	try {
		const response = await baseAxios.post<{
			data: ILotteryRoundData[]
		}>(
			eventApiUrl.getLotteryRoundList,
			{ siteId: Number(process.env['NEXT_PUBLIC_SITE_ID']) },
			config
		)

		const lotteryRoundList = response.data.data

		const now = dayjs()

		let drawingRound
		let roundList
		let winnerList

		// mock

		// lotteryRoundList.unshift({
		// 	siteId: 1,
		// 	roundId: 3,
		// 	startDate: '2024-08-15T00:00:00+08:00',
		// 	endDate: '2024-08-30T23:59:59+08:00',
		// 	drawDate: '2024-08-22T12:59:59+08:00',
		// })

		// lotteryRoundList 為降序排列，找到首個已開始且未過開獎日午夜的抽獎 drawDate 存入 activeDrawDate
		// 已結束及之後的抽獎紀錄則存入 drawHistory 並跳出迴圈
		for (let i = 0; i < lotteryRoundList.length; i++) {
			const round = lotteryRoundList[i]
			const roundStart = dayjs(round.startDate)
			if (now.isAfter(roundStart)) {
				const drawStart = dayjs(round.drawDate)
				const midnight = drawStart.add(1, 'day').startOf('day')
				if (now.isBefore(midnight)) {
					drawingRound = round
				} else {
					roundList = lotteryRoundList.slice(i)
					break
				}
			}
		}

		if (drawingRound) {
			const fiveMinutesBeforeDraw = dayjs(drawingRound.drawDate).subtract(
				5,
				'minute'
			)
			if (now.isAfter(fiveMinutesBeforeDraw)) {
				const response = await baseAxios.post<{
					data: ILotteryWinnerList
				}>(
					eventApiUrl.getLotteryWinnerList,
					{ siteId: Number(process.env['NEXT_PUBLIC_SITE_ID']) },
					config
				)
				winnerList = response?.data?.data
			}

			// mock

			// if (winnerList) {
			// 	winnerList.ticketNo = [
			// 		'6747217517',
			// 		'6290547940',
			// 		'8144034719',
			// 		'4641792566',
			// 	]
			// 	winnerList.stickerId = 9
			// 	winnerList.custStickerId = 9
			// }
		}

		return {
			initialServerTime: now.valueOf(),
			drawingRound: drawingRound ?? null,
			roundList: roundList ?? null,
			winnerList: winnerList ?? null,
		}
	} catch {
		return null
	}
}
