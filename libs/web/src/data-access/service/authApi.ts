import { AxiosRequestConfig } from 'axios'
import { authApiUrl, baseAxios } from '@nx-next-app/service'

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
