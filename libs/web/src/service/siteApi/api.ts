import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'

export const siteApiUrl = {
	getPromotionListV3: 'Promotion/GetPromotionListV3',
}

export const siteApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getPromotionListV3: builder.query<
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			IAxiosResponse<any>,
			{ langId: string; currencyId: number; deviceType: number }
		>({
			query: ({ langId, ...data }) => ({
				url: `Promotion/GetPromotionListV3/${langId}`,
				method: 'POST',
				data,
			}),
			providesTags: ['AUTH_API_POST'],
		}),
	}),
})

export const { useGetPromotionListV3Query, useLazyGetPromotionListV3Query } =
	siteApi
