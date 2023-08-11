import {
	IAppDownloadLinks,
	useGetAppDownloadLinksQuery,
} from '@nx-next-app/service'

const useDownloadLinks = () => {
	const {
		data: { androidDownLoadUrl, iosDownloadUrl },
	} = useGetAppDownloadLinksQuery(null, {
		selectFromResult: ({ data: { data: originList = [] } = {} }) => {
			const formatData: Record<string, IAppDownloadLinks> = originList.reduce(
				(acc: Record<string, IAppDownloadLinks>, cur: IAppDownloadLinks) => {
					return { ...acc, [cur.appTypeName]: cur }
				},
				{}
			)
			return {
				data: {
					androidDownLoadUrl: formatData['Andriod']?.downloadLink,
					iosDownloadUrl: formatData['IOS']?.downloadLink,
				},
			}
		},
	})

	return {
		androidDownLoadUrl,
		iosDownloadUrl,
	}
}

export { useDownloadLinks }
