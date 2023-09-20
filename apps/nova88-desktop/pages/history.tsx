import React from 'react'
import { GetServerSideProps } from 'next'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout, LeftMenu } from '@nx-next-app/features/F0001/desktop'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import History from '@nx-next-app/features/F0001/desktop/history'
import HistoryProvider from '@nx-next-app/features/F0001/providers/history-context'
import {
	HISTORY_TABS,
	QUICK_PICK_LIST,
} from '@nx-next-app/site/nova88/data/history'

type IHistoryPageProps = InitialPropsInterface

const HistoryPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	footerData,
}: IHistoryPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData} footerData={footerData}>
					<HistoryProvider
						HISTORY_TABS={HISTORY_TABS}
						QUICK_PICK_LIST={QUICK_PICK_LIST}
					>
						<main>
							<section className='inside'>
								<LeftMenu />
								<History />
							</section>
						</main>
					</HistoryProvider>
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

export default HistoryPage
