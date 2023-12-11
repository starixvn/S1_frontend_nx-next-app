import React from 'react'
import { GetServerSideProps } from 'next'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'

import { RebateExclude } from '@nx-next-app/features/F0006/h5'

type IRebateExcludePageProps = InitialPropsInterface

const RebateExcludePage = ({
	originIsSignIn,
	originCookies,
}: IRebateExcludePageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<RebateExclude />
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

export default RebateExcludePage
