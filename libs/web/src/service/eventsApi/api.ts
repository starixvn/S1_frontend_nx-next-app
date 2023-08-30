import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import {
	ICheckDrawPrizeData,
	ICustDrawPrizeData,
	ICustRankData,
	ICustRankMonthData,
	IDisplayDrawPrizeData,
	IGetCustRankArgs,
	IGetCustRankMonthArgs,
	IGetLeaderBoardData,
	IGetLeaderBoardListArgs,
	IGetLeaderBoardListMonthArgs,
	ILeaderBoardMonthData,
} from './type'

export const eventApiUrl = {
	getLeaderBoardListMonth: 'Events/GetLeaderboardListMonth',
	getLeaderBoardList: 'Events/GetLeaderboardList',
	getCustRank: 'Events/GetCustRank',
	getCustRankMonth: 'Events/GetCustRankMonth',
	checkDrawPrize: 'Events/CheckDrawPrize',
	drawPrize: 'Events/DrawPrize',
	getDisplayDrawPrizeList: 'Events/GetDisplayDrawPrizeList',
	getCustDrawPrizeList: 'Events/GetCustDrawPrizeList',
}

export const eventsApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getLeaderBoardListMonth: builder.query<
			IAxiosResponse<ILeaderBoardMonthData[]>,
			IGetLeaderBoardListMonthArgs
		>({
			query: data => ({
				url: eventApiUrl.getLeaderBoardListMonth,
				method: 'POST',
				data,
			}),
		}),
		getLeaderBoardList: builder.query<
			IAxiosResponse<IGetLeaderBoardData[]>,
			IGetLeaderBoardListArgs
		>({
			query: data => ({
				url: eventApiUrl.getLeaderBoardList,
				method: 'POST',
				data,
			}),
		}),
		getCustRank: builder.query<IAxiosResponse<ICustRankData>, IGetCustRankArgs>(
			{
				query: data => ({
					url: eventApiUrl.getCustRank,
					method: 'POST',
					data,
				}),
			}
		),
		getCustRankMonth: builder.query<
			IAxiosResponse<ICustRankMonthData>,
			IGetCustRankMonthArgs
		>({
			query: data => ({
				url: eventApiUrl.getCustRankMonth,
				method: 'POST',
				data,
			}),
		}),
		// * 幸運輪盤獎項清單
		getDisplayDrawPrizeList: builder.query<
			IAxiosResponse<IDisplayDrawPrizeData[]>,
			{ eventId: number }
		>({
			query: data => ({
				url: eventApiUrl.getDisplayDrawPrizeList,
				method: 'POST',
				data,
			}),
		}),
		// * 幸運輪盤抽獎紀錄
		getCustDrawPrizeList: builder.query<
			IAxiosResponse<ICustDrawPrizeData[]>,
			{ eventId: number }
		>({
			query: data => ({
				url: eventApiUrl.getCustDrawPrizeList,
				method: 'POST',
				data,
			}),
			providesTags: ['LUCKY_WHEEL_DRAW_PRIZE'],
		}),
		// * 當前使用者抽獎資格
		checkDrawPrize: builder.query<
			IAxiosResponse<ICheckDrawPrizeData>,
			{ eventId: number }
		>({
			query: data => ({
				url: eventApiUrl.checkDrawPrize,
				method: 'POST',
				data,
			}),
			providesTags: ['LUCKY_WHEEL_DRAW_PRIZE'],
		}),
		// * 抽獎
		drawPrize: builder.mutation<
			IAxiosResponse<{
				jackpot: number
				prizeId: number
				prizeName: string | null
				ticketCount: number
			}>,
			{ eventId: number }
		>({
			query: data => ({
				url: eventApiUrl.drawPrize,
				method: 'POST',
				data,
			}),
			// * 更新 幸運輪盤抽獎紀錄 和 當前使用者抽獎資格
			invalidatesTags: ['LUCKY_WHEEL_DRAW_PRIZE'],
		}),
	}),
})

export const {
	useLazyGetLeaderBoardListMonthQuery,
	useLazyGetLeaderBoardListQuery,
	useLazyGetCustRankQuery,
	useLazyGetCustRankMonthQuery,
	useCheckDrawPrizeQuery,
	useGetDisplayDrawPrizeListQuery,
	useGetCustDrawPrizeListQuery,
	useDrawPrizeMutation,
} = eventsApi
