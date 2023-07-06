import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import { ISetForgetPasswordArgs, TpMaintainData, ISignUpArgs } from './type'

export const siteApiUrl = {
	getTpIds: 'Site/GetTpIds',
	getTpMaintainList: 'Site/GetTpMaintainList',
	getSEOData: 'Site/Seo',
	forgetPassword: 'Site/ForgetPwdV2',
	getPromotionListV3: 'Promotion/GetPromotionListV3',
	existsUserName: 'Site/ExistsUserName',
	existsEmail: 'Site/ExistsEmail',
	getSiteCurrencyList: 'Site/GetSiteCurrencyList',
	getAffiliateAgent: 'Site/GetAffiliateAgent',
	getRecaptchaInfo: 'Site/GetRecaptchaInfo',
	signup: 'Site/Signup',
	affiliateCheck: 'Site/AffiliateCheck',
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
		setForgetPassword: builder.mutation<
			IAxiosResponse<void>,
			ISetForgetPasswordArgs
		>({
			query: ({ langId, ...data }) => ({
				url: `${siteApiUrl.forgetPassword}/${langId}`,
				method: 'POST',
			}),
		}),
		getPromotionListV3: builder.query<
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			IAxiosResponse<any>,
			{ langId: string; currencyId: number; deviceType: number }
		>({
			query: ({ langId, ...data }) => ({
				url: `Promotion/GetPromotionListV3/${langId}`,
				method: 'POST',
				data,
			}),
			providesTags: ['AUTH_API_POST'],
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
		getRecaptchaInfo: builder.query<
			IAxiosResponse<{
				siteKey: string
				country: string
			}>,
			void
		>({
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
	}),
})

export const {
	useGetProductTpIdsQuery,
	useGetTpMaintainListQuery,
	useSetForgetPasswordMutation,
	useGetPromotionListV3Query,
	useLazyGetPromotionListV3Query,
	useLazyExistsUserNameQuery,
	useLazyExistsEmailQuery,
	useGetSiteCurrencyListQuery,
	useLazyGetAffiliateAgentQuery,
	useGetRecaptchaInfoQuery,
	useSignupMutation,
	useLazyAffiliateCheckQuery,
} = siteApi
