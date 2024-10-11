import { IAxiosResponse } from 'libs/web/src/service/axiosBaseQuery'
import {
	IGetNewsArgs,
	IGetNewsByIdArgs,
	INewsData,
	INewsDetailData,
} from 'libs/web/src/service/newsApi/type'
import { rootApi } from 'libs/web/src/service/rootApi/api'

export const newsApiUrl = {
	getNewsList: 'News/GetNews',
	getNewsById: 'News/GetNewsById',
}

const newsApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getNewsList: builder.query<
			IAxiosResponse<INewsData[] | null>,
			IGetNewsArgs
		>({
			query: ({ langId, currencyId, pageNumber, pageSize }) => ({
				url: `${newsApiUrl.getNewsList}/${langId}`,
				method: 'POST',
				data: {
					PageNumber: pageNumber,
					PageSize: pageSize,
					currencyId,
				},
			}),
		}),

		getNewsById: builder.query<
			IAxiosResponse<INewsDetailData | null>,
			IGetNewsByIdArgs
		>({
			query: ({ langId, currencyId, newsId }) => ({
				url: `${newsApiUrl.getNewsById}/${langId}`,
				method: 'POST',
				data: {
					NewsId: newsId,
					currencyId,
				},
			}),
		}),
	}),
})

export const { useGetNewsListQuery, useGetNewsByIdQuery } = newsApi
