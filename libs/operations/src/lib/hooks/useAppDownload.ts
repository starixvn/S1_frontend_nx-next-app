import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import {
	IAppDownloadLinks,
	useGetAppDownloadLinksQuery,
} from '@nx-next-app/service'
import { setCookie } from 'cookies-next'
import { useBoolean } from 'usehooks-ts'

const useAppDownload = (persistAppDownloadHint?: boolean) => {
	const {
		value: isAppDownloadHintActive,
		setFalse: setAppDownloadHintActiveFalse,
	} = useBoolean(!persistAppDownloadHint)

	const onCloseAppDownloadHint = () => {
		setCookie(ENV_COOKIE_NAMES.AppDownloadHint, true)
		setAppDownloadHintActiveFalse()
	}

	/**
	 * 2024.10.11 - 12Bet app download (原本用provider的，但12Bet是全站都要能開啟彈窗，因此改成寫在hook):
	 */
	const {
		data: { androidDownLoadUrl, IOSDownloadUrl },
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
					IOSDownloadUrl: formatData['IOS']?.downloadLink,
				},
			}
		},
	})

	return {
		isAppDownloadHintActive,
		onCloseAppDownloadHint,
		androidDownLoadUrl,
		IOSDownloadUrl,
	}
}

export { useAppDownload }
