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
	try {
		const { data: { data: initSlotsGameData } = {} } = await baseAxios.post(
			`${gameApiUrl.getSlotGamePage}`,
			params,
			config
		)
		return initSlotsGameData || {}
	} catch (error) {
		return {}
	}
}

export const getLobbyGamePage = async (
	params: {
		siteId: number
		currencyId: number
		lobbyCategoryIds: string
	},
	config: AxiosRequestConfig
) => {
	try {
		const { data: { data: initLobbyGameData } = {} } = await baseAxios.post(
			`${gameApiUrl.getLobbyGamePage}`,
			params,
			config
		)
		return initLobbyGameData || {}
	} catch (error) {
		return {}
	}
}
