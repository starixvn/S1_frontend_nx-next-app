import React from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { CryptoWalletProvider } from '@nx-next-app/features/F0001/providers'
import { Layout, CryptoWallet } from '@nx-next-app/features/F0001/h5'

type IHomePageProps = InitialPropsInterface

const CryptoWalletPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
}: IHomePageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<CryptoWalletProvider>
					<Layout persistSEOData={persistSEOData}>
						<CryptoWallet />
					</Layout>
				</CryptoWalletProvider>
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

export default CryptoWalletPage
