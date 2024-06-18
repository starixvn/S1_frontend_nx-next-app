import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import type { IOlympicEventTicketData } from './type'

export const olympicEventApiUrl = {
	getOlympicEventTicket: 'OlympicEvent/GetOlympicEventTicket',
}

export const olympicEventApi = rootApi.injectEndpoints({
	endpoints: builder => ({
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
	}),
})

export const { useGetOlympicEventTicketQuery } = olympicEventApi
