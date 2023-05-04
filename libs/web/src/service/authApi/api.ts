import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import { ISignInArgs } from './type'

export const authApiUrl = {
	checkSignIn: 'Site/CheckSignIn',
	signIn: 'Site/SignIn',
	signOut: 'Account/SignOut',
}

export const authApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		// * 確認登入狀態
		checkSignIn: builder.query<IAxiosResponse<void>, null>({
			query: data => ({
				url: authApiUrl.checkSignIn,
				method: 'POST',
				data,
			}),
			providesTags: ['AUTH_API_POST'],
		}),
		// * 登入
		signIn: builder.mutation<IAxiosResponse<void>, ISignInArgs>({
			query: data => ({
				url: authApiUrl.signIn,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['AUTH_API_POST'],
		}),
		// * 登出
		signOut: builder.mutation<IAxiosResponse<void>, null>({
			query: data => ({
				url: authApiUrl.signOut,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['AUTH_API_POST'],
		}),
	}),
})

export const {
	useCheckSignInQuery,
	useLazyCheckSignInQuery,
	useSignInMutation,
	useSignOutMutation,
} = authApi
