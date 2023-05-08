import React from 'react'
import { GetServerSideProps } from 'next'
import {
	AuthProvider,
	AuthRequire,
	checkSignIn,
} from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Nova88 } from '@nx-next-app/features'

const { Layout } = Nova88.Desktop

interface IJoinPageProps {
	originIsSignIn: boolean
}

const JoinPage = ({ originIsSignIn }: IJoinPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn}>
			<AuthRequire>
				<Layout>
					<main>
						<p>JoinPage</p>
					</main>
				</Layout>
			</AuthRequire>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const { cookie } = context.req.headers
	const originIsSignIn = await checkSignIn(null, { headers: { cookie } })

	return {
		props: {
			originIsSignIn,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default JoinPage
