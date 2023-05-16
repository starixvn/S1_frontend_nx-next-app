import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import { IUserInfoData } from './type'

export const accountStrictApiUrl = {
	getCustProfile: 'AccountStrict/GetCustProfile',
}

export const accountStrictApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getUserInfo: builder.query<
			IAxiosResponse<IUserInfoData | undefined>,
			null | boolean | undefined
		>({
			query: data => ({
				url: accountStrictApiUrl.getCustProfile,
				method: 'POST',
				data,
			}),
			providesTags: ['ACCOUNT_STRICT_GET_USER_INFO'],
		}),
	}),
})

export const { useGetUserInfoQuery } = accountStrictApi
