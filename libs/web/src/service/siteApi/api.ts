import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import { ISetForgetPasswordArgs, TpMaintainData } from './type'

export const siteApiUrl = {
	getTpIds: 'Site/GetTpIds',
	getTpMaintainList: 'Site/GetTpMaintainList',
	getSEOData: 'Site/Seo',
	forgetPassword: 'Site/ForgetPwdV2',
}

export const siteApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		// * 產品權限清單
		getProductTpIds: builder.query<IAxiosResponse<number[]>, null>({
			query: () => ({
				url: siteApiUrl.getTpIds,
				method: 'POST',
			}),
		}),
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
		setForgetPassword: builder.mutation<
			IAxiosResponse<void>,
			ISetForgetPasswordArgs
		>({
			query: ({ langId, ...data }) => ({
				url: `${siteApiUrl.forgetPassword}/${langId}`,
				method: 'POST',
				data,
			}),
		}),
	}),
})

export const {
	useGetProductTpIdsQuery,
	useGetTpMaintainListQuery,
	useSetForgetPasswordMutation,
} = siteApi
