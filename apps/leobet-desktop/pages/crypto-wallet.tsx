import React from 'react'
import { GetServerSideProps } from 'next'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { CryptoWalletProvider } from '@nx-next-app/features/F0001/providers'
import {
	Layout,
	LeftMenu,
	CryptoWallet,
} from '@nx-next-app/features/F0001/desktop'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'

type ICryptoWalletPageProps = InitialPropsInterface

const CryptoWalletPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	footerData,
}: ICryptoWalletPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<CryptoWalletProvider>
					<Layout persistSEOData={persistSEOData} footerData={footerData}>
						<main>
							<section className='inside'>
								<LeftMenu />
								<CryptoWallet />
							</section>
						</main>
					</Layout>
				</CryptoWalletProvider>
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

export default CryptoWalletPage
