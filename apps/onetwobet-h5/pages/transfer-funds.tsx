import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { Layout } from '@nx-next-app/features/F0001/h5'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { TransferFundsProvider } from '@nx-next-app/operations'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TransferFunds from '../components/transfer-funds'

const TransferPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
}: InitialPropsInterface) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<TransferFundsProvider>
					<Layout persistSEOData={persistSEOData}>
						<TransferFunds />
					</Layout>
				</TransferFundsProvider>
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

export default TransferPage
