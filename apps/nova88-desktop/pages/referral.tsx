import React from 'react'
import { GetServerSideProps } from 'next'
import {
	AuthProvider,
	AuthRequire,
	checkSignIn,
} from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { F0001 } from '@nx-next-app/features'

const { Layout } = F0001.Desktop

interface IReferralPageProps {
	originIsSignIn: boolean
}

// * TODO: wip todo
const ReferralPage = ({ originIsSignIn }: IReferralPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn}>
			<AuthRequire>
				<Layout>
					<main>
						<br />
						<br />
						<br />
						<h1 style={{ color: 'black' }}>Referral Page</h1>
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
	const { cookie } = context.req.headers
	const originIsSignIn = await checkSignIn(null, { headers: { cookie } })

	return {
		props: {
			originIsSignIn,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default ReferralPage
