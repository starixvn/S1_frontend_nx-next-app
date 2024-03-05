import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { axiosBaseQuery, IAxiosResponse } from '../axiosBaseQuery'
import {
	IDepositCashierQRCodeInfo,
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
		// * 建立 LocalCardPay 存款單
		postDepositLoadCardPayReq: builder.mutation<
			IAxiosResponse<void>,
			IPostDepositLoadCardPayReqArgs
		>({
			query: ({ langId, ...data }) => ({
				url: `${langId}/${cashierApiUrl.postDepositLoadCardPayReq}`,
				method: 'POST',
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
	usePostDepositLoadCardPayReqMutation,
} = cashierApi
