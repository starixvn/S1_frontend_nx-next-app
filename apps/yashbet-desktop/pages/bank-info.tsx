import React from 'react'
import { GetServerSideProps } from 'next'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout, LeftMenu, BankInfo } from '@nx-next-app/features/F0006/desktop'
import { BankInfoProvider } from '@nx-next-app/features/F0006/providers'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { FOOTER_DATA } from '@nx-next-app/site/yashbet'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { IFooterData } from '@nx-next-app/types'

interface IBankInfoPage extends InitialPropsInterface {
	persistFooterData: IFooterData
}

const BankInfoPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
}: IBankInfoPage) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<BankInfoProvider>
					<Layout
						persistSEOData={persistSEOData}
						footerData={persistFooterData}
					>
						<main>
							<section className='inside'>
								<LeftMenu />
								<BankInfo />
							</section>
						</main>
					</Layout>
				</BankInfoProvider>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const { originCookies } = initialProps
	const { langId, currencyId } = {
		langId: originCookies[ENV_COOKIE_NAMES.LangId] as string,
		currencyId: Number(originCookies[ENV_COOKIE_NAMES.CurrencyId]),
	}

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

export default BankInfoPage
