import {
	baseAxios,
	IGetNewsArgs,
	IGetNewsByIdArgs,
	INewsData,
	INewsDetailData,
	newsApiUrl,
} from '@nx-next-app/service'

export const getNews = async ({
	langId,
	...args
}: IGetNewsArgs): Promise<INewsData[]> => {
	try {
		const { data: { data = [] } = {} } = await baseAxios.post(
			`${newsApiUrl.getNewsList}/${langId}`,
			{ ...args }
		)
		return data
	} catch (error) {
		return []
	}
}

export const getNewsById = async ({
	langId,
	...args
}: IGetNewsByIdArgs): Promise<INewsDetailData> => {
	const { data: { data } = {} } = await baseAxios.post(
		`${newsApiUrl.getNewsById}/${langId}`,
		{ ...args }
	)
	return data ?? {}
}
