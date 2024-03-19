/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { AxiosRequestConfig } from 'axios'
import {
	baseAxios,
	IBannerData,
	IGetBannerArgs,
	IGetVipBannerArgs,
	IVipBannerData,
	siteApiUrl,
} from '@nx-next-app/service'
import { ISEOData } from 'libs/web/src/data-access/type'

export const getSEOData = async (
	params: null,
	config: AxiosRequestConfig
): Promise<ISEOData> => {
	try {
		const { data: { data } = {} } = await baseAxios.post(
			siteApiUrl.getSeo,
			params,
			config
		)

		return data
	} catch (error) {
		return {} as ISEOData
	}
}

export const getTpIds = async (
	params: null,
	config: AxiosRequestConfig
): Promise<number[]> => {
	try {
		const { data: { data } = {} } = await baseAxios.post(
			siteApiUrl.getTpIds,
			params,
			config
		)
		return data || []
	} catch (error) {
		return []
	}
}

export const getBanner = async (
	params: IGetBannerArgs,
	config: AxiosRequestConfig
): Promise<IBannerData[]> => {
	const { langId, currencyId, bannerTypes } = params
	const result: IBannerData[] = []

	const fetchBanner = async (bannerType: number) => {
		try {
			const response = await baseAxios.post(
				`${siteApiUrl.getBanner}/${langId}`,
				{
					currencyId,
					bannerType,
					config,
				}
			)
			result.push(...response.data.data)
		} catch (error) {
			console.error(`Error fetching banner type ${bannerType}:`, error)
		}
	}

	const fetchPromises = bannerTypes.map(bannerType => fetchBanner(bannerType))

	await Promise.all(fetchPromises)

	return result
}

export const getVipBanner = async (
	params: IGetVipBannerArgs,
	config: AxiosRequestConfig
): Promise<IVipBannerData> => {
	const defaultVipBannerData: IVipBannerData = {
		lastUpdateTime: '',
		vipBannerData: [],
	}

	try {
		const { data: { data } = {} } = await baseAxios.post(
			siteApiUrl.getVipBanner,
			params,
			config
		)
		return data || defaultVipBannerData
	} catch (error) {
		return defaultVipBannerData
	}
}
