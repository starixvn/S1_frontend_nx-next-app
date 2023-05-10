import React from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { F0001 } from '@nx-next-app/features'
import {
	checkSignIn,
	AuthRequire,
	AuthProvider,
} from '@nx-next-app/data-access'

const { Layout, Home } = F0001.Desktop

interface IHomePageProps {
	originIsSignIn: boolean
}

const HomePage = ({ originIsSignIn }: IHomePageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn}>
			<AuthRequire>
				<Layout>
					<Home />
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

export default HomePage
