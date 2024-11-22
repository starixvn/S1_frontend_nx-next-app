import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import {
	IBannerData,
	ICountryListData,
	IGetNumberCaptchaArgs,
	IGetNumberCaptchaData,
	IGetVipBannerArgs,
	IRecaptchaInfoData,
	IResetPwdByOTPArgs,
	IResetPwdVerifyOTPArgs,
	ISeoData,
	ISetForgetPasswordArgs,
	ISignUpArgs,
	ISocialChannelData,
	IVipBannerData,
	TpMaintainData,
} from './type'

export const siteApiUrl = {
	getTpIds: 'Site/GetTpIds',
	getTpMaintainList: 'Site/GetTpMaintainList',
	forgetPassword: 'Site/ForgetPwdV2',
	getPromotionListV3: 'Promotion/GetPromotionListV3',
	existsUserName: 'Site/ExistsUserName',
	existsEmail: 'Site/ExistsEmail',
	getSiteCurrencyList: 'Site/GetSiteCurrencyList',
	getAffiliateAgent: 'Site/GetAffiliateAgent',
	getRecaptchaInfo: 'Site/GetRecaptchaInfo',
	getNumberCaptcha: 'Site/GetNumberCaptcha',
	signup: 'Site/Signup',
	getBanner: 'Site/GetBannerV3',
	affiliateCheck: 'Site/AffiliateCheck',
	getSocialChannel: 'Site/GetSocialChannel',
	getSeo: 'Site/seo',
	getVipBanner: 'Site/GetVipBanner',
	getIpCountry: 'Site/GetIpCountry',
	reSetPwdByOTP: 'Site/ReSetPwdByOTP',
	reSetPwdVerifyOTP: 'Site/ReSetPwdVerifyOTP',
	checkResetPwdToken: 'Site/CheckResetPwdToken',
	getCountryList: 'GeoIp/GetCountryList',
	getStaticFileDomain: 'Site/GetStaticFileDomain',
}

export const siteApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		// * 產品權限清單
		getProductTpIds: builder.query<IAxiosResponse<number[]>, null>({
			query: () => ({
				url: siteApiUrl.getTpIds,
				method: 'POST',
			}),
		}),
		// * 獲取維護遊戲清單
		getTpMaintainList: builder.query<
			IAxiosResponse<TpMaintainData[]>,
			boolean | undefined
		>({
			query: () => ({
				url: siteApiUrl.getTpMaintainList,
				method: 'POST',
			}),
		}),
		getSocialChannel: builder.query<
			IAxiosResponse<ISocialChannelData[]>,
			{
				currencyId: number
				langId: string
				displayPage: number
			}
		>({
			query: data => ({
				url: `Site/GetSocialChannel`,
				method: 'POST',
				data,
			}),
		}),
		getTpIds: builder.query<IAxiosResponse<number[]>, null>({
			query: data => ({
				url: `Site/GetTpIds`,
				method: 'POST',
				data,
			}),
		}),
		getSeo: builder.query<IAxiosResponse<ISeoData>, null>({
			query: data => ({
				url: `Site/seo`,
				method: 'POST',
				data,
			}),
		}),
		setForgetPassword: builder.mutation<
			IAxiosResponse<void>,
			ISetForgetPasswordArgs
		>({
			query: ({ langId, ...data }) => ({
				url: `${siteApiUrl.forgetPassword}/${langId}`,
				method: 'POST',
				data,
			}),
		}),
		existsUserName: builder.query<
			IAxiosResponse<boolean>,
			{ username: string; langId: string }
		>({
			query: ({ langId, username }) => ({
				url: `${siteApiUrl.existsUserName}/${langId}`,
				method: 'POST',
				data: { username },
			}),
		}),
		existsEmail: builder.query<IAxiosResponse<boolean>, { email: string }>({
			query: ({ email }) => ({
				url: siteApiUrl.existsEmail,
				method: 'POST',
				data: { email },
			}),
		}),
		getSiteCurrencyList: builder.query<IAxiosResponse<number[]>, void>({
			query: () => ({
				url: siteApiUrl.getSiteCurrencyList,
				method: 'POST',
			}),
		}),
		getAffiliateAgent: builder.query<
			IAxiosResponse<{ currencyId: number }>,
			{ affId: string }
		>({
			query: ({ affId }) => ({
				url: siteApiUrl.getAffiliateAgent,
				method: 'POST',
				data: { affId },
			}),
		}),
		affiliateCheck: builder.query<IAxiosResponse<void>, { affCode: string }>({
			query: ({ affCode }) => ({
				url: siteApiUrl.affiliateCheck,
				method: 'POST',
				data: { affCode },
			}),
		}),
		getRecaptchaInfo: builder.query<IAxiosResponse<IRecaptchaInfoData>, void>({
			query: () => ({
				url: siteApiUrl.getRecaptchaInfo,
				method: 'POST',
			}),
		}),
		signup: builder.mutation<IAxiosResponse<void>, ISignUpArgs>({
			query: ({ langId, ...data }) => ({
				url: `${siteApiUrl.signup}/${langId}`,
				method: 'POST',
				data,
			}),
		}),
		getBannerV3: builder.query<
			IAxiosResponse<IBannerData[]>,
			{ langId: string; bannerType: number; currencyId: number }
		>({
			query: ({ langId, ...data }) => ({
				url: `${siteApiUrl.getBanner}/${langId}`,
				method: 'POST',
				data,
			}),
		}),
		getVipBanner: builder.query<
			IAxiosResponse<IVipBannerData[]>,
			IGetVipBannerArgs
		>({
			query: () => ({
				url: siteApiUrl.getVipBanner,
				method: 'POST',
			}),
		}),
		getIpCountry: builder.query<IAxiosResponse<{ code: string }>, null>({
			query: () => ({
				url: siteApiUrl.getIpCountry,
				method: 'POST',
			}),
		}),
		resetPwdByOTP: builder.mutation<IAxiosResponse<any>, IResetPwdByOTPArgs>({
			query: data => ({
				url: siteApiUrl.reSetPwdByOTP,
				method: 'POST',
				data,
			}),
		}),
		resetPwdVerifyOTP: builder.mutation<
			IAxiosResponse<any>,
			IResetPwdVerifyOTPArgs
		>({
			query: data => ({
				url: siteApiUrl.reSetPwdVerifyOTP,
				method: 'POST',
				data,
			}),
		}),
		checkResetPwdToken: builder.mutation<IAxiosResponse<void>, FormData>({
			query: data => ({
				url: siteApiUrl.checkResetPwdToken,
				method: 'POST',
				data,
			}),
		}),
		getCountryList: builder.query<IAxiosResponse<ICountryListData[]>, null>({
			query: () => ({
				url: siteApiUrl.getCountryList,
				method: 'GET',
			}),
		}),
		getNumberCaptcha: builder.query<
			IAxiosResponse<IGetNumberCaptchaData>,
			IGetNumberCaptchaArgs
		>({
			query: data => ({
				url: siteApiUrl.getNumberCaptcha,
				method: 'POST',
				data,
			}),
		}),
	}),
})

export const {
	useGetProductTpIdsQuery,
	useGetTpMaintainListQuery,
	useLazyGetIpCountryQuery,
	useGetIpCountryQuery,
	useSetForgetPasswordMutation,
	useLazyExistsUserNameQuery,
	useLazyExistsEmailQuery,
	useGetSiteCurrencyListQuery,
	useLazyGetAffiliateAgentQuery,
	useGetRecaptchaInfoQuery,
	useSignupMutation,
	useGetBannerV3Query,
	useLazyAffiliateCheckQuery,
	useGetSocialChannelQuery,
	useGetTpIdsQuery,
	useGetSeoQuery,
	useResetPwdByOTPMutation,
	useResetPwdVerifyOTPMutation,
	useCheckResetPwdTokenMutation,
	useGetCountryListQuery,
	useGetNumberCaptchaQuery,
	useLazyGetNumberCaptchaQuery,
} = siteApi
