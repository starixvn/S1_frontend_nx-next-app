import React from 'react'
import { GetServerSideProps } from 'next'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { Layout } from '@nx-next-app/features/F0001/h5'
import HistoryProvider from '@nx-next-app/features/F0001/providers/history-context'
import {
	HISTORY_TABS,
	QUICK_PICK_LIST,
} from '@nx-next-app/site/nova88/data/history'
import History from '@nx-next-app/features/F0001/h5/history'
import { paths } from '@nx-next-app/constants'

type ITransferHistoryPageProps = InitialPropsInterface

const TransferHistoryPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
}: ITransferHistoryPageProps) => {
	const HEADER_TAGS: { label: string; href: string }[] = [
		{ label: 'Label_General_Transfer', href: paths.transferFunds.root },
		{
			label: 'Label_General_TransferHistory',
			href: paths.transferHistory.root,
		},
	]

	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData}>
					<HistoryProvider
						HISTORY_TABS={HISTORY_TABS}
						QUICK_PICK_LIST={QUICK_PICK_LIST}
						HEADER_TAGS={HEADER_TAGS}
					>
						<History />
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

export default TransferHistoryPage
