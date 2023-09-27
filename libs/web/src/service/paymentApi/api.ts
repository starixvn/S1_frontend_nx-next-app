import { rootApi } from '../rootApi/api'
import { IAxiosResponse } from '../axiosBaseQuery'
import {
	IEWalletInfoData,
	IExchangeInfoData,
	IGetExchangeInfoArgs,
	ISubmitCryptoWithdrawalArgs,
	ISubmitWithdrawalArgs,
	IWithdrawalLimitData,
	IWithdrawalRecentInfoData,
	IGetStatementArgs,
	IBankInfoSysData,
	ICustTpBetRecordDetailListbyGameTypeArgs,
	ICustTpBetRecordDetailListbyGameTypeData,
	ICustTpBetRecordListbyCategoryIdArgs,
	ICustTpBetRecordListbyCategoryIdData,
	ICustTpBetRecordListDateRangeArgs,
	ICustTpBetRecordListDateRangeData,
	ICustTpBetRecordListOneDayArgs,
	ICustTpBetRecordListOneDayData,
	IDepositInfoHistoryData,
	IGetDepositInfoHistoryArgs,
	IWithdrawalInfoHistoryData,
	IGetWithdrawalInfoHistoryArgs,
	IStatementData,
	IUploadReceiptArgs,
	ISupportCryptoInfo,
} from './type'

export const paymentApiUrl = {
	kycCheck: 'Payment/KycCheck',
	getWithdrawalRecentInfo: 'Payment/GetWithdrawalInfoRecent',
	getWithdrawalLimit: 'Payment/GetWithdrawalLimit',
	setWithdrawalCancel: 'Payment/SetWithdrawalCancel',
	getBankInfoSysList: 'Payment/GetBankInfoSysList',
	getEWalletInfoSysList: 'Payment/GetEWalletInfoSysList',
	getSupportCryptoInfo: 'Payment/GetSupportCryptoInfo',
	getExchangeInfo: 'Payment/GetExchangeInfo',
	getDepositInfoHistory: 'Payment/GetDepositInfoHistory',
	getWithdrawalInfoHistory: 'Payment/GetWithdrawalInfoHistory',
	getStatement: 'Payment/GetStatement',
	getCustTpBetRecordListDateRange: 'Payment/CustTpBetRecordListDateRange',
	getGetCustTpBetRecordListOneDay: 'Payment/GetCustTpBetRecordListOneDay',
	getCustTpBetRecordListbyCategoryId:
		'Payment/GetCustTpBetRecordListbyCategoryId',
	getCustTpBetRecordDetailListbyGameType:
		'Payment/GetCustTpBetRecordDetailListbyGameType',
	uploadReceipt: 'Payment/UploadReceipt',
	setDepositCancel: 'Payment/SetDepositCancel',
	// local bank 等正常 withdrawal
	withdrawalReq: 'Payment/WithdrawalReq',
	// EWallet withdrawal
	withdrawalEWallet: 'Payment/WithdrawalEWalletReq',
	// Crypto withdrawal
	withdrawalCrypto: 'Payment/WithdrawalCryptoReq',
}

const paymentApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		kycCheck: builder.query<IAxiosResponse<null>, null>({
			query: () => ({
				url: paymentApiUrl.kycCheck,
				method: 'POST',
			}),
		}),
		getWithdrawalRecentInfo: builder.query<
			IAxiosResponse<IWithdrawalRecentInfoData[]>,
			null
		>({
			query: () => ({
				url: paymentApiUrl.getWithdrawalRecentInfo,
				method: 'POST',
			}),
			providesTags: ['WITHDRAWAL_API_POST'],
		}),
		getWithdrawalLimit: builder.query<
			IAxiosResponse<IWithdrawalLimitData>,
			null
		>({
			query: () => ({
				url: paymentApiUrl.getWithdrawalLimit,
				method: 'POST',
			}),
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
			invalidatesTags: ['WITHDRAWAL_API_POST', 'PAYMENT_WITHDRAWAL_HISTORY'],
		}),
		getBankInfoSysList: builder.query<IAxiosResponse<IBankInfoSysData[]>, null>(
			{
				query: () => ({
					url: paymentApiUrl.getBankInfoSysList,
					method: 'POST',
				}),
			}
		),
		getEWalletInfoList: builder.query<IAxiosResponse<IEWalletInfoData[]>, null>(
			{
				query: () => ({
					url: paymentApiUrl.getEWalletInfoSysList,
					method: 'POST',
				}),
			}
		),
		getExchangeInfo: builder.query<
			IAxiosResponse<IExchangeInfoData>,
			IGetExchangeInfoArgs
		>({
			query: data => ({
				url: paymentApiUrl.getExchangeInfo,
				method: 'POST',
				data,
			}),
		}),
		submitWithdrawal: builder.mutation<
			IAxiosResponse<void>,
			ISubmitWithdrawalArgs
		>({
			query: data => ({
				url: paymentApiUrl.withdrawalReq,
				method: 'POST',
				data,
			}),
		}),
		submitEWalletWithdrawal: builder.mutation<
			IAxiosResponse<void>,
			ISubmitWithdrawalArgs
		>({
			query: data => ({
				url: paymentApiUrl.withdrawalEWallet,
				method: 'POST',
				data,
			}),
		}),
		submitCryptoWithdrawal: builder.mutation<
			IAxiosResponse<void>,
			ISubmitCryptoWithdrawalArgs
		>({
			query: data => ({
				url: paymentApiUrl.withdrawalCrypto,
				method: 'POST',
				data,
			}),
		}),
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
		getCustTpBetRecordListDateRange: builder.query<
			IAxiosResponse<ICustTpBetRecordListDateRangeData[]>,
			ICustTpBetRecordListDateRangeArgs
		>({
			query: data => ({
				url: paymentApiUrl.getCustTpBetRecordListDateRange,
				method: 'POST',
				data,
			}),
		}),
		getGetCustTpBetRecordListOneDay: builder.query<
			IAxiosResponse<ICustTpBetRecordListOneDayData[]>,
			ICustTpBetRecordListOneDayArgs
		>({
			query: data => ({
				url: paymentApiUrl.getGetCustTpBetRecordListOneDay,
				method: 'POST',
				data,
			}),
		}),
		getCustTpBetRecordListbyCategoryId: builder.query<
			IAxiosResponse<ICustTpBetRecordListbyCategoryIdData[]>,
			ICustTpBetRecordListbyCategoryIdArgs
		>({
			query: data => ({
				url: paymentApiUrl.getCustTpBetRecordListbyCategoryId,
				method: 'POST',
				data,
			}),
		}),
		getCustTpBetRecordDetailListbyGameType: builder.query<
			IAxiosResponse<ICustTpBetRecordDetailListbyGameTypeData[]>,
			ICustTpBetRecordDetailListbyGameTypeArgs
		>({
			query: data => ({
				url: paymentApiUrl.getCustTpBetRecordDetailListbyGameType,
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
	}),
})

export const {
	useLazyKycCheckQuery,
	useGetWithdrawalRecentInfoQuery,
	useGetWithdrawalLimitQuery,
	useSetWithdrawalCancelMutation,
	useLazyGetEWalletInfoListQuery,
	useGetEWalletInfoListQuery,
	useLazyGetBankInfoSysListQuery,
	useGetExchangeInfoQuery,
	useLazyGetExchangeInfoQuery,
	useLazyGetDepositInfoHistoryQuery,
	useLazyGetWithdrawalInfoHistoryQuery,
	useLazyGetStatementQuery,
	useGetBankInfoSysListQuery,
	useLazyGetCustTpBetRecordListDateRangeQuery,
	useLazyGetGetCustTpBetRecordListOneDayQuery,
	useLazyGetCustTpBetRecordListbyCategoryIdQuery,
	useLazyGetCustTpBetRecordDetailListbyGameTypeQuery,
	useUploadReceiptMutation,
	useSetDepositCancelMutation,
	useSubmitWithdrawalMutation,
	useSubmitCryptoWithdrawalMutation,
	useSubmitEWalletWithdrawalMutation,
	useGetSupportCryptoInfoQuery,
} = paymentApi
