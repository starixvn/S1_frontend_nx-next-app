import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { AppDownload, Layout } from '@nx-next-app/features/F0001/desktop'
import { AppDownloadProvider } from '@nx-next-app/features/F0001/providers'
import { InitialPropsInterface } from '@nx-next-app/hooks'
import { APP_DOWNLOAD_LIST } from '@nx-next-app/site/nova88/data/appDownload'
import { IFooterData } from '@nx-next-app/types'
import { GetServerSideProps } from 'next'

interface IAppDownloadPageProps extends InitialPropsInterface {
	persistFooterData: IFooterData
}

const AppDownloadPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
	persistStaticFileDomainData,
}: IAppDownloadPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<AppDownloadProvider APP_DOWNLOAD_LIST={APP_DOWNLOAD_LIST}>
					<Layout
						persistSEOData={persistSEOData}
						footerData={persistFooterData}
					>
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
	// const { originCookies } = initialProps
	//
	// const { langId, currencyId } = {
	// 	langId: originCookies[ENV_COOKIE_NAMES.LangId] as string,
	// 	currencyId: Number(originCookies[ENV_COOKIE_NAMES.CurrencyId]),
	// }
	//
	// return {
	// 	props: {
	// 		persistFooterData: FOOTER_DATA({ langId, currencyId }),
	// 		...initialProps,
	// 		...(await serverSideTranslations(context.locale)),
	// 	},
	// }
}

export default AppDownloadPage
