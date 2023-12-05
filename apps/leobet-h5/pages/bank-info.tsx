import { GetServerSideProps } from 'next'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	useServerSideInitialPropsFetcher,
	InitialPropsInterface,
} from '@nx-next-app/hooks'
import { BankInfoProvider } from '@nx-next-app/features/F0002/providers'
import { Layout, BankInfo } from '@nx-next-app/features/F0002/h5'

const BankInfoPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
}: InitialPropsInterface) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<BankInfoProvider>
					<Layout persistSEOData={persistSEOData}>
						<BankInfo />
					</Layout>
				</BankInfoProvider>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export default BankInfoPage

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
