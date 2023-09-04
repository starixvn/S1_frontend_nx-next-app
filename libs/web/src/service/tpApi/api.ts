import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import {
	IGetTransferHistoryArgs,
	IGotoGameArg,
	ITransferHistoryData,
} from './type'

export const tpApiUrl = {
	gotoGame: 'Tp/GotoGame',
	getTransferHistory: 'Tp/GetTransferHistory',
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
		getTransferHistory: builder.query<
			IAxiosResponse<ITransferHistoryData[]>,
			IGetTransferHistoryArgs
		>({
			query: data => ({
				url: tpApiUrl.getTransferHistory,
				method: 'POST',
				data,
			}),
		}),
	}),
})

export const { useLazyGotoGameQuery, useLazyGetTransferHistoryQuery } = tpApi
