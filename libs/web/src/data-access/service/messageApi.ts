import {
	baseAxios,
	IAnnouncementData,
	IGetAnnouncementArgs,
	messageApiUrl,
} from '@nx-next-app/service'

// 有沒有登入不影響 announcement 資料，故不帶 cookie
export const getAnnouncement = async (
	params: IGetAnnouncementArgs
): Promise<IAnnouncementData[]> => {
	const { langId, currencyId } = params
	const { data: { data } = {} } = await baseAxios.post(
		`${messageApiUrl.announcement}/${langId}`,
		{ currencyId }
	)
	return data
}
