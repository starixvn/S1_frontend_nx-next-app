import { DeviceTypeEnum } from '@nx-next-app/types'
import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
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
	IEWalletInfoSysData,
	IPaymentBankTransferData,
	IPaymentOnlineBankingData,
	IPaymentMobilePayData,
	IPaymentCryptoPayData,
	IBankAccountInfoData,
	IDepositBankTransferReqData,
	IPostDepositBankTransferReqArgs,
	IChannelMobilePayData,
	IPaymentLinePayInfo,
	IPaymentQRPayData,
	IChannelQrPayData,
	IPaymentTopUpCardPayData,
	IChannelTopUpCardPayData,
	IDepositLocalPayReqData,
	IPaymentAutoDepositData,
	IDepositInfoRecentData,
	IWithdrawalSetting,
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
	getPaymentAutoDepositList: 'Payment/GetAutoChannelBankGroupList',
	getPaymentBankTransferList: 'Payment/GetBankInfoOffList',
	getPaymentOnlineBankingList: 'Payment/GetOnlinePaymentList',
	getPaymentMobilePayList: 'Payment/GetMobilePayGroupList',
	getChannelMobilePayList: 'Payment/GetMobilePayInfoList',
	getPaymentCryptoPayList: 'Payment/GetCryptoPayInfoList',
	getPaymentLinePayInfo: 'Payment/GetLineChannelForDpeosit',
	getPaymentQRPayList: 'Payment/GetQRPayGroupList',
	getChannelQrPayList: 'Payment/GetQRPayInfoList',
	getPaymentTopUpCardPayList: 'Payment/GetLoadCardPayGroupList',
	getChannelTopUpCardPayList: 'Payment/GetLoadCardPayInfoList',
	getBankAccountInfo: 'Payment/GetLocalBankInfo',
	getDepositInfoRecentList: 'Payment/GetDepositInfoRecent',
	postDepositBankTransferReq: 'Payment/DepositReqWireTransfer',
	postDepositLocalPayReq: 'Payment/DepositReqLocalPay',
	checkDepositSpecialCode: 'Payment/CheckDepositSpecialCode',
	getWithdrawalBlockSetting: 'Payment/GetWithdrawalBlockSetting',
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
		// * Deposit autoDeposit 第一層
		getPaymentAutoDepositList: builder.query<
			IAxiosResponse<IPaymentAutoDepositData[]>,
			void
		>({
			query: data => ({
				url: paymentApiUrl.getPaymentAutoDepositList,
				method: 'POST',
				data,
			}),
		}),
		// * Deposit BankTransfer 第一層
		getPaymentBankTransferList: builder.query<
			IAxiosResponse<IPaymentBankTransferData[]>,
			void
		>({
			query: data => ({
				url: paymentApiUrl.getPaymentBankTransferList,
				method: 'POST',
				data,
			}),
		}),
		// * Deposit OnlineBanking 第一層
		getPaymentOnlineBankingList: builder.query<
			IAxiosResponse<IPaymentOnlineBankingData[]>,
			null
		>({
			query: () => ({
				url: paymentApiUrl.getPaymentOnlineBankingList,
				method: 'POST',
			}),
		}),
		// * Deposit MobilePay 第一層
		getPaymentMobilePayList: builder.query<
			IAxiosResponse<IPaymentMobilePayData[]>,
			null
		>({
			query: () => ({
				url: paymentApiUrl.getPaymentMobilePayList,
				method: 'POST',
			}),
		}),
		// * Deposit MobilePay 第一層
		getPaymentCryptoPayList: builder.query<
			IAxiosResponse<IPaymentCryptoPayData[]>,
			null
		>({
			query: () => ({
				url: paymentApiUrl.getPaymentCryptoPayList,
				method: 'POST',
			}),
		}),
		// * Deposit MobilePay 第二層
		getChannelMobilePayList: builder.query<
			IAxiosResponse<IChannelMobilePayData[]>,
			{ groupId: number }
		>({
			query: data => ({
				url: paymentApiUrl.getChannelMobilePayList,
				method: 'POST',
				data,
			}),
		}),
		// * Deposit Line Pay 資訊
		getPaymentLinePayInfo: builder.query<
			IAxiosResponse<IPaymentLinePayInfo>,
			void
		>({
			query: () => ({
				url: paymentApiUrl.getPaymentLinePayInfo,
				method: 'POST',
			}),
		}),
		// * Deposit QRPay 第一層
		getPaymentQRPayList: builder.query<
			IAxiosResponse<IPaymentQRPayData[]>,
			void
		>({
			query: () => ({
				url: paymentApiUrl.getPaymentQRPayList,
				method: 'POST',
			}),
		}),
		// * Deposit QRPay 第二層
		getChannelQrPayList: builder.query<
			IAxiosResponse<IChannelQrPayData[]>,
			{ groupId?: number }
		>({
			query: data => ({
				url: paymentApiUrl.getChannelQrPayList,
				method: 'POST',
				data,
			}),
		}),
		// * Deposit TopUpCardPay 第一層
		getPaymentTopUpCardPayList: builder.query<
			IAxiosResponse<IPaymentTopUpCardPayData[]>,
			void
		>({
			query: () => ({
				url: paymentApiUrl.getPaymentTopUpCardPayList,
				method: 'POST',
			}),
		}),
		// * Deposit TopUpCardPay 第二層
		getChannelTopUpCardPayList: builder.query<
			IAxiosResponse<IChannelTopUpCardPayData[]>,
			{ groupId?: number }
		>({
			query: data => ({
				url: paymentApiUrl.getChannelTopUpCardPayList,
				method: 'POST',
				data,
			}),
		}),
		getBankAccountInfo: builder.query<
			IAxiosResponse<IBankAccountInfoData>,
			{ sysId: number }
		>({
			query: data => ({
				url: paymentApiUrl.getBankAccountInfo,
				method: 'POST',
				data,
			}),
		}),
		// * Deposit 頁面近期存款記錄
		getDepositInfoRecentList: builder.query<
			IAxiosResponse<IDepositInfoRecentData[]>,
			void
		>({
			query: () => ({
				url: paymentApiUrl.getDepositInfoRecentList,
				method: 'POST',
			}),
			providesTags: ['PAYMENT_DEPOSIT_HISTORY'],
		}),
		// * 透過 specialCode 取得 bonusCode
		checkDepositSpecialCode: builder.query<
			IAxiosResponse<{ bonusCode: string }>,
			{ deviceType: DeviceTypeEnum; specialCode: string }
		>({
			query: data => ({
				url: paymentApiUrl.checkDepositSpecialCode,
				method: 'POST',
				data,
			}),
		}),
		// * 建立 LocalPay 存款單
		postDepositLocalPayReq: builder.mutation<
			IAxiosResponse<IDepositLocalPayReqData>,
			{ groupId: number; amount: number; bonusCode?: string }
		>({
			query: data => ({
				url: paymentApiUrl.postDepositLocalPayReq,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['PAYMENT_DEPOSIT_HISTORY'],
		}),
		// * 建立 BankTransfer 存款單，並透過 invalidatesTags 更新 Deposit History Data
		postDepositBankTransferReq: builder.mutation<
			IAxiosResponse<IDepositBankTransferReqData>,
			IPostDepositBankTransferReqArgs
		>({
			query: data => ({
				url: paymentApiUrl.postDepositBankTransferReq,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['PAYMENT_DEPOSIT_HISTORY'],
		}),
		// withdrawal 區域開放區塊控制
		getWithdrawalBlockSetting: builder.query<
			IAxiosResponse<IWithdrawalSetting[]>,
			void
		>({
			query: () => ({
				url: paymentApiUrl.getWithdrawalBlockSetting,
				method: 'POST',
			}),
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
	useGetEWalletInfoSysListQuery,
	useGetPaymentAutoDepositListQuery,
	useGetPaymentBankTransferListQuery,
	useGetPaymentOnlineBankingListQuery,
	useGetPaymentMobilePayListQuery,
	useGetChannelMobilePayListQuery,
	useGetPaymentCryptoPayListQuery,
	useGetPaymentLinePayInfoQuery,
	useGetPaymentQRPayListQuery,
	useGetChannelQrPayListQuery,
	useGetPaymentTopUpCardPayListQuery,
	useGetChannelTopUpCardPayListQuery,
	useGetBankAccountInfoQuery,
	useGetDepositInfoRecentListQuery,
	useLazyCheckDepositSpecialCodeQuery,
	usePostDepositBankTransferReqMutation,
	usePostDepositLocalPayReqMutation,
	useGetWithdrawalBlockSettingQuery,
} = paymentApi
