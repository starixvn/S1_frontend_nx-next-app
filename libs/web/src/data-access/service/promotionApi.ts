import {
	IGetPromotionArgs,
	IPromotionData,
} from 'libs/web/src/service/promotionApi/type'
import { baseAxios } from '@nx-next-app/service'
import { promotionApiUrl } from 'libs/web/src/service/promotionApi/api'
import { AxiosRequestConfig } from 'axios'

export const getPromotion = async (
	params: IGetPromotionArgs,
	config: AxiosRequestConfig
): Promise<IPromotionData[]> => {
	const { langId, currencyId, deviceType } = params
	const { data: { data } = {} } = await baseAxios.post(
		`${promotionApiUrl.getPromotionListV3}/${langId}`,
		{ currencyId, deviceType },
		config
	)
	return data
}
