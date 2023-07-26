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
	const { data: { data } = {} } = await baseAxios.post(
		siteApiUrl.getSeo,
		params,
		config
	)

	return data
}

export const getTpIds = async (
	params: null,
	config: AxiosRequestConfig
): Promise<number[]> => {
	const { data: { data } = {} } = await baseAxios.post(
		siteApiUrl.getTpIds,
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

export const getVipBanner = async (
	params: IGetVipBannerArgs,
	config: AxiosRequestConfig
): Promise<IVipBannerData> => {
	const { data: { data } = {} } = await baseAxios.post(
		siteApiUrl.getVipBanner,
		params,
		config
	)

	return data
}
