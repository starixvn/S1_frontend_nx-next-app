import {
	baseAxios,
	IGetNewsArgs,
	INewsData,
	newsApiUrl,
} from '@nx-next-app/service'

export const getNews = async ({
	langId,
	...args
}: IGetNewsArgs): Promise<INewsData[]> => {
	const { data: { data = [] } = {} } = await baseAxios.post(
		`${newsApiUrl.getNewsList}/${langId}`,
		{ ...args }
	)
	return data
}
