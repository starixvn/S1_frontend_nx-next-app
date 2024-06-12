import {
	IAppDownloadLinks,
	useGetAppDownloadLinksQuery,
} from '@nx-next-app/service'

const useDownloadLinks = () => {
	const {
		data: { androidDownLoadUrl, iosDownloadUrl, androidTypeName, iosTypeName },
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
					androidDownLoadUrl: formatData['Android']?.downloadLink,
					iosDownloadUrl: formatData['IOS']?.downloadLink,
					androidTypeName: formatData['Android']?.appTypeName,
					iosTypeName: formatData['IOS']?.appTypeName,
				},
			}
		},
	})

	return {
		androidDownLoadUrl,
		androidTypeName,
		iosDownloadUrl,
		iosTypeName,
	}
}

export { useDownloadLinks }
