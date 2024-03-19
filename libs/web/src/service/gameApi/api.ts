import { SlotGameCategoryEnum } from '@nx-next-app/data-access'
import { rootApi } from '../rootApi/api'
import {
	IGetRecentlyViewedArgs,
	IRecentlyViewedData,
	ISlotsGameData,
} from './type'
import { IAxiosResponse } from '../axiosBaseQuery'

export const gameApiUrl = {
	getSlotGamePage: 'Game/GetSlotGamePage',
	getRecentlyViewed: 'Game/GetRecentlyViewed',
}

export const gameApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getSlotGamePage: builder.query<
			IAxiosResponse<ISlotsGameData>,
			{
				deviceType: number
				currencyId: number
				slotGameCategoryList?: SlotGameCategoryEnum[]
			}
		>({
			query: data => ({
				url: gameApiUrl.getSlotGamePage,
				method: 'POST',
				data,
			}),
			providesTags: ['SLOTS_GAME_DATA'],
		}),
		getRecentlyViewed: builder.query<
			IAxiosResponse<IRecentlyViewedData>,
			IGetRecentlyViewedArgs
		>({
			query: data => ({
				url: gameApiUrl.getRecentlyViewed,
				method: 'POST',
				data,
			}),
		}),
	}),
})

export const { useGetSlotGamePageQuery, useGetRecentlyViewedQuery } = gameApi
