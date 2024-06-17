import React, { createContext, ReactNode, useContext } from 'react'
import {
	IAppDownloadLinks,
	useGetAppDownloadLinksQuery,
} from '@nx-next-app/service'

interface IAppDownloadProviderProps {
	children: ReactNode
	APP_DOWNLOAD_LIST: {
		id: number
		imgName: string
		displayKey: string
	}[]
}

export interface AppDownloadContextInterface {
	IOSDownloadUrl: string
	androidDownLoadUrl: string
	APP_DOWNLOAD_LIST: {
		id: number
		imgName: string
		displayKey: string
	}[]
}

export const AppDownloadContext = createContext<AppDownloadContextInterface>(
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	null!
)

export const useAppDownload = () => {
	return useContext(AppDownloadContext)
}

const AppDownloadProvider = ({
	children,
	APP_DOWNLOAD_LIST,
}: IAppDownloadProviderProps) => {
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

	const value: AppDownloadContextInterface = {
		IOSDownloadUrl,
		androidDownLoadUrl,
		APP_DOWNLOAD_LIST,
	}

	return (
		<AppDownloadContext.Provider value={value}>
			{children}
		</AppDownloadContext.Provider>
	)
}

export { AppDownloadProvider }
