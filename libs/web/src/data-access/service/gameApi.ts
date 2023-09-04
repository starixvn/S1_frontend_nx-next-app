import { baseAxios, gameApiUrl } from '@nx-next-app/service'
import { AxiosRequestConfig } from 'axios'

export const getSlotGamePage = async (
	params: {
		deviceType: number
		currencyId: number
	},
	config: AxiosRequestConfig
) => {
	const { data: { data: initSlotsGameData } = {} } = await baseAxios.post(
		`${gameApiUrl.getSlotGamePage}`,
		params,
		config
	)

	return initSlotsGameData
}
