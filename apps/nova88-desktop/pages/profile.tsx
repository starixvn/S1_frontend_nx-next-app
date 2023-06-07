/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react'
import { GetServerSideProps } from 'next'
import { AuthProvider } from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout } from '@nx-next-app/features/F0001/desktop'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'

type IProfilePageProps = InitialPropsInterface

// * TODO: wip todo
const ProfilePage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
}: IProfilePageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<Layout persistSEOData={persistSEOData}>
				<main>
					<br />
					<br />
					<br />
					<h1 style={{ color: 'black' }}>Profile Page</h1>
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

export default ProfilePage
