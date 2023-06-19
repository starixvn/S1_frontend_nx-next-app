import { AxiosRequestConfig } from 'axios'
import {
	baseAxios,
	siteApiUrl,
	authApiUrl,
	lineLoginApiUrl,
	ILineRegisterData,
	IGetLineUserIdTypeArgs,
} from '../service'
import { ISEOData } from './type'

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

export const getLineUserId = async (
	params: IGetLineUserIdTypeArgs,
	config: AxiosRequestConfig
): Promise<ILineRegisterData> => {
	const { data: { data } = {} } = await baseAxios.post(
		lineLoginApiUrl.lineCallback,
		params,
		config
	)
	return data
}
