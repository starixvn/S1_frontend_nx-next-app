import { AxiosRequestConfig } from 'axios'
import {
	baseAxios,
	IBannerData,
	IGetBannerArgs,
	siteApiUrl,
} from '@nx-next-app/service'
import { ISEOData } from 'libs/web/src/data-access/type'

export const getSEOData = async (
	params: null,
	config: AxiosRequestConfig
): Promise<ISEOData> => {
	const { data: { data } = {} } = await baseAxios.post(
		siteApiUrl.getSEOData,
		params,
		config
	)

	return data
}

export const getBanner = async (
	params: IGetBannerArgs,
	config: AxiosRequestConfig
): Promise<IBannerData[]> => {
	const { langId, currencyId, bannerTypes } = params
	const result: IBannerData[] = []
	const fetchBanner = async (bannerType: number) => {
		const {
			data: { data },
		} = await baseAxios.post(`${siteApiUrl.getBanner}/${langId}`, {
			currencyId,
			bannerType,
			config,
		})

		result.push(...data)
	}
	for (const bannerType of bannerTypes) {
		await fetchBanner(bannerType)
	}

	return result
}
