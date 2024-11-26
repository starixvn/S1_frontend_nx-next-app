import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import { IRegisterRejectClickArgs } from './type'

export const internalApiUrl = {
	registerRejectClick: 'Internal/RegisterRejectClick',
}

export const internalApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		registerRejectClick: builder.mutation<
			IAxiosResponse<void>,
			IRegisterRejectClickArgs
		>({
			query: data => ({
				url: internalApiUrl.registerRejectClick,
				method: 'POST',
				data,
			}),
		}),
	}),
})

export const { useRegisterRejectClickMutation } = internalApi
