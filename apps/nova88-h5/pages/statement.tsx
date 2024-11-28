import { Statement } from '@n88-h5/components/index'
import { NovaAuthProvider } from '@nova88-h5/providers'
import { paths } from '@nx-next-app/constants'
import { GlobalDataProvider } from '@nx-next-app/data-access'
// todo:待 Linda 把 Layout 合進 dev 在重新引入
import { Layout } from '@nx-next-app/features/F0001/h5'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { StatementProvider } from '@nx-next-app/operations'
import { QUICK_PICK_LIST } from '@nx-next-app/site/nova88/data/history'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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
		<NovaAuthProvider
			originIsSignIn={originIsSignIn}
			originCookies={originCookies}
		>
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

export default StatementPage
