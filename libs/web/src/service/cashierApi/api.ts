import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { axiosBaseQuery, IAxiosResponse } from '../axiosBaseQuery'
import {
	IDepositCashierQRCodeInfo,
	IDepositReqArgs,
	IPostDepositLoadCardPayReqArgs,
} from './type'

export const cashierApiUrl = {
	getDepositReqOnlineBanking: 'Cashier/DepositReqOnlineBanking',
	getDepositReqMobilePay: 'Cashier/DepositReqMobilePay',
	getDepositReqCryptoPay: 'Cashier/DepositReqCryptoPay',
	getDepositReqCryptoLocalPay: 'Cashier/DepositReqCryptoLocalPay',
	postDepositLoadCardPayReq: 'Cashier/DepositReqLoadCardPay',

	postDepositReq: 'Cashier/DepositReq', // * 通用存款 api
}

// * cashierApi 的 api 中間沒有 /api/ 的 domain，因此使用 createApi 獨立宣告 baseUrl: '/'
export const cashierApi = createApi({
	baseQuery: axiosBaseQuery({ baseUrl: '/' }),
	endpoints: builder => ({
		getDepositOnlineBankingReqInfo: builder.query<
			IAxiosResponse<IDepositCashierQRCodeInfo>,
			{ langId: string; paramsUrl: string }
		>({
			query: ({ langId, paramsUrl }) => ({
				url: `${langId}/${cashierApiUrl.getDepositReqOnlineBanking}?${paramsUrl}`,
				method: 'GET',
			}),
		}),
		getDepositReqMobilePayInfo: builder.query<
			IAxiosResponse<IDepositCashierQRCodeInfo>,
			{ langId: string; paramsUrl: string }
		>({
			query: ({ langId, paramsUrl }) => ({
				url: `${langId}/${cashierApiUrl.getDepositReqMobilePay}?${paramsUrl}`,
				method: 'GET',
			}),
		}),
		getDepositReqCryptoPayInfo: builder.query<
			IAxiosResponse<IDepositCashierQRCodeInfo>,
			{ langId: string; paramsUrl: string }
		>({
			query: ({ langId, paramsUrl }) => ({
				url: `${langId}/${cashierApiUrl.getDepositReqCryptoPay}?${paramsUrl}`,
				method: 'GET',
			}),
		}),
		getDepositReqCryptoLocalPayInfo: builder.query<
			IAxiosResponse<IDepositCashierQRCodeInfo>,
			{ langId: string; paramsUrl: string }
		>({
			query: ({ langId, paramsUrl }) => ({
				url: `${langId}/${cashierApiUrl.getDepositReqCryptoLocalPay}?${paramsUrl}`,
				method: 'GET',
			}),
		}),
		// * 建立 LocalCardPay / Top up card 存款單
		getDepositLoadCardPayReq: builder.query<
			IAxiosResponse<void>,
			IPostDepositLoadCardPayReqArgs
		>({
			query: ({ langId, paramsUrl, ...data }) => ({
				url: `${langId}/${cashierApiUrl.postDepositLoadCardPayReq}?${paramsUrl}`,
				method: 'GET',
				data,
			}),
		}),
		// * 新的 deposit request api , 通用當前所有 deposit method , 可逐步全部調整成此 api
		getDepositRequest: builder.query<IAxiosResponse<void>, IDepositReqArgs>({
			query: ({ langId, paramsUrl, ...data }) => ({
				url: `${langId}/${cashierApiUrl.postDepositReq}?${paramsUrl}`,
				method: 'GET',
				data,
			}),
		}),
	}),
})

export const {
	useLazyGetDepositOnlineBankingReqInfoQuery,
	useLazyGetDepositReqMobilePayInfoQuery,
	useLazyGetDepositReqCryptoPayInfoQuery,
	useLazyGetDepositReqCryptoLocalPayInfoQuery,
	useLazyGetDepositLoadCardPayReqQuery,
	useLazyGetDepositRequestQuery,
} = cashierApi
