import React from 'react'
import { GetServerSideProps } from 'next'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	Layout,
	LeftMenu,
	TransferFunds,
} from '@nx-next-app/features/F0006/desktop'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { TransferFundsProvider } from '@nx-next-app/features/F0006/providers'
import { FOOTER_DATA } from '@nx-next-app/site/yashbet'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { IFooterData } from '@nx-next-app/types'

interface ITransferFundsPageProps extends InitialPropsInterface {
	persistFooterData: IFooterData
}

const TransferFundsPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
}: ITransferFundsPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<TransferFundsProvider>
					<Layout
						persistSEOData={persistSEOData}
						footerData={persistFooterData}
					>
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
	const langId = initialProps.originCookies[ENV_COOKIE_NAMES.LangId]
	const currencyId = Number(
		initialProps.originCookies[ENV_COOKIE_NAMES.CurrencyId]
	)

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
			persistFooterData: FOOTER_DATA({ langId, currencyId }),
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default TransferFundsPage
