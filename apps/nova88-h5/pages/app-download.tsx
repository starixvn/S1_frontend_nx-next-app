import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { AppDownload, Layout } from '@nx-next-app/features/F0001/h5'
import { AppDownloadProvider } from '@nx-next-app/features/F0001/providers'
import { InitialPropsInterface } from '@nx-next-app/hooks'
import { APP_DOWNLOAD_LIST } from '@nx-next-app/site/nova88/data/appDownload'
import { GetServerSideProps } from 'next'

type IAppDownloadPageProps = InitialPropsInterface

const AppDownloadPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
}: IAppDownloadPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
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
	return {
		redirect: {
			destination: '/',
			permanent: false,
		},
	}
	// const initialProps = await useServerSideInitialPropsFetcher(context)

	// return {
	// 	props: {
	// 		...initialProps,
	// 		...(await serverSideTranslations(context.locale)),
	// 	},
	// }
}

export default AppDownloadPage
