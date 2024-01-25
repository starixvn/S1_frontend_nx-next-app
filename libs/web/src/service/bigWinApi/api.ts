import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import { IGetPopUpDataListArgs, IPopUpData } from './type'

export const bigWinApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getPopUpDataList: builder.query<
			IAxiosResponse<IPopUpData>,
			IGetPopUpDataListArgs
		>({
			query: data => ({
				url: 'BigWin/GetPopUpDataList',
				method: 'POST',
				data,
			}),
		}),
	}),
})

export const { useLazyGetPopUpDataListQuery } = bigWinApi
