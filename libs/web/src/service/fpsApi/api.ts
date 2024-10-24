import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import { IFPSChecksArgs } from './type'

export const fpsApiUrl = {
	checks: 'FPS/Checks',
}

const fpsApi = rootApi.injectEndpoints({
	endpoints: builder => ({
		fpsChecks: builder.query<IAxiosResponse<null>, IFPSChecksArgs>({
			query: data => ({ url: fpsApiUrl.checks, method: 'POST', data }),
		}),
	}),
})

export const { useLazyFpsChecksQuery } = fpsApi
