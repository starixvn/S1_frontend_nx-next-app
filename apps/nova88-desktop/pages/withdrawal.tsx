import React from 'react'
import { GetServerSideProps } from 'next'
import { AuthProvider, AuthRequire } from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { F0001 } from '@nx-next-app/features'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'

const { Layout } = F0001.Desktop

type IWithdrawalPageProps = InitialPropsInterface

// * TODO: wip todo
const WithdrawalPage = ({
	originIsSignIn,
	originCookies,
}: IWithdrawalPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<AuthRequire>
				<Layout>
					<main>
						<br />
						<br />
						<br />
						<h1 style={{ color: 'black' }}>Withdrawal Page</h1>
						<br />
						<br />
						<br />
					</main>
				</Layout>
			</AuthRequire>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)

	return {
		props: {
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default WithdrawalPage
