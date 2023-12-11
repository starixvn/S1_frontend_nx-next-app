import { AxiosRequestConfig } from 'axios'
import {
	accountStrictApiUrl,
	baseAxios,
	IUserInfoData,
} from '@nx-next-app/service'

export const getCustProfile = async (
	params: null,
	config: AxiosRequestConfig
): Promise<IUserInfoData> => {
	const { data: { data } = {} } = await baseAxios.post(
		accountStrictApiUrl.getCustProfile,
		params,
		config
	)

	return data
}
