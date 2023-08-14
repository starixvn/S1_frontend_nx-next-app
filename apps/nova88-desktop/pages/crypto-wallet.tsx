import React from 'react'
import { GetServerSideProps } from 'next'
import { AuthProvider } from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout, LeftMenu } from '@nx-next-app/features/F0001/desktop'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'

type ICryptoWalletPageProps = InitialPropsInterface

// * TODO: wip todo
const CryptoWalletPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	footerData,
}: ICryptoWalletPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<Layout persistSEOData={persistSEOData} footerData={footerData}>
				<main>
					<section className='inside'>
						<LeftMenu />
						<br />
						<br />
						<br />
						<h1 style={{ color: 'black' }}>CryptoWallet Page</h1>
						<br />
						<br />
						<br />
					</section>
				</main>
			</Layout>
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

export default CryptoWalletPage
