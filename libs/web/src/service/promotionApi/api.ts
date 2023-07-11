import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import {
	IGetPromotionDetailArgs,
	IPromotionData,
} from 'libs/web/src/service/promotionApi/type'

export const promotionApiUrl = {
	getPromotionListV3: 'Promotion/GetPromotionListV3',
	getPromotionDetail: 'Promotion/GetPromotionDetail',
}

export const promotionApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getPromotionListV3: builder.query<
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			IAxiosResponse<any>,
			{ langId: string; currencyId: number; deviceType: number }
		>({
			query: ({ langId, ...data }) => ({
				url: `${promotionApiUrl.getPromotionListV3}/${langId}`,
				method: 'POST',
				data,
			}),
			providesTags: ['AUTH_API_POST'],
		}),
		getPromotionDetail: builder.query<
			IAxiosResponse<IPromotionData>,
			IGetPromotionDetailArgs
		>({
			query: ({ langId, ...data }) => ({
				url: `${promotionApiUrl.getPromotionDetail}/${langId}`,
				method: 'POST',
				data,
			}),
		}),
	}),
})

export const {
	useGetPromotionListV3Query,
	useLazyGetPromotionListV3Query,
	useLazyGetPromotionDetailQuery,
} = promotionApi
