import { ILotteryData } from '@nx-next-app/features/F0001/providers/event-context'
import {
	baseAxios,
	eventApiUrl,
	ILotteryRoundData,
	ILotteryWinnerList,
} from '@nx-next-app/service'
import { AxiosRequestConfig } from 'axios'
import dayjs from 'dayjs'
import { filter, find, sortBy } from 'lodash-es'

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

		const originalRoundList = response.data.data ?? []

		const now = dayjs()

		// 找出已開始，開獎當日結束前最近的輪次作為當前開獎輪次
		const drawingRound =
			find(
				sortBy(originalRoundList, 'drawDate'),
				({ startDate, drawDate }) =>
					now.isAfter(dayjs(startDate)) &&
					now.isBefore(dayjs(drawDate).endOf('day'))
			) ?? null

		// 原始輪次列表過濾尚未開獎的輪次  (以開獎時間 + 20 分鐘作為開獎結束時間)
		const roundList = filter(originalRoundList, ({ drawDate }) =>
			now.isAfter(dayjs(drawDate).add(20, 'minute'))
		)

		// 開獎前 5 分鐘才會撈取中獎名單
		let winnerList = null
		if (
			drawingRound &&
			now.isAfter(dayjs(drawingRound.drawDate).subtract(5, 'minute'))
		) {
			const response = await baseAxios.post<{
				data: ILotteryWinnerList
			}>(
				eventApiUrl.getLotteryWinnerList,
				{ siteId: Number(process.env['NEXT_PUBLIC_SITE_ID']) },
				config
			)

			const data = response?.data?.data

			// 確保該中獎名單是當前開獎的
			if (data?.roundId === drawingRound.roundId) {
				winnerList = data
			}
		}

		return {
			drawingRound,
			roundList,
			winnerList,
			initialServerTime: dayjs().valueOf(),
		}
	} catch {
		return null
	}
}
