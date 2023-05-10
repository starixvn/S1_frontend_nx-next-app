import { rootApi } from '../rootApi/api'
import { IAxiosResponse } from '../axiosBaseQuery'
import {
	IPopUpMsgData,
	IWalletBalanceData,
	ISetLangArgs,
	ITpWalletData,
	TpWalletListTypeEnum,
} from './type'

export const accountApiUrl = {
	getPopupMsg: 'Account/GetPopupMsg',
	getWalletBalance: 'Account/GetWalletBalance',
	getCustBonusWallet: 'Account/GetCustBonusWallet',
	getTpWalletList: 'Account/GetTpWalletList',
	setLang: 'Account/SetLanguage',
}

const accountApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getPopupMsg: builder.query<IAxiosResponse<IPopUpMsgData>, null>({
			query: () => ({
				url: accountApiUrl.getPopupMsg,
				method: 'POST',
			}),
		}),
		getWalletBalance: builder.query<IAxiosResponse<IWalletBalanceData>, null>({
			query: () => ({
				url: accountApiUrl.getWalletBalance,
				method: 'POST',
			}),
		}),
		// TODO: 查詢 interface
		getCustBonusWallet: builder.query<IAxiosResponse<unknown>, null>({
			query: () => ({
				url: accountApiUrl.getCustBonusWallet,
				method: 'POST',
			}),
		}),
		getTpWalletList: builder.query<
			IAxiosResponse<ITpWalletData[]>,
			{ langId: string; listType: TpWalletListTypeEnum }
		>({
			query: ({ langId, listType }) => ({
				url: `${accountApiUrl.getTpWalletList}/${langId}`,
				method: 'POST',
				data: { listType },
			}),
		}),
		setLanguage: builder.mutation<IAxiosResponse<void>, ISetLangArgs>({
			query: data => ({
				url: accountApiUrl.setLang,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['ACCOUNT_STRICT_GET_USER_INFO'],
		}),
	}),
})

export const {
	useGetPopupMsgQuery,
	useGetWalletBalanceQuery,
	useGetCustBonusWalletQuery,
	useGetTpWalletListQuery,
	useSetLanguageMutation,
} = accountApi
