import { AxiosRequestConfig } from 'axios'
import { authApiUrl, baseAxios, siteApiUrl } from '../service'

export const getPromotionListV3 = ({
	locale,
	currencyId,
	deviceType,
}: {
	locale: string
	currencyId: string | number | string[]
	deviceType: string | number | string[]
}) =>
	baseAxios.post(`${siteApiUrl.getPromotionListV3}/${locale}`, {
		currencyId,
		deviceType,
	})

export const checkSignIn = async (
	params: null,
	config: AxiosRequestConfig
): Promise<boolean> => {
	const { data: { errorCode } = {} } = await baseAxios.post(
		authApiUrl.checkSignIn,
		params,
		config
	)
	const isSignIn = errorCode === 0
	return isSignIn
}
