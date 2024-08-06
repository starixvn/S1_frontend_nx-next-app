import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import {
	IAppDownloadLinks,
	IGetCustNotificationArgs,
	ISetCustNotificationArgs,
	TGetCustNotificationData,
	TSetCustNotificationData,
} from './type'

export const playerApiUrl = {
	gcetCustNotification: 'Player/GetCustNotification',
	setCustNotification: 'Player/SetCustNotification',
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
		gcetCustNotification: builder.query<
			IAxiosResponse<TGetCustNotificationData>,
			IGetCustNotificationArgs
		>({
			query: data => ({
				url: playerApiUrl.gcetCustNotification,
				method: 'POST',
				data,
			}),
		}),
		setCustNotification: builder.query<
			IAxiosResponse<TSetCustNotificationData>,
			ISetCustNotificationArgs
		>({
			query: data => ({
				url: playerApiUrl.setCustNotification,
				method: 'POST',
				data,
			}),
		}),
	}),
})

export const {
	useGetAppDownloadLinksQuery,
	useLazyGcetCustNotificationQuery,
	useLazySetCustNotificationQuery,
} = playerApi
