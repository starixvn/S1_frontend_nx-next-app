import {
	baseAxios,
	hotGameApiUrl,
	IGetHotGameListArgs,
	IHotGameData
} from '@nx-next-app/service'
import { AxiosRequestConfig } from 'axios'

export const getHotGame = async ({
	deviceType,
  top,
  tpCategory,
	currencyId,
}: IGetHotGameListArgs,
config: AxiosRequestConfig): Promise<IHotGameData> => {
	try {
		const { data: { data = {} } = {} } = await baseAxios.post(
			hotGameApiUrl.getHotGameList,
			{ deviceType, currencyId, top, tpCategory },
			config
		)
		return data
	} catch (error) {
		console.log(error)
		return {} as IHotGameData
	}
}
