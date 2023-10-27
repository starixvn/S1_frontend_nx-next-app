import React from 'react'
import { paths } from '@nx-next-app/constants'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { Layout, Statement } from '@nx-next-app/features/F0001/h5'
import { StatementProvider } from '@nx-next-app/features/F0001/providers'
import { QUICK_PICK_LIST } from '@nx-next-app/site/leobet/data/history'

const StatementPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
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
			<GlobalDataProvider>
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
