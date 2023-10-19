import { rootApi } from '../rootApi/api'
import { IAnnouncementData, IGetAnnouncementArgs } from './type'
import { IAxiosResponse } from '../axiosBaseQuery'

export const messageApiUrl = {
	announcement: 'Message/GetAnnouncement',
}

const messageApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		getAnnouncement: builder.query<
			IAxiosResponse<IAnnouncementData[] | null>,
			IGetAnnouncementArgs
		>({
			query: ({ langId, currencyId }) => ({
				url: `${messageApiUrl.announcement}/${langId}`,
				method: 'POST',
				data: { currencyId },
			}),
		}),
	}),
})

export const { useGetAnnouncementQuery } = messageApi
