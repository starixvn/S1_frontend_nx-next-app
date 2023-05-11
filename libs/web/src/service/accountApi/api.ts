import { rootApi } from '../rootApi/api'
import { IAxiosResponse } from '../axiosBaseQuery'
import {
	IPopUpMsgData,
	IMainWalletInfoData,
	ISetLangArgs,
	ITpWalletData,
	TpWalletListTypeEnum,
	ICustBonusWalletData,
	ITpWalletInfoData,
} from './type'

export const accountApiUrl = {
	getPopupMsg: 'Account/GetPopupMsg',
	getMainWalletInfo: 'Account/GetWalletBalance',
	getCustBonusWallet: 'Account/GetCustBonusWallet',
	getTpWalletList: 'Account/GetTpWalletList',
	getTpWalletBalance: 'Account/GetTpWalletBalance',
	setLang: 'Account/SetLanguage',
	setHideBalance: 'Account/SetHideBalance',
}

const accountApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getPopupMsg: builder.query<IAxiosResponse<IPopUpMsgData>, null>({
			query: () => ({
				url: accountApiUrl.getPopupMsg,
				method: 'POST',
			}),
		}),
		getMainWalletInfo: builder.query<IAxiosResponse<IMainWalletInfoData>, null>(
			{
				query: () => ({
					url: accountApiUrl.getMainWalletInfo,
					method: 'POST',
				}),
				providesTags: ['ACCOUNT_GET_MAIN_WALLET_INFO'],
			}
		),
		getCustBonusWalletList: builder.query<
			IAxiosResponse<ICustBonusWalletData[]>,
			null
		>({
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
		getTpWalletInfoByTpId: builder.query<
			IAxiosResponse<ITpWalletInfoData>,
			number
		>({
			query: tpId => ({
				url: `${accountApiUrl.getTpWalletBalance}`,
				method: 'POST',
				data: { tpId },
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
		setHideBalance: builder.mutation<IAxiosResponse<void>, boolean>({
			query: isHide => ({
				url: `${accountApiUrl.setHideBalance}?value=${isHide}`,
				method: 'GET',
			}),
			invalidatesTags: ['ACCOUNT_GET_MAIN_WALLET_INFO'],
		}),
	}),
})

export const {
	useGetPopupMsgQuery,
	useGetMainWalletInfoQuery,
	useGetCustBonusWalletListQuery,
	useLazyGetTpWalletInfoByTpIdQuery,
	useGetTpWalletListQuery,
	useSetLanguageMutation,
	useSetHideBalanceMutation,
} = accountApi
