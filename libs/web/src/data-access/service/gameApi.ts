import { baseAxios } from '@nx-next-app/service'
import { gameApiUrl } from 'libs/web/src/service/gameApi/api'
import { AxiosRequestConfig } from 'axios/index'

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
