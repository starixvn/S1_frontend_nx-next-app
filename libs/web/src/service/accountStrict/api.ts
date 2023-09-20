import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import {
	IUserInfoData,
	IOTPSMSData,
	ISetProfileArgs,
	ISetProfileAddressArgs,
	ISetCustBankInfoArgs,
	ISetCustCryptoWalletArgs,
} from './type'

export const accountStrictApiUrl = {
	getCustProfile: 'AccountStrict/GetCustProfile',
	sendOTPEmail: 'AccountStrict/SendOTPEmail',
	sendOTPSMS: 'AccountStrict/SendOTPSMS',
	verifyOTP: 'AccountStrict/VerifyOTP',
	SetProfile: 'AccountStrict/SetProfile',
	setProfileAddress: 'AccountStrict/SetProfileAddress',
	delCustBankInfo: 'AccountStrict/DelCustBankInfo',
	setCustBankInfo: 'AccountStrict/SetCustBankInfo',
	setCustCryptoWallet: 'AccountStrict/SetCustCryptoWallet',
	setCustEWalletInfo: 'AccountStrict/SetCustEWalletInfo',
	delCustEWalletInfo: 'AccountStrict/DelCustEWalletInfo',
	getOTPVerifyInfo: 'AccountStrict/GetOTPVerifyInfo',
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
		delCustBankInfo: builder.mutation<
			IAxiosResponse<IUserInfoData | undefined>,
			{ accountName: string; accountNo: string; sysId: number }
		>({
			query: data => ({
				url: accountStrictApiUrl.delCustBankInfo,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['ACCOUNT_GET_USER_BANK_INFO'],
		}),
		setCustBankInfo: builder.mutation<
			IAxiosResponse<void>,
			ISetCustBankInfoArgs
		>({
			query: data => ({
				url: accountStrictApiUrl.setCustBankInfo,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['ACCOUNT_GET_USER_BANK_INFO'],
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
		setCustEWalletInfo: builder.mutation<
			IAxiosResponse<void>,
			{ sysId: number; accountNo: string }
		>({
			query: data => ({
				url: accountStrictApiUrl.setCustEWalletInfo,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['ACCOUNT_GET_USER_EWALLET_INFO'],
		}),
		delCustEWalletInfo: builder.mutation<
			IAxiosResponse<void>,
			{ sysId: number; accountNo: string }
		>({
			query: data => ({
				url: accountStrictApiUrl.delCustEWalletInfo,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['ACCOUNT_GET_USER_EWALLET_INFO'],
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
	useDelCustBankInfoMutation,
	useSetCustBankInfoMutation,
	useSetCustCryptoWalletMutation,
	useSetCustEWalletInfoMutation,
	useDelCustEWalletInfoMutation,
} = accountStrictApi
