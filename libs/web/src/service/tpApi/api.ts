import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import { IGotoGameArg } from './type'

export const tpApiUrl = {
	gotoGame: 'Tp/GotoGame',
}

export const tpApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		gotoGame: builder.query<IAxiosResponse<boolean>, IGotoGameArg>({
			query: data => ({
				url: tpApiUrl.gotoGame,
				method: 'POST',
				data,
			}),
		}),
	}),
})

export const { useLazyGotoGameQuery } = tpApi
