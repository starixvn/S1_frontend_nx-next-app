import { IAxiosResponse, rootApi } from '@nx-next-app/service'
import { IGetHotEventListArgs, IHotEventData } from './type'

export const hotEventApiUrl = {
	getHotEventList: 'HotEvent/GetDataList',
}

export const hotEventApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		// * 首頁 hotEvent
		getHotEventList: builder.query<
			IAxiosResponse<IHotEventData[]>,
			IGetHotEventListArgs
		>({
			query: ({ langId }) => ({
				url: `${hotEventApiUrl.getHotEventList}/${langId}`,
				method: 'POST',
			}),
		}),
	}),
})

export const { useGetHotEventListQuery } = hotEventApi
