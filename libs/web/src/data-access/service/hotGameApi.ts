import {
	baseAxios,
	hotGameApiUrl,
	IGetHotGameListArgs,
	IHotGameData,
} from '@nx-next-app/service'

export const getHotGame = async ({
	deviceType,
  top,
  tpCategory,
	currencyId,
}: IGetHotGameListArgs): Promise<IHotGameData> => {
	try {
		const { data: { data = {} } = {} } = await baseAxios.post(
			hotGameApiUrl.getHotGameList,
			{ deviceType, currencyId, top, tpCategory }
		)
		return data
	} catch (error) {
		return {} as IHotGameData
	}
}
