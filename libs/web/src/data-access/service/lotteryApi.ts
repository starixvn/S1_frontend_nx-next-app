import { AxiosRequestConfig } from 'axios'
import {
	baseAxios,
	eventApiUrl,
	ILotteryWinnerList,
	ILotteryRoundData,
} from '@nx-next-app/service'
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

		// API 的 drawDate 為抽獎開始時間，此處另外加上抽獎過程的緩衝時間以判斷是否顯示過程
		const drawDuration = 30 * 1000 * 60

		const now = new Date().getTime()

		let drawingRound
		let roundList
		let winnerList

		// lotteryRoundList 為降序排列，找到首個已開始且未結束的抽獎 drawDate 存入 activeDrawDate
		// 已結束及之後的抽獎紀錄則存入 drawHistory 並跳出迴圈
		for (let i = 0; i < lotteryRoundList.length; i++) {
			const round = lotteryRoundList[i]
			const roundStart = new Date(round.startDate).getTime()
			if (now > roundStart) {
				const drawEnd = new Date(round.drawDate).getTime() + drawDuration
				if (now <= drawEnd) {
					drawingRound = round
				} else {
					roundList = lotteryRoundList.slice(i)
					break
				}
			}
		}

		if (drawingRound) {
			const fiveMinutesBeforeDraw =
				new Date(drawingRound.drawDate).getTime() - 5 * 1000 * 60

			if (now > fiveMinutesBeforeDraw) {
				const response = await baseAxios.post<{
					data: ILotteryWinnerList
				}>(
					eventApiUrl.getLotteryWinnerList,
					{ siteId: Number(process.env['NEXT_PUBLIC_SITE_ID']) },
					config
				)
				winnerList = response?.data?.data
			}
		}

		return {
			initialServerTime: now,
			drawingRound: drawingRound ?? null,
			roundList: roundList ?? null,
			winnerList: winnerList ?? null,
		}
	} catch {
		return null
	}
}
