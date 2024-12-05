import { History } from '@apps/noble888-h5/components'
import { NovaAuthProvider } from '@noble888-h5/providers'
import { paths } from '@nx-next-app/constants'
import { GlobalDataProvider } from '@nx-next-app/data-access'
import { Layout } from '@nx-next-app/features/F0001/h5'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { HistoryProvider } from '@nx-next-app/operations'
import {
	HISTORY_TABS,
	QUICK_PICK_LIST,
} from '@nx-next-app/site/nova88/data/history'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type ITransferHistoryPageProps = InitialPropsInterface

const TransferHistoryPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
}: ITransferHistoryPageProps) => {
	const HEADER_TAGS: { label: string; href: string }[] = [
		{ label: 'Label_General_Transfer', href: paths.transferFunds.root },
		{
			label: 'Label_General_TransferHistory',
			href: paths.transferHistory.root,
		},
	]

	return (
		<NovaAuthProvider
			originIsSignIn={originIsSignIn}
			originCookies={originCookies}
		>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
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
		</NovaAuthProvider>
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
