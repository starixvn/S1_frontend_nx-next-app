import { IAxiosResponse } from '../axiosBaseQuery'
import { rootApi } from '../rootApi/api'
import { IGetLineUserIdTypeArgs } from './type'

export const lineLoginApiUrl = {
	lineLoginDirect: 'LineLogin/LineLoginDirect',
	lineCallback: 'LineLogin/LineCallback',
}

export const lineLoginApi = rootApi.injectEndpoints({
	endpoints: build => ({
		// * 拿到 line 的回傳 url 去做導轉
		getLineLoginDirectUrl: build.query<
			IAxiosResponse<string>,
			{ type: number }
		>({
			query: ({ type }) => ({
				url: lineLoginApiUrl.lineLoginDirect,
				method: 'POST',
				data: { type },
			}),
		}),
		// * 拿到回傳的 userId 存起來，以及用 type 去做導轉
		getLineUserId: build.query<IAxiosResponse<string>, IGetLineUserIdTypeArgs>({
			query: ({ langId, lineLoginResponse, loginData }) => ({
				url: `${lineLoginApiUrl.lineCallback}/${langId}`,
				method: 'POST',
				data: { lineLoginResponse, loginData },
			}),
		}),
	}),
})

export const { useLazyGetLineLoginDirectUrlQuery, useLazyGetLineUserIdQuery } =
	lineLoginApi
