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
	IGetLeaderBoardSettingArgs,
	IGetPredictionWinnerListArgs,
	ILeaderBoardMonthData,
	ILeaderBoardSettingData,
	IPromotionPredictScoreArgs,
	TGetPredictionWinnerListData,
	TPredictionTeamInfoData,
} from './type'

export const eventApiUrl = {
	getLeaderBoardListMonth: 'Events/GetLeaderboardListMonth',
	getLeaderBoardList: 'Events/GetLeaderboardList',
	getLeaderBoardSetting: 'Events/GetLeaderboardSetting',
	getCustRank: 'Events/GetCustRank',
	getCustRankMonth: 'Events/GetCustRankMonth',
	checkDrawPrize: 'Events/CheckDrawPrize',
	drawPrize: 'Events/DrawPrize',
	getDisplayDrawPrizeList: 'Events/GetDisplayDrawPrizeList',
	getCustDrawPrizeList: 'Events/GetCustDrawPrizeList',
	getPredictionTeamInfo: 'Events/GetPredictionTeamInfo',
	getPredictionWinnerList: 'Events/GetPredictionWinnerList',
	promotionPredictScore: 'Events/PromotionPredictScore',
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
		getLeaderBoardSetting: builder.query<
			IAxiosResponse<ILeaderBoardSettingData>,
			IGetLeaderBoardSettingArgs
		>({
			query: data => ({
				url: eventApiUrl.getLeaderBoardSetting,
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
			providesTags: ['LUCKY_WHEEL_DRAW_PRIZE', 'OLYMPIC_EVENT_GET_TICKETS'],
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
		// * 足球預測活動撈取隊伍資訊
		getPredictionTeamInfo: builder.query<
			IAxiosResponse<TPredictionTeamInfoData[]>,
			null
		>({
			query: () => ({
				url: eventApiUrl.getPredictionTeamInfo,
				method: 'POST',
			}),
		}),
		// * 足球預測活動撈取獲獎結果
		getPredictionWinnerList: builder.query<
			IAxiosResponse<TGetPredictionWinnerListData>,
			IGetPredictionWinnerListArgs
		>({
			query: data => ({
				url: eventApiUrl.getPredictionWinnerList,
				method: 'POST',
				data,
			}),
		}),
		// * 足球預測活動送出預測
		promotionPredictScore: builder.mutation<
			IAxiosResponse<void>,
			IPromotionPredictScoreArgs
		>({
			query: data => ({
				url: eventApiUrl.promotionPredictScore,
				method: 'POST',
				data,
			}),
			// * 更新隊伍相關資訊
		}),
	}),
})

export const {
	useLazyGetLeaderBoardListMonthQuery,
	useLazyGetLeaderBoardListQuery,
	useGetLeaderBoardSettingQuery,
	useLazyGetCustRankQuery,
	useLazyGetCustRankMonthQuery,
	useCheckDrawPrizeQuery,
	useGetDisplayDrawPrizeListQuery,
	useGetCustDrawPrizeListQuery,
	useDrawPrizeMutation,
	useGetPredictionTeamInfoQuery,
	useGetPredictionWinnerListQuery,
	usePromotionPredictScoreMutation,
} = eventsApi
