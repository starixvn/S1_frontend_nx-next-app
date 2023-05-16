import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import { TpMaintainData } from './type'

export const siteApiUrl = {
	getTpMaintainList: 'Site/GetTpMaintainList',
	getPromotionListV3: 'Promotion/GetPromotionListV3',
}

export const siteApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		// * 獲取維護遊戲清單
		getTpMaintainList: builder.query<
			IAxiosResponse<TpMaintainData[]>,
			boolean | undefined
		>({
			query: () => ({
				url: siteApiUrl.getTpMaintainList,
				method: 'POST',
			}),
		}),
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

export const {
	useGetTpMaintainListQuery,
	useGetPromotionListV3Query,
	useLazyGetPromotionListV3Query,
} = siteApi
