import {
	baseAxios,
	IGetLineUserIdTypeArgs,
	ILineRegisterData,
	lineLoginApiUrl,
} from '@nx-next-app/service'
import { AxiosRequestConfig } from 'axios'

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
