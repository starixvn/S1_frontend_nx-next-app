import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import type { ICupEventTicketData, IGetUserPollTicketArgs } from './type'

export const cupEventApiUrl = {
	getCupEventTicket: 'CupEvent/GetCupEventTicket',
	getUserPollTickets: 'CupEvent/UserPollTickets',
}

export const cupEventApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getCupEventTicket: builder.query<IAxiosResponse<ICupEventTicketData>, null>(
			{
				query: data => ({
					url: cupEventApiUrl.getCupEventTicket,
					method: 'POST',
					data,
				}),
				providesTags: ['EUROPE_CUP_EVENT_GET_TICKETS'],
			}
		),
		setUserPollTickets: builder.mutation<
			IAxiosResponse<void>,
			IGetUserPollTicketArgs[]
		>({
			query: data => ({
				url: cupEventApiUrl.getUserPollTickets,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['EUROPE_CUP_EVENT_GET_TICKETS'],
		}),
	}),
})

export const { useGetCupEventTicketQuery, useSetUserPollTicketsMutation } =
	cupEventApi
