import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import type { IGetOlympicEventPrizeArgs, IOlympicEventTicketData } from './type'

export const olympicEventApiUrl = {
	getOlympicEventTicket: 'OlympicEvent/GetOlympicEventTicket',
	getOlympicEventPrize: 'OlympicEvent/ClaimOlympicEventPrize',
}

export const olympicEventApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		// 得到該玩家擁有的奧運資訊（如：已有金牌  儲值多少  有效流水多少等．．．）
		getOlympicEventTicket: builder.query<
			IAxiosResponse<IOlympicEventTicketData>,
			null
		>({
			query: data => ({
				url: olympicEventApiUrl.getOlympicEventTicket,
				method: 'POST',
				data,
			}),
			providesTags: ['OLYMPIC_EVENT_GET_TICKETS'],
		}),
		// 點下“Redeem”要用金牌兌換Bonus的mutation
		setOlympicEventPrize: builder.mutation<
			IAxiosResponse<void>,
			IGetOlympicEventPrizeArgs
		>({
			query: data => ({
				url: olympicEventApiUrl.getOlympicEventPrize,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['OLYMPIC_EVENT_GET_TICKETS'],
		}),
	}),
})

export const {
	useGetOlympicEventTicketQuery,
	useSetOlympicEventPrizeMutation,
} = olympicEventApi
