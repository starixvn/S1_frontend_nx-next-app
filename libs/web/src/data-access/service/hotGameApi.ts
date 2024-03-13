import {
	baseAxios,
	hotGameApiUrl,
	IGetHotGameListArgs,
	IHotGameData,
} from '@nx-next-app/service'

export const getHotGame = async ({
	deviceType,
	currencyId,
}: IGetHotGameListArgs): Promise<IHotGameData> => {
	try {
		const { data: { data = {} } = {} } = await baseAxios.post(
			hotGameApiUrl.getHotGameList,
			{ deviceType, currencyId }
		)
		return data
	} catch (error) {
		return {} as IHotGameData
	}
}
