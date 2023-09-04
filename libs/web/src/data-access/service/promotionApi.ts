import {
	baseAxios,
	IGetPromotionArgs,
	IPromotionData,
	promotionApiUrl,
} from '@nx-next-app/service'
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
