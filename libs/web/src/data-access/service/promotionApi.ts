import {
	baseAxios,
	IGetPromotionArgs,
	IPromotionData,
	promotionApiUrl,
} from '@nx-next-app/service'
import { AxiosRequestConfig } from 'axios'
import { getDeviceType } from '../../utils/client'

export const getPromotion = async (
	params: IGetPromotionArgs,
	config: AxiosRequestConfig
): Promise<IPromotionData[]> => {
	const { langId, currencyId } = params

	try {
		const { data: { data } = {} } = await baseAxios.post(
			`${promotionApiUrl.getPromotionListV3}/${langId}`,
			{ currencyId, deviceType: getDeviceType() },
			config
		)
		return data || []
	} catch (error) {
		return []
	}
}
