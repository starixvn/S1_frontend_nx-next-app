import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { axiosBaseQuery } from '../axiosBaseQuery'
import { baseUrl } from '../baseApi'

/*
 * 配置初始定義的 createApi，減少初始 bundle 的大小，定義後調用 injectEndpoints 來定義額外的 api
 * https://redux-toolkit.js.org/rtk-query/usage/code-splitting
 */

export const rootApi = createApi({
	reducerPath: 'rootApi',
	baseQuery: axiosBaseQuery({
		baseUrl,
	}),
	tagTypes: [
		'AUTH_API_POST',
		'ACCOUNT_STRICT_GET_USER_INFO',
		'ACCOUNT_GET_MAIN_WALLET_INFO',
		'SLOTS_GAME_DATA',
		'ACCOUNT_GET_MSG',
		'ACCOUNT_GET_MSG_COUNT',
		'ACCOUNT_POPUP_MSG',
		'PROMOTION_GET_PROMOTION_LIST',
		'PROMOTION_GET_SPECIAL_PROMOTION_LIST',
		'WITHDRAWAL_API_POST',
		'WITHDRAWAL_BANKCARD_POST',
		'WITHDRAWAL_EWALLET_POST',
		'WITHDRAWAL_CRYPTO_POST',
		'PAYMENT_DEPOSIT_HISTORY',
		'PAYMENT_WITHDRAWAL_HISTORY',
		'LUCKY_WHEEL_DRAW_PRIZE',
		'ACCOUNT_GET_USER_BANK_INFO',
		'ACCOUNT_GET_USER_CRYPTO_WALLET_INFO',
		'ACCOUNT_GET_USER_EWALLET_INFO',
		'ACCOUNT_GET_AUTO_TRANSFER_INFO',
		'TP_GET_TRANSFER_INFO',
		'EUROPE_CUP_EVENT_GET_TICKETS',
		'OLYMPIC_EVENT_GET_TICKETS',
		'QUESTIONNAIRE_POST',
		'CAPTCHA',
	],
	endpoints: () => ({}),
})
