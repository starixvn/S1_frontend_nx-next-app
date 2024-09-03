import { paths } from '@nx-next-app/constants'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { Layout } from '@nx-next-app/features/F0001/h5'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { StatementProvider } from '@nx-next-app/operations'
import { QUICK_PICK_LIST } from '@nx-next-app/site/onetwobet/data/history'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Statement } from '../components/index'

const StatementPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
}: InitialPropsInterface) => {
	const HEADER_TAGS: { label: string; href: string }[] = [
		{ label: 'Label_General_Statement', href: paths.statement.root },
		{
			label: 'Label_General_FinancialLog',
			href: paths.financialLog.root,
		},
	]

	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData}>
					<StatementProvider
						QUICK_PICK_LIST={QUICK_PICK_LIST}
						HEADER_TAGS={HEADER_TAGS}
					>
						<Statement />
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
