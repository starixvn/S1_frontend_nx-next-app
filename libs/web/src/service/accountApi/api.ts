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
	IGetCustSpecificBonusArgs,
	ICustSpecificBonusData,
	IReferralSettingData,
	ISetChangePasswordArgs,
} from './type'

export const accountApiUrl = {
	getPopupMsg: 'Account/GetPopupMsg',
	getMsgCount: 'Account/getMsgCount',
	getMainWalletInfo: 'Account/GetWalletBalance',
	getCustBonusWallet: 'Account/GetCustBonusWallet',
	getTpWalletList: 'Account/GetTpWalletList',
	getTpWalletBalance: 'Account/GetTpWalletBalance',
	onlineCheck: 'Account/onlineCheck',
	setLang: 'Account/SetLanguage',
	setHideBalance: 'Account/SetHideBalance',
	getCustSpecificBonus: 'Account/GetCustSpecificBonus',
	changePassword: 'Account/ChangePassword',
	SetFavoriteGame: 'Account/SetFavoriteGame',
	getReferralSetting: 'Account/GetReferralSetting',
	getReferralCode: 'Account/GetReferralCode',
}

const accountApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		onlineCheck: builder.query<IAxiosResponse<null>, null>({
			query: () => ({
				url: accountApiUrl.onlineCheck,
				method: 'POST',
			}),
		}),
		getMsgCount: builder.query<IAxiosResponse<number>, null>({
			query: () => ({
				url: accountApiUrl.getMsgCount,
				method: 'POST',
			}),
		}),
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
		getCustSpecificBonus: builder.query<
			IAxiosResponse<ICustSpecificBonusData>,
			IGetCustSpecificBonusArgs
		>({
			query: data => ({
				url: accountApiUrl.getCustSpecificBonus,
				method: 'POST',
				data,
			}),
		}),
		setChangePassword: builder.mutation<
			IAxiosResponse<void>,
			ISetChangePasswordArgs
		>({
			query: data => ({
				url: accountApiUrl.changePassword,
				method: 'POST',
				data,
			}),
		}),
		setFavoriteGame: builder.mutation<
			IAxiosResponse<void>,
			{ providerId: number; gameId: string; isRemove: boolean }
		>({
			query: data => ({
				url: accountApiUrl.SetFavoriteGame,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['SLOTS_GAME_DATA'],
		}),
		getReferralSetting: builder.query<
			IAxiosResponse<IReferralSettingData[]>,
			null
		>({
			query: () => ({
				url: accountApiUrl.getReferralSetting,
				method: 'POST',
			}),
		}),
		getReferralCode: builder.query<IAxiosResponse<string>, null>({
			query: () => ({
				url: accountApiUrl.getReferralCode,
				method: 'POST',
			}),
		}),
	}),
})

export const {
	useGetPopupMsgQuery,
	useGetMsgCountQuery,
	useGetMainWalletInfoQuery,
	useGetCustBonusWalletListQuery,
	useLazyOnlineCheckQuery,
	useLazyGetTpWalletInfoByTpIdQuery,
	useGetTpWalletListQuery,
	useSetLanguageMutation,
	useSetHideBalanceMutation,
	useLazyGetCustSpecificBonusQuery,
	useSetFavoriteGameMutation,
	useGetReferralCodeQuery,
	useGetReferralSettingQuery,
	useSetChangePasswordMutation,
} = accountApi
