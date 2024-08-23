import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import {
	IBuyChineseZodiacStickerArgs,
	ICheckDrawPrizeData,
	IChineseZodiacStickerData,
	ICustDrawPrizeData,
	ICustLotteryHistoryWinnerData,
	ICustRankData,
	ICustRankMonthData,
	IDisplayDrawPrizeData,
	IGetCustRankArgs,
	IGetCustRankMonthArgs,
	IGetLeaderBoardData,
	IGetLeaderBoardListArgs,
	IGetLeaderBoardListMonthArgs,
	IGetLeaderBoardSettingArgs,
	IGetLotteryHistoryWinnerArgs,
	ILeaderBoardMonthData,
	ILeaderBoardSettingData,
	ILotteryInfoData,
	ILotteryMaintainData,
	ILotteryRoundData,
	ILotteryWinnerList,
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
	getLotteryInfo: 'Events/GetLotteryInfo',
	getChineseZodiacStickerList: 'Events/GetChineseZodiacStickerList',
	buyChineseZodiacSticker: 'Events/BuyChineseZodiacSticker',
	getLotteryWinnerList: 'Events/GetCurrentLotteryWinnerList',
	getLotteryHistoryWinnerList: 'Events/GetLotteryHistoryWinnerList',
	getLotteryRoundList: 'Events/GetLotteryRoundList',
	getCustLotteryHistoryWinnerList: 'Events/GetCustLotteryHistoryWinnerList',
	getLotteryMaintain: 'Events/GetLotteryMaintain',
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
		getLotteryInfo: builder.query<IAxiosResponse<ILotteryInfoData>, null>({
			query: () => ({
				url: eventApiUrl.getLotteryInfo,
				method: 'POST',
			}),
		}),
		getChineseZodiacStickerList: builder.query<
			IAxiosResponse<IChineseZodiacStickerData>,
			null
		>({
			query: () => ({
				url: eventApiUrl.getChineseZodiacStickerList,
				method: 'POST',
			}),
			providesTags: ['LOTTERY_EVENT_GET_STICKER'],
		}),
		buyChineseZodiacSticker: builder.mutation<
			IAxiosResponse<null>,
			IBuyChineseZodiacStickerArgs
		>({
			query: data => ({
				url: eventApiUrl.buyChineseZodiacSticker,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['LOTTERY_EVENT_GET_STICKER'],
		}),
		getLotteryWinnerList: builder.query<
			IAxiosResponse<ILotteryWinnerList>,
			null
		>({
			query: () => ({
				url: eventApiUrl.getLotteryWinnerList,
				method: 'POST',
				data: { siteId: Number(process.env['NEXT_PUBLIC_SITE_ID']) },
			}),
		}),
		getLotteryHistoryWinnerList: builder.query<
			IAxiosResponse<ILotteryWinnerList>,
			IGetLotteryHistoryWinnerArgs
		>({
			query: ({ roundId }) => ({
				url: eventApiUrl.getLotteryHistoryWinnerList,
				method: 'POST',
				data: { siteId: Number(process.env['NEXT_PUBLIC_SITE_ID']), roundId },
			}),
		}),
		getLotteryRoundList: builder.query<
			IAxiosResponse<ILotteryRoundData[]>,
			null
		>({
			query: () => ({
				url: eventApiUrl.getLotteryRoundList,
				method: 'POST',
			}),
		}),
		getCustLotteryHistoryWinnerList: builder.query<
			IAxiosResponse<ICustLotteryHistoryWinnerData[]>,
			null
		>({
			query: () => ({
				url: eventApiUrl.getCustLotteryHistoryWinnerList,
				method: 'POST',
			}),
		}),
		getLotteryMaintain: builder.query<
			IAxiosResponse<ILotteryMaintainData>,
			null
		>({
			query: () => ({
				url: eventApiUrl.getLotteryMaintain,
				method: 'POST',
			}),
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
	useGetLotteryInfoQuery,
	useGetChineseZodiacStickerListQuery,
	useBuyChineseZodiacStickerMutation,
	useGetLotteryHistoryWinnerListQuery,
	useGetCustLotteryHistoryWinnerListQuery,
	useGetLotteryMaintainQuery,
} = eventsApi
