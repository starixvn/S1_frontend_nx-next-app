import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import {
	IUserInfoData,
	IOTPSMSData,
	ISetProfileArgs,
	ISetProfileAddressArgs,
	IDeleteBankCardArgs,
	IDeleteEWalletCardArgs,
	ISetLocalBankInfoArgs,
	ISetEWalletInfoArgs,
	ISetCustCryptoWalletArgs,
} from './type'

export const accountStrictApiUrl = {
	getCustProfile: 'AccountStrict/GetCustProfile',
	getOTPVerifyInfo: 'AccountStrict/GetOTPVerifyInfo',
	sendOTPEmail: 'AccountStrict/SendOTPEmail',
	sendOTPSMS: 'AccountStrict/SendOTPSMS',
	verifyOTP: 'AccountStrict/VerifyOTP',
	SetProfile: 'AccountStrict/SetProfile',
	setProfileAddress: 'AccountStrict/SetProfileAddress',
	setCustCryptoWallet: 'AccountStrict/SetCustCryptoWallet',
	deleteBankCard: 'AccountStrict/DelCustBankInfo',
	deleteEWalletCard: 'AccountStrict/DelCustEWalletInfo',
	setLocalBankInfo: 'AccountStrict/SetCustBankInfo',
	setEWalletInfo: 'AccountStrict/SetCustEWalletInfo',
	uploadCustPhoto: 'AccountStrict/UploadCustPhotoId',
}

export const accountStrictApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getUserInfo: builder.query<
			IAxiosResponse<IUserInfoData | undefined>,
			null | boolean | undefined
		>({
			query: data => ({
				url: accountStrictApiUrl.getCustProfile,
				method: 'POST',
				data,
			}),
			providesTags: ['ACCOUNT_STRICT_GET_USER_INFO'],
		}),

		sendOTPEmail: builder.mutation<IAxiosResponse<void>, { route: string }>({
			query: ({ route }) => ({
				url: accountStrictApiUrl.sendOTPEmail,
				method: 'POST',
				data: { route },
			}),
		}),
		sendOTPSMS: builder.mutation<IAxiosResponse<IOTPSMSData>, void>({
			query: () => ({
				url: accountStrictApiUrl.sendOTPSMS,
				method: 'POST',
			}),
		}),
		getOTPVerifyInfo: builder.query<IAxiosResponse<IOTPSMSData>, void>({
			query: () => ({
				url: accountStrictApiUrl.getOTPVerifyInfo,
				method: 'POST',
			}),
		}),
		verifyOTP: builder.mutation<IAxiosResponse<void>, { otpCode: string }>({
			query: ({ otpCode }) => ({
				url: accountStrictApiUrl.verifyOTP,
				method: 'POST',
				data: { inputOTPcode: otpCode },
			}),
			invalidatesTags: ['ACCOUNT_STRICT_GET_USER_INFO'],
		}),
		setProfile: builder.mutation<IAxiosResponse<void>, ISetProfileArgs>({
			query: data => ({
				url: accountStrictApiUrl.SetProfile,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['ACCOUNT_STRICT_GET_USER_INFO'],
		}),
		setProfileAddress: builder.mutation<
			IAxiosResponse<void>,
			ISetProfileAddressArgs
		>({
			query: data => ({
				url: accountStrictApiUrl.setProfileAddress,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['ACCOUNT_STRICT_GET_USER_INFO'],
		}),
		deleteBankCard: builder.mutation<IAxiosResponse<void>, IDeleteBankCardArgs>(
			{
				query: data => ({
					url: accountStrictApiUrl.deleteBankCard,
					method: 'POST',
					data,
				}),
				invalidatesTags: [
					'WITHDRAWAL_BANKCARD_POST',
					'ACCOUNT_GET_USER_BANK_INFO',
				],
			}
		),
		deleteEWalletCard: builder.mutation<
			IAxiosResponse<void>,
			IDeleteEWalletCardArgs
		>({
			query: data => ({
				url: accountStrictApiUrl.deleteEWalletCard,
				method: 'POST',
				data,
			}),
			invalidatesTags: [
				'WITHDRAWAL_EWALLET_POST',
				'ACCOUNT_GET_USER_EWALLET_INFO',
			],
		}),
		setLocalBankInfo: builder.mutation<
			IAxiosResponse<void>,
			ISetLocalBankInfoArgs
		>({
			query: data => ({
				url: accountStrictApiUrl.setLocalBankInfo,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['WITHDRAWAL_BANKCARD_POST'],
		}),
		setEWalletInfo: builder.mutation<IAxiosResponse<void>, ISetEWalletInfoArgs>(
			{
				query: data => ({
					url: accountStrictApiUrl.setEWalletInfo,
					method: 'POST',
					data,
				}),
				invalidatesTags: [
					'WITHDRAWAL_EWALLET_POST',
					'ACCOUNT_GET_USER_EWALLET_INFO',
				],
			}
		),
		uploadCustPhoto: builder.mutation<IAxiosResponse<void>, FormData>({
			query: data => ({
				url: accountStrictApiUrl.uploadCustPhoto,
				method: 'POST',
				data,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}),
		}),
		setCustCryptoWallet: builder.mutation<
			IAxiosResponse<void>,
			ISetCustCryptoWalletArgs
		>({
			query: data => ({
				url: accountStrictApiUrl.setCustCryptoWallet,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['ACCOUNT_GET_USER_CRYPTO_WALLET_INFO'],
		}),
	}),
})

export const {
	useGetUserInfoQuery,
	useSendOTPEmailMutation,
	useSendOTPSMSMutation,
	useLazyGetOTPVerifyInfoQuery,
	useVerifyOTPMutation,
	useSetProfileMutation,
	useSetProfileAddressMutation,
	useDeleteBankCardMutation,
	useDeleteEWalletCardMutation,
	useSetLocalBankInfoMutation,
	useSetEWalletInfoMutation,
	useUploadCustPhotoMutation,
	useSetCustCryptoWalletMutation,
} = accountStrictApi
