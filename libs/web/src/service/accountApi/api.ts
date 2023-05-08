import { rootApi } from '../rootApi/api'
import { IAxiosResponse } from '../axiosBaseQuery'
import { ISetLangArgs } from './type'

export const accountApiUrl = {
	setLang: 'Account/SetLanguage',
}

const accountApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		setLanguage: builder.mutation<IAxiosResponse<void>, ISetLangArgs>({
			query: data => ({
				url: accountApiUrl.setLang,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['ACCOUNT_STRICT_GET_USER_INFO'],
		}),
	}),
})

export const { useSetLanguageMutation } = accountApi
