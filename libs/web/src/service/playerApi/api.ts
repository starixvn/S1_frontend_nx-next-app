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
		// 當存在存款或提款單號時：
		// 1. 每分鐘打一次此 api 確認是否有單號
		// 2. 登入時，也會打一次此 api ( 有可能用戶存完款就登出 )，此時若有單號，則會通知用戶
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
		// 當存在存款或提款單號時：
		// 1. 向市場發送通知。
		// 2. 向用戶發送吐司訊息確認交易已處理。
		// 3. 調用API移除該單號，防止之後再次獲得相同的單號。
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
