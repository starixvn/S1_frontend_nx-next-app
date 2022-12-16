import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'

export const siteApiUrl = {
	checkSignIn: 'site/CheckSignIn',
}

export const siteApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		checkSignIn: builder.query<IAxiosResponse<void>, null>({
			query: data => ({
				url: siteApiUrl.checkSignIn,
				method: 'POST',
				data,
			}),
		}),
	}),
})

export const { useCheckSignInQuery } = siteApi
