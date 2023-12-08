import React from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { EWalletProvider } from '@nx-next-app/features/F0002/providers'
import { Layout, EWallet } from '@nx-next-app/features/F0002/h5'

type IHomePageProps = InitialPropsInterface

const EWalletPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
}: IHomePageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<EWalletProvider>
					<Layout persistSEOData={persistSEOData}>
						<EWallet />
					</Layout>
				</EWalletProvider>
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

export default EWalletPage
