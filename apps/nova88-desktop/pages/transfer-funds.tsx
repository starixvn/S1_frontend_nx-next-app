import React from 'react'
import { GetServerSideProps } from 'next'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	Layout,
	LeftMenu,
	TransferFunds,
} from '@nx-next-app/features/F0001/desktop'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { TransferFundsProvider } from '@nx-next-app/features/F0001/providers'

type ITransferFundsPageProps = InitialPropsInterface

const TransferFundsPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	footerData,
}: ITransferFundsPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<TransferFundsProvider>
					<Layout persistSEOData={persistSEOData} footerData={footerData}>
						<main>
							<section className='inside'>
								<LeftMenu />
								<TransferFunds />
							</section>
						</main>
					</Layout>
				</TransferFundsProvider>
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

export default TransferFundsPage
