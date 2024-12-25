import { authApiUrl, baseAxios, IAxiosResponse } from '@nx-next-app/service'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { IVerifyTokenArgs } from 'libs/web/src/service/authApi/type'

export const checkSignIn = async (
	params: null,
	config: AxiosRequestConfig
): Promise<boolean> => {
	try {
		const { data: { errorCode } = {} } = await baseAxios.post(
			authApiUrl.checkSignIn,
			params,
			config
		)
		return errorCode === 0
	} catch (error) {
		return false
	}
}

export const verifyToken = async (
	params: IVerifyTokenArgs
): Promise<AxiosResponse<IAxiosResponse<void>>> => {
	return baseAxios.post(authApiUrl.verifyToken, params)
}
