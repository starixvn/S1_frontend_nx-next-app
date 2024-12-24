import { cloneDeep, findIndex } from 'lodash-es'
import { getDeviceType } from '../../utils/client'
import { ICustSpecificBonusData } from '../accountApi/type'
import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import {
	IDepositPromotionData,
	IGetPopUpPromotionArgs,
	IGetPromotionDetailArgs,
	IPromotionData,
	IRebateExcludeGameData,
	ISetClaimPromotionArgs,
	ISetDepositPromotionQueueArgs,
} from './type'

export const promotionApiUrl = {
	getPromotionListV3: 'Promotion/GetPromotionListV3',
	getPromotionDetail: 'Promotion/GetPromotionDetail',
	getRebateExcludeGameList: 'Promotion/GetRebateExcludeGameList',
	getSpecialPromotionList: 'Promotion/GetSpecialPromotionListV2',
	getDepositPromotionList: 'Promotion/GetDepositPromotionList',
	getPopUpPromotion: 'Promotion/GetPopUpPromotion',
	getRetentionPromotion: 'Promotion/GetRetentionPromotion',
	setSpecialCode: 'Promotion/SetSpecialCode',
	setClaimPromotion: 'Promotion/SetClaimPromotion',
	setDepositPromotionQueue: 'Promotion/SetDepositPromotionQueue',
	getPromotionUploadCustList: 'Promotion/GetPromotionUploadCustList',
	setClaimPromotionForUploadCustList:
		'Promotion/SetClaimPromotionForUploadCustList',
}

export const promotionApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getPromotionListV3: builder.query<
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			IAxiosResponse<IPromotionData[]>,
			{ langId: string; currencyId: number }
		>({
			query: ({ langId, currencyId }) => ({
				url: `${promotionApiUrl.getPromotionListV3}/${langId}`,
				method: 'POST',
				data: { deviceType: getDeviceType(), currencyId },
			}),
			providesTags: ['PROMOTION_GET_PROMOTION_LIST'],
		}),
		getPromotionDetail: builder.query<
			IAxiosResponse<IPromotionData>,
			IGetPromotionDetailArgs
		>({
			query: ({ langId, ...data }) => ({
				url: `${promotionApiUrl.getPromotionDetail}/${langId}`,
				method: 'POST',
				data: { deviceType: getDeviceType(), ...data },
			}),
			providesTags: ['PROMOTION_GET_PROMOTION_LIST'],
		}),
		getRebateExcludeGameList: builder.query<
			IAxiosResponse<IRebateExcludeGameData[]>,
			{ langId: string; currencyId: number }
		>({
			query: ({ langId, currencyId }) => ({
				url: `${promotionApiUrl.getRebateExcludeGameList}/${langId}`,
				method: 'POST',
				data: { currencyId },
			}),
		}),
		getSpecialPromotionList: builder.query<
			IAxiosResponse<IPromotionData[]>,
			{ langId: string }
		>({
			query: ({ langId, ...data }) => ({
				url: `${promotionApiUrl.getSpecialPromotionList}/${langId}`,
				method: 'POST',
				data: { deviceType: getDeviceType(), ...data },
			}),
			providesTags: ['PROMOTION_GET_SPECIAL_PROMOTION_LIST'],
		}),
		getDepositPromotionList: builder.query<
			IAxiosResponse<IDepositPromotionData[]>,
			{ langId: string }
		>({
			query: ({ langId, ...data }) => ({
				url: `${promotionApiUrl.getDepositPromotionList}/${langId}`,
				method: 'POST',
				data: { deviceType: getDeviceType(), ...data },
			}),
		}),
		setSpecialCode: builder.mutation<
			IAxiosResponse<void>,
			{ langId: string; specialCode: string }
		>({
			query: ({ langId, ...data }) => ({
				url: `${promotionApiUrl.setSpecialCode}/${langId}`,
				method: 'POST',
				data: { deviceType: getDeviceType(), ...data },
			}),
			invalidatesTags: ['PROMOTION_GET_SPECIAL_PROMOTION_LIST'],
		}),
		setClaimPromotion: builder.mutation<
			IAxiosResponse<void>,
			ISetClaimPromotionArgs
		>({
			query: ({ langId, ...data }) => ({
				url: `${promotionApiUrl.setClaimPromotion}/${langId}`,
				method: 'POST',
				data: { deviceType: getDeviceType(), ...data },
			}),
			invalidatesTags: ['PROMOTION_GET_PROMOTION_LIST'],
		}),
		setDepositPromotionQueue: builder.mutation<
			IAxiosResponse<void>,
			ISetDepositPromotionQueueArgs
		>({
			query: ({ langId, ...data }) => ({
				url: `${promotionApiUrl.setDepositPromotionQueue}/${langId}`,
				method: 'POST',
				data: { deviceType: getDeviceType(), ...data },
			}),
		}),
		getPopUpPromotion: builder.query<
			IAxiosResponse<{ bonusCode: null | string }>,
			IGetPopUpPromotionArgs
		>({
			query: ({ langId }) => ({
				url: `${promotionApiUrl.getPopUpPromotion}/${langId}`,
				method: 'POST',
				data: { deviceType: getDeviceType() },
			}),
		}),
		getRetentionPromotion: builder.query<
			IAxiosResponse<{
				bonusCode: null | string
			}>,
			IGetPopUpPromotionArgs
		>({
			query: ({ langId }) => ({
				url: `${promotionApiUrl.getRetentionPromotion}/${langId}`,
				method: 'POST',
				data: { deviceType: getDeviceType() },
			}),
		}),

		// 2024/12/16 為了後台新功能：first deposit, redeposit, special deposit有在名單內可以直接領取的API
		getPromotionUploadCustList: builder.query<
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			IAxiosResponse<IPromotionData[]>,
			{ langId: string; currencyId: number }
		>({
			query: ({ langId, currencyId }) => ({
				url: `${promotionApiUrl.getPromotionUploadCustList}/${langId}`,
				method: 'POST',
				data: { deviceType: getDeviceType(), currencyId },
			}),
			// providesTags: ['PROMOTION_GET_PROMOTION_LIST'],
		}),

		// 2024/12/16 為了後台新功能：first deposit, redeposit, special deposit有在名單內可以直接領取的API(直接送給後端，少一層請客服處理的流程)
		setClaimPromotionForUploadCustList: builder.mutation<
			IAxiosResponse<void>,
			ISetClaimPromotionArgs
		>({
			query: ({ langId, ...data }) => ({
				url: `${promotionApiUrl.setClaimPromotionForUploadCustList}/${langId}`,
				method: 'POST',
				data: { deviceType: getDeviceType(), ...data },
			}),
			invalidatesTags: ['PROMOTION_GET_PROMOTION_LIST'],
		}),
	}),
})

/**
 * @description 更新 end point name 'getPromotionListV3' 的指定資料，減少 call api 次數
 */
export const updatePromotionData = ({
	langId,
	currencyId,
	bonusCode,
	bonusData: {
		bonus,
		rollover,
		turnover,
		fullFillType,
		promoCategoryId,
		status,
	},
}: {
	langId: string
	currencyId: number
	bonusCode: string
	bonusData: ICustSpecificBonusData
}) => {
	return promotionApi.util.updateQueryData(
		'getPromotionListV3',
		{ langId, currencyId },
		response => {
			const index = findIndex(response.data, { bonusCode })
			// * cloneDeep 之前會是 Proxy(Array)格式
			const newData = cloneDeep(response.data)
			newData[index] = {
				...newData[index],
				bonus,
				status,
				fullFillType,
				custRollOver: rollover,
				custTurnOver: turnover,
				categoryId: promoCategoryId,
			}
			response.data = newData
		}
	)
}

/**
 * @description 更新 end point name 'getPromotionDetail' 的指定資料，減少 call api 次數
 */
export const updatePromotionDetail = ({
	langId,
	currencyId,
	bonusCode,
	bonusData: {
		bonus,
		rollover,
		turnover,
		fullFillType,
		promoCategoryId,
		status,
	},
}: {
	langId: string
	currencyId: number
	bonusCode: string
	bonusData: ICustSpecificBonusData
}) => {
	return promotionApi.util.updateQueryData(
		'getPromotionDetail',
		{ bonusCode, langId, currencyId },
		response => {
			// * cloneDeep 之前會是 Proxy(Array)格式
			let newData = cloneDeep(response.data)
			newData = {
				...newData,
				bonus,
				status,
				fullFillType,
				custRollOver: rollover,
				custTurnOver: turnover,
				categoryId: promoCategoryId,
			}
			response.data = newData
		}
	)
}

export const {
	useLazyGetPopUpPromotionQuery,
	useGetRetentionPromotionQuery,
	useLazyGetRetentionPromotionQuery,
	useGetPromotionListV3Query,
	useLazyGetPromotionListV3Query,
	useLazyGetPromotionDetailQuery,
	useGetRebateExcludeGameListQuery,
	useGetPromotionDetailQuery,
	useGetSpecialPromotionListQuery,
	useGetDepositPromotionListQuery,
	useSetSpecialCodeMutation,
	useSetClaimPromotionMutation,
	useSetDepositPromotionQueueMutation,
	useGetPromotionUploadCustListQuery,
	useSetClaimPromotionForUploadCustListMutation,
} = promotionApi
