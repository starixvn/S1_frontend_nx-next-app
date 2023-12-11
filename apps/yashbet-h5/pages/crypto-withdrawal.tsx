import { GetServerSideProps } from 'next'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { Layout, CryptoWithdrawal } from '@nx-next-app/features/F0006/h5'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	CryptoWalletProvider,
	WithdrawalProvider,
} from '@nx-next-app/features/F0006/providers'

const CryptoWithdrawalPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
}: InitialPropsInterface) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData}>
					<WithdrawalProvider>
						<CryptoWalletProvider>
							<CryptoWithdrawal />
						</CryptoWalletProvider>
					</WithdrawalProvider>
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

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

export default CryptoWithdrawalPage
