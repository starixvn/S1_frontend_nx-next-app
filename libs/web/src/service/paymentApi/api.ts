import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import {
	IBankInfoSysData,
	IDepositInfoHistoryData,
	IGetDepositInfoHistoryArgs,
	IGetStatementArgs,
	IGetWithdrawalInfoHistoryArgs,
	IStatementData,
	IUploadReceiptArgs,
	IWithdrawalInfoHistoryData,
	ISupportCryptoInfo,
	IEWalletInfoSysData,
} from './type'

export const paymentApiUrl = {
	getDepositInfoHistory: 'Payment/GetDepositInfoHistory',
	getWithdrawalInfoHistory: 'Payment/GetWithdrawalInfoHistory',
	getStatement: 'Payment/GetStatement',
	uploadReceipt: 'Payment/UploadReceipt',
	setDepositCancel: 'Payment/SetDepositCancel',
	setWithdrawalCancel: 'Payment/SetWithdrawalCancel',
	getBankInfoSysList: 'Payment/GetBankInfoSysList',
	getSupportCryptoInfo: 'Payment/GetSupportCryptoInfo',
	getEWalletInfoSysList: 'Payment/GetEWalletInfoSysList',
}

export const paymentApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getDepositInfoHistory: builder.query<
			IAxiosResponse<IDepositInfoHistoryData[]>,
			IGetDepositInfoHistoryArgs
		>({
			query: data => ({
				url: paymentApiUrl.getDepositInfoHistory,
				method: 'POST',
				data,
			}),
			providesTags: ['PAYMENT_DEPOSIT_HISTORY'],
		}),
		getWithdrawalInfoHistory: builder.query<
			IAxiosResponse<IWithdrawalInfoHistoryData[]>,
			IGetWithdrawalInfoHistoryArgs
		>({
			query: data => ({
				url: paymentApiUrl.getWithdrawalInfoHistory,
				method: 'POST',
				data,
			}),
			providesTags: ['PAYMENT_WITHDRAWAL_HISTORY'],
		}),
		getStatement: builder.query<
			IAxiosResponse<IStatementData[]>,
			IGetStatementArgs
		>({
			query: data => ({
				url: paymentApiUrl.getStatement,
				method: 'POST',
				data,
			}),
		}),
		uploadReceipt: builder.mutation<IAxiosResponse<void>, IUploadReceiptArgs>({
			query: data => ({
				url: paymentApiUrl.uploadReceipt,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['PAYMENT_DEPOSIT_HISTORY'],
		}),
		setDepositCancel: builder.mutation<
			IAxiosResponse<void>,
			{ transId: string }
		>({
			query: data => ({
				url: paymentApiUrl.setDepositCancel,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['PAYMENT_DEPOSIT_HISTORY'],
		}),
		setWithdrawalCancel: builder.mutation<
			IAxiosResponse<void>,
			{ transId: string }
		>({
			query: data => ({
				url: paymentApiUrl.setWithdrawalCancel,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['PAYMENT_WITHDRAWAL_HISTORY'],
		}),
		getBankInfoSysList: builder.query<IAxiosResponse<IBankInfoSysData[]>, void>(
			{
				query: data => ({
					url: paymentApiUrl.getBankInfoSysList,
					method: 'POST',
					data,
				}),
			}
		),
		getSupportCryptoInfo: builder.query<
			IAxiosResponse<ISupportCryptoInfo>,
			void
		>({
			query: () => ({
				url: paymentApiUrl.getSupportCryptoInfo,
				method: 'POST',
			}),
			providesTags: ['ACCOUNT_GET_USER_CRYPTO_WALLET_INFO'],
		}),
		getEWalletInfoSysList: builder.query<
			IAxiosResponse<IEWalletInfoSysData[]>,
			void
		>({
			query: () => ({
				url: paymentApiUrl.getEWalletInfoSysList,
				method: 'POST',
			}),
			providesTags: ['ACCOUNT_GET_USER_EWALLET_INFO'],
		}),
	}),
})

export const {
	useLazyGetDepositInfoHistoryQuery,
	useLazyGetWithdrawalInfoHistoryQuery,
	useLazyGetStatementQuery,
	useGetBankInfoSysListQuery,
	useUploadReceiptMutation,
	useSetDepositCancelMutation,
	useSetWithdrawalCancelMutation,
	useGetSupportCryptoInfoQuery,
	useGetEWalletInfoSysListQuery,
} = paymentApi
