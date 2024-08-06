import { NovaAuthProvider } from '@nova88-h5/providers'
import { GlobalDataProvider } from '@nx-next-app/data-access'
import { AppDownload, Layout } from '@nx-next-app/features/F0001/h5'
import { AppDownloadProvider } from '@nx-next-app/features/F0001/providers'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { APP_DOWNLOAD_LIST } from '@nx-next-app/site/nova88/data/appDownload'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type IAppDownloadPageProps = InitialPropsInterface

const AppDownloadPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
}: IAppDownloadPageProps) => {
	return (
		<NovaAuthProvider
			originIsSignIn={originIsSignIn}
			originCookies={originCookies}
		>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<AppDownloadProvider APP_DOWNLOAD_LIST={APP_DOWNLOAD_LIST}>
					<Layout persistSEOData={persistSEOData}>
						<AppDownload />
					</Layout>
				</AppDownloadProvider>
			</GlobalDataProvider>
		</NovaAuthProvider>
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
