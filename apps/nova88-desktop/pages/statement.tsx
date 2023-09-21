import React from 'react'
import { GetServerSideProps } from 'next'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout, LeftMenu } from '@nx-next-app/features/F0001/desktop'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import StatementProvider from '@nx-next-app/features/F0001/providers/statement-context'
import Statement from '@nx-next-app/features/F0001/desktop/statement'
import { QUICK_PICK_LIST } from '@nx-next-app/site/nova88/data/history'

type IStatementPageProps = InitialPropsInterface

const StatementPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	footerData,
}: IStatementPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData} footerData={footerData}>
					<StatementProvider QUICK_PICK_LIST={QUICK_PICK_LIST}>
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

export default StatementPage
