import {
	baseAxios,
	paymentApiUrl,
	IWithdrawalSetting,
} from '@nx-next-app/service'
import { AxiosRequestConfig } from 'axios'

export const getWithdrawalBlockSetting = async (
	config: AxiosRequestConfig
): Promise<IWithdrawalSetting[]> => {
	try {
		const { data: { data } = {} } = await baseAxios.post(
			`${paymentApiUrl.getWithdrawalBlockSetting}`,
			null,
			config
		)
		return data || []
	} catch (error) {
		return []
	}
}
