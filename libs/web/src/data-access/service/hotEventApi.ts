import {
	baseAxios,
	hotEventApiUrl,
	IGetHotEventListArgs,
	IHotEventData,
} from '@nx-next-app/service'

export const getHotEvent = async ({
	langId,
}: IGetHotEventListArgs): Promise<IHotEventData[]> => {
	const { data: { data = [] } = {} } = await baseAxios.post(
		`${hotEventApiUrl.getHotEventList}/${langId}`
	)
	return data
}
