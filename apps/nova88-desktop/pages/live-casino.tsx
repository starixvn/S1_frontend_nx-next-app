import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { GetServerSideProps } from 'next'
import { Layout, LiveCasino } from '@nx-next-app/features/F0001/desktop'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'

const LiveCasinoPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	footerData,
}: InitialPropsInterface) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData} footerData={footerData}>
					<LiveCasino />
				</Layout>
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

export default LiveCasinoPage
