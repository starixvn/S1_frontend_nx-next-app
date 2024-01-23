import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import { IGetDataListArgs, ILiveStreamingData } from './type'

export const liveStreamingApi = rootApi.injectEndpoints({
	endpoints: build => ({
		getDataList: build.query<
			IAxiosResponse<ILiveStreamingData[]>,
			IGetDataListArgs
		>({
			query: ({ langId, currencyId }) => ({
				url: `LiveStreaming/GetDataList/${langId}`,
				method: 'POST',
				data: { currencyId },
			}),
		}),
	}),
})

export const { useLazyGetDataListQuery } = liveStreamingApi
