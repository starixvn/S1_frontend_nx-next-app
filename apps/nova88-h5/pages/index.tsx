import React from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { Layout, Home } from '@nx-next-app/features/F0001/h5'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'

type IHomePageProps = InitialPropsInterface

const HomePage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
}: IHomePageProps) => {
	const persistAppDownloadHint = originCookies[ENV_COOKIE_NAMES.AppDownloadHint]

	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData}>
					<Home persistAppDownloadHint={persistAppDownloadHint} />
				</Layout>
			</GlobalDataProvider>
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

export default HomePage
