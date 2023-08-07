import { rootApi } from '@nx-next-app/service'
import { IAxiosResponse } from 'libs/web/src/service/axiosBaseQuery'
import { ISlotsGameData } from 'libs/web/src/service/gameApi/type'

export const gameApiUrl = {
	getSlotGamePage: 'Game/GetSlotGamePage',
}

export const gameApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getSlotGamePage: builder.query<
			IAxiosResponse<ISlotsGameData>,
			{ deviceType: number; currencyId: number }
		>({
			query: data => ({
				url: gameApiUrl.getSlotGamePage,
				method: 'POST',
				data,
			}),
			providesTags: ['SLOTS_GAME_DATA'],
		}),
	}),
})

export const { useGetSlotGamePageQuery } = gameApi
