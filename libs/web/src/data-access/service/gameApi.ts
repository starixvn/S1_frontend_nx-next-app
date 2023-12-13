import { baseAxios, gameApiUrl } from '@nx-next-app/service'
import { AxiosRequestConfig } from 'axios'

export enum SlotGameCategoryEnum {
	Jackpot = 2,
}
export const getSlotGamePage = async (
	params: {
		deviceType: number
		currencyId: number
		slotGameCategoryList?: SlotGameCategoryEnum[]
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
