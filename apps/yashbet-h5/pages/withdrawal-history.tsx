import React from 'react'
import { GetServerSideProps } from 'next'
import { paths } from '@nx-next-app/constants'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { History } from '@nx-next-app/features/F0001/h5'
import { Layout } from '@nx-next-app/features/F0006/h5'
import { HistoryProvider } from '@nx-next-app/features/F0001/providers'
import {
	HISTORY_TABS,
	QUICK_PICK_LIST,
} from '@nx-next-app/site/yashbet/data/history'

type IDepositHistoryPageProps = InitialPropsInterface

const WithdrawalHistoryPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
}: IDepositHistoryPageProps) => {
	const HEADER_TAGS: { label: string; href: string }[] = [
		{ label: 'Label_General_Withdrawal', href: paths.withdrawal.root },
		{
			label: 'Label_General_WithdrawalHistory',
			href: paths.withdrawalHistory.root,
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

export default WithdrawalHistoryPage
