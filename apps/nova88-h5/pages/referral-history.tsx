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

type IReferralHistoryPageProps = InitialPropsInterface

const ReferralHistoryPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
}: IReferralHistoryPageProps) => {
	const HEADER_TAGS: { displayKey: string; pathName: string }[] = [
		{ displayKey: 'Label_General_ReferFriends', pathName: paths.referral.root },
		{
			displayKey: 'Label_General_ReferralHistory',
			pathName: paths.referralHistory.root,
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

export default ReferralHistoryPage
