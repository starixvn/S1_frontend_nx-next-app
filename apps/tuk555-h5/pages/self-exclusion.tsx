import { GetServerSideProps } from 'next'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	useServerSideInitialPropsFetcher,
	InitialPropsInterface,
} from '@nx-next-app/hooks'
import { Layout, SelfExclusion } from '@nx-next-app/features/F0001/h5'

const SelfExclusionPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
}: InitialPropsInterface) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData}>
					<SelfExclusion />
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export default SelfExclusionPage

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)

	if (!initialProps.originIsSignIn) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	return {
		props: {
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}
