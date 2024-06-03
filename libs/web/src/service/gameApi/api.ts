import { SlotGameCategoryEnum } from '@nx-next-app/data-access'
import { rootApi } from '../rootApi/api'
import {
	IGetRecentlyViewedArgs,
	IRecentlyViewedData,
	ISlotsGameData,
	ILobbyHeaderData,
} from './type'
import { IAxiosResponse } from '../axiosBaseQuery'
import { getDeviceType } from '../../utils/client'

export const gameApiUrl = {
	getSlotGamePage: 'Game/GetSlotGamePage',
	getRecentlyViewed: 'Game/GetRecentlyViewed',
	getLobbyHeader: 'Game/GetLobbyHeader',
}

export const gameApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getSlotGamePage: builder.query<
			IAxiosResponse<ISlotsGameData>,
			{
				currencyId: number
				slotGameCategoryList?: SlotGameCategoryEnum[]
			}
		>({
			query: data => ({
				url: gameApiUrl.getSlotGamePage,
				method: 'POST',
				data: { deviceType: getDeviceType(), ...data },
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
				data: { deviceType: getDeviceType(), ...data },
			}),
		}),
		getLobbyHeader: builder.query<
			IAxiosResponse<ILobbyHeaderData[]>,
			{
				siteId: number
				currencyId: number
			}
		>({
			query: data => ({
				url: gameApiUrl.getLobbyHeader,
				method: 'POST',
				data,
			}),
		}),
	}),
})

export const {
	useGetSlotGamePageQuery,
	useGetRecentlyViewedQuery,
	useGetLobbyHeaderQuery,
} = gameApi
