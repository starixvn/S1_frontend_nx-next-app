import {
	baseAxios,
	IGetLatestHighlightDataArgs,
	IHighlightData,
	videoApiUrl,
} from '@nx-next-app/service'

export const getLatestHighlightVideo = async ({
	langId,
}: IGetLatestHighlightDataArgs): Promise<IHighlightData> => {
	const { data: { data } = {} } = await baseAxios.post(
		`${videoApiUrl.getLatestHighlight}/${langId}`
	)
	return data
}
