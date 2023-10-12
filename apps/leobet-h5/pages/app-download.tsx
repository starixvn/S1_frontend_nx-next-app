import React from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { Layout, AppDownload } from '@nx-next-app/features/F0001/h5'
import { AppDownloadProvider } from '@nx-next-app/features/F0001/providers'
import { APP_DOWNLOAD_LIST } from '@nx-next-app/site/nova88/data/appDownload'

type IAppDownloadPageProps = InitialPropsInterface

const AppDownloadPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
}: IAppDownloadPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<AppDownloadProvider APP_DOWNLOAD_LIST={APP_DOWNLOAD_LIST}>
					<Layout persistSEOData={persistSEOData}>
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
