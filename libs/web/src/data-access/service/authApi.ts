import { AxiosRequestConfig } from 'axios'
import { authApiUrl, baseAxios } from '@nx-next-app/service'

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
