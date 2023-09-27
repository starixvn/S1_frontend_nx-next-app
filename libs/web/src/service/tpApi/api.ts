import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import {
	IGetTransferHistoryArgs,
	IGotoGameArg,
	ITransferHistoryData,
	ITransferArgs,
	ITransferData,
} from './type'

export const tpApiUrl = {
	gotoGame: 'Tp/GotoGame',
	getTransferHistory: 'Tp/GetTransferHistory',
	transfer: 'Tp/TransferEX',
	getTransferRecent: 'Tp/GetTransferRecent',
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
		transfer: builder.mutation<IAxiosResponse<ITransferData>, ITransferArgs>({
			query: data => ({
				url: tpApiUrl.transfer,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['TP_GET_TRANSFER_INFO'],
		}),
		getTransferRecent: builder.query<
			IAxiosResponse<ITransferHistoryData[]>,
			void
		>({
			query: () => ({
				url: tpApiUrl.getTransferRecent,
				method: 'POST',
			}),
			providesTags: ['TP_GET_TRANSFER_INFO'],
		}),
	}),
})

export const {
	useLazyGotoGameQuery,
	useLazyGetTransferHistoryQuery,
	useTransferMutation,
	useGetTransferRecentQuery,
	// useLazyGetTransferRecentQuery,
} = tpApi
