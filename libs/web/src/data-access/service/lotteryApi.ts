import { ILotteryData } from '@nx-next-app/features/F0001/providers/event-context'
import {
	baseAxios,
	eventApiUrl,
	ILotteryRoundData,
	ILotteryWinnerList,
} from '@nx-next-app/service'
import { AxiosRequestConfig } from 'axios'
import dayjs from 'dayjs'
import { filter, find } from 'lodash-es'

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

		let winnerList

		// 開獎時間由 API 提供，結束時間為當日午夜
		// lotteryRoundList 為照 drawDate 降序排列，將首個已開始且未結束的開獎 round 資訊存入 drawingRound
		// 將更後面的 rounds 視為已結束的抽獎紀錄，存入 drawHistory 並跳出迴圈

		const drawingRound = find(lotteryRoundList, ({ startDate, drawDate }) => {
			const roundStart = dayjs(startDate)
			const drawEnd = dayjs(drawDate).add(1, 'day').startOf('day')
			return now.isAfter(roundStart) && now.isBefore(drawEnd)
		})

		const roundList = filter(lotteryRoundList, ({ drawDate }) => {
			const drawEnd = dayjs(drawDate).add(20, 'minute')
			return now.isAfter(drawEnd)
		})

		// 有正在進行的開獎才會撈取中獎名單，保險預留 5 分鐘
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

				const data = response?.data?.data

				// 確保中獎名單是當前開獎的
				if (data?.roundId === drawingRound.roundId) {
					winnerList = data
				}
			}
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
