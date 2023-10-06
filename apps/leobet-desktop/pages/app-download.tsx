import React from 'react'
import { GetServerSideProps } from 'next'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { Layout, AppDownload } from '@nx-next-app/features/F0001/desktop'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AppDownloadProvider } from '@nx-next-app/features/F0001/providers'
import { APP_DOWNLOAD_LIST } from '@nx-next-app/site/leobet/data/appDownload'

type IAppDownloadPageProps = InitialPropsInterface
const AppDownloadPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	footerData,
}: IAppDownloadPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<AppDownloadProvider APP_DOWNLOAD_LIST={APP_DOWNLOAD_LIST}>
					<Layout persistSEOData={persistSEOData} footerData={footerData}>
						<AppDownload />
					</Layout>
				</AppDownloadProvider>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	return {
		props: {
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default AppDownloadPage
