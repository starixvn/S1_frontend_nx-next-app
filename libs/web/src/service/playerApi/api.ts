import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import { IAppDownloadLinks } from './type'

export const playerApiUrl = {
	getAppLink: 'Player/GetAppLink',
}

export const playerApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getAppDownloadLinks: builder.query<
			IAxiosResponse<IAppDownloadLinks[]>,
			null
		>({
			query: data => ({
				url: playerApiUrl.getAppLink,
				method: 'POST',
				data,
			}),
		}),
	}),
})

export const { useGetAppDownloadLinksQuery } = playerApi
