import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import {
	ICustRankData,
	ICustRankMonthData,
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
	}),
})

export const {
	useLazyGetLeaderBoardListMonthQuery,
	useLazyGetLeaderBoardListQuery,
	useLazyGetCustRankQuery,
	useLazyGetCustRankMonthQuery,
} = eventsApi
