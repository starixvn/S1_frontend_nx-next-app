import { DeviceTypeEnum } from '@nx-next-app/types'
import { cloneDeep, findIndex } from 'lodash-es'
import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import { ICustSpecificBonusData } from '../accountApi/type'
import {
	IGetPromotionDetailArgs,
	IPromotionData,
	IRebateExcludeGameData,
	ISetClaimPromotionArgs,
} from './type'

export const promotionApiUrl = {
	getPromotionListV3: 'Promotion/GetPromotionListV3',
	getPromotionDetail: 'Promotion/GetPromotionDetail',
	getRebateExcludeGameList: 'Promotion/GetRebateExcludeGameList',
	getSpecialPromotionList: 'Promotion/GetSpecialPromotionListV2',
	setSpecialCode: 'Promotion/SetSpecialCode',
	setClaimPromotion: 'Promotion/SetClaimPromotion',
}

export const promotionApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getPromotionListV3: builder.query<
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			IAxiosResponse<IPromotionData[]>,
			{
				langId: string
				currencyId: number
				deviceType: DeviceTypeEnum
			}
		>({
			query: ({ langId, ...data }) => ({
				url: `${promotionApiUrl.getPromotionListV3}/${langId}`,
				method: 'POST',
				data,
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
				data,
			}),
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
			{
				langId: string
				deviceType: DeviceTypeEnum
			}
		>({
			query: ({ langId, ...data }) => ({
				url: `${promotionApiUrl.getSpecialPromotionList}/${langId}`,
				method: 'POST',
				data,
			}),
			providesTags: ['PROMOTION_GET_SPECIAL_PROMOTION_LIST'],
		}),
		setSpecialCode: builder.mutation<
			IAxiosResponse<void>,
			{
				langId: string
				deviceType: DeviceTypeEnum
				specialCode: string
			}
		>({
			query: ({ langId, ...data }) => ({
				url: `${promotionApiUrl.setSpecialCode}/${langId}`,
				method: 'POST',
				data,
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
				data,
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
	deviceType,
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
	deviceType: DeviceTypeEnum
	bonusCode: string
	bonusData: ICustSpecificBonusData
}) => {
	return promotionApi.util.updateQueryData(
		'getPromotionListV3',
		{ langId, currencyId, deviceType },
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
	deviceType,
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
	deviceType: DeviceTypeEnum
	bonusCode: string
	bonusData: ICustSpecificBonusData
}) => {
	return promotionApi.util.updateQueryData(
		'getPromotionDetail',
		{ bonusCode, langId, currencyId, deviceType },
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
	useGetPromotionListV3Query,
	useLazyGetPromotionListV3Query,
	useLazyGetPromotionDetailQuery,
	useGetRebateExcludeGameListQuery,
	useGetPromotionDetailQuery,
	useGetSpecialPromotionListQuery,
	useSetSpecialCodeMutation,
	useSetClaimPromotionMutation,
} = promotionApi
