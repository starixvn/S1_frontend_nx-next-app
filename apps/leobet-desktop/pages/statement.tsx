import React from 'react'
import { GetServerSideProps } from 'next'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	Layout,
	LeftMenu,
	Statement,
} from '@nx-next-app/features/F0002/desktop'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { StatementProvider } from '@nx-next-app/features/F0002/providers'
import { QUICK_PICK_LIST } from '@nx-next-app/site/leobet/data/history'
import { FOOTER_DATA } from '@nx-next-app/site/leobet'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { IFooterData } from '@nx-next-app/types'

interface IStatementPageProps extends InitialPropsInterface {
	persistFooterData: IFooterData
}

const StatementPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
}: IStatementPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData} footerData={persistFooterData}>
					<StatementProvider QUICK_PICK_LIST={QUICK_PICK_LIST} HEADER_TAGS={[]}>
						<main>
							<section className='inside'>
								<LeftMenu />
								<Statement />
							</section>
						</main>
					</StatementProvider>
				</Layout>
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

export default StatementPage
