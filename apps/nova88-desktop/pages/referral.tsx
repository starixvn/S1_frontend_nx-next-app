import React from 'react'
import { GetServerSideProps } from 'next'
import { AuthProvider } from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { F0001 } from '@nx-next-app/features'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'

const { Layout } = F0001.Desktop

type IReferralPageProps = InitialPropsInterface

// * TODO: wip todo
const ReferralPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
}: IReferralPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<Layout persistSEOData={persistSEOData}>
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

export default ReferralPage
