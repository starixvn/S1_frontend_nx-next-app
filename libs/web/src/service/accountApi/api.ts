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
	IGetMsgListArgs,
	IDelMsgArgs,
	ISetMsgReadArgs,
	IGetMsgListResponse,
	IMsgContentResponse,
	IGetMsgContentArgs,
	IReferralSettingData,
	ISetChangePasswordArgs,
	IReferralSummaryData,
	IReferralSettingDetailData,
	IGetReferralArgs,
	IReferralData,
	IGetCustBankInfoData,
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
	getMessageList: 'Account/GetMsgList',
	delMsg: 'Account/DelMsg',
	setMsgRead: 'Account/SetMsgReadV2',
	getMsgContent: 'Account/GetMsgContent',
	getReferralSetting: 'Account/GetReferralSetting',
	getReferralCode: 'Account/GetReferralCode',
	getReferralSummary: 'Account/GetReferralSummaryV2',
	getReferralSettingDetail: 'Account/GetReferralSettingDetail',
	getReferral: 'Account/GetRefFriendList',
	getCustBankInfo: 'Account/GetCustBankInfo',
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
			providesTags: ['ACCOUNT_GET_MSG_COUNT'],
		}),
		getPopupMsg: builder.query<IAxiosResponse<IPopUpMsgData>, null>({
			query: () => ({
				url: accountApiUrl.getPopupMsg,
				method: 'POST',
			}),
			providesTags: ['ACCOUNT_POPUP_MSG'],
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
		getMsgList: builder.query<IGetMsgListResponse, IGetMsgListArgs>({
			query: ({ pageNumber, pageSize }) => ({
				url: accountApiUrl.getMessageList,
				method: 'POST',
				data: { pageNumber, pageSize },
			}),
			providesTags: ['ACCOUNT_GET_MSG'],
		}),
		delMsg: builder.mutation<IAxiosResponse<void>, IDelMsgArgs>({
			query: list => ({
				url: accountApiUrl.delMsg,
				method: 'POST',
				data: list,
			}),
			invalidatesTags: ['ACCOUNT_GET_MSG', 'ACCOUNT_GET_MSG_COUNT'],
		}),
		setMsgRead: builder.mutation<IAxiosResponse<null>, ISetMsgReadArgs>({
			query: list => ({
				url: accountApiUrl.setMsgRead,
				method: 'POST',
				data: list,
			}),
			invalidatesTags: ['ACCOUNT_GET_MSG', 'ACCOUNT_GET_MSG_COUNT'],
		}),
		// * 這裡為了要觸發 其他三隻 api 所以先用 mutation
		// * 打這支後端似乎會自動觸發 setMsgRead
		getMsgContent: builder.mutation<IMsgContentResponse, IGetMsgContentArgs>({
			query: list => ({
				url: accountApiUrl.getMsgContent,
				method: 'POST',
				data: list,
			}),
			invalidatesTags: [
				'ACCOUNT_POPUP_MSG',
				'ACCOUNT_GET_MSG_COUNT',
				'ACCOUNT_GET_MSG',
			],
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
		getReferral: builder.query<
			IAxiosResponse<IReferralData[]>,
			IGetReferralArgs
		>({
			query: data => ({
				url: accountApiUrl.getReferral,
				method: 'POST',
				data,
			}),
		}),
		getReferralSummary: builder.query<
			IAxiosResponse<IReferralSummaryData>,
			null
		>({
			query: () => ({
				url: accountApiUrl.getReferralSummary,
				method: 'POST',
			}),
		}),
		getReferralSettingDetail: builder.query<
			IAxiosResponse<IReferralSettingDetailData>,
			null
		>({
			query: () => ({
				url: accountApiUrl.getReferralSettingDetail,
				method: 'POST',
			}),
		}),
		getCustBankInfo: builder.query<IAxiosResponse<IGetCustBankInfoData>, void>({
			query: () => ({
				url: accountApiUrl.getCustBankInfo,
				method: 'POST',
			}),
			providesTags: ['ACCOUNT_GET_USER_BANK_INFO'],
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
	useGetMsgListQuery,
	useDelMsgMutation,
	useSetMsgReadMutation,
	useGetMsgContentMutation,
	useGetReferralCodeQuery,
	useGetReferralSettingQuery,
	useSetChangePasswordMutation,
	useGetReferralSummaryQuery,
	useLazyGetReferralSettingDetailQuery,
	useLazyGetReferralQuery,
	useGetCustBankInfoQuery,
} = accountApi
