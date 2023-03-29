import { baseAxios, siteApiUrl } from '../service'

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
