import React from 'react'
import { GetServerSideProps } from 'next'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { SlotsProvider } from '@nx-next-app/features/F0001/providers'
import { Layout, Slots } from '@nx-next-app/features/F0001/desktop'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { IFooterData } from '@nx-next-app/types'

type ISlotsPageProps = InitialPropsInterface & {
	footerData: IFooterData
}

const SlotsPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	footerData,
}: ISlotsPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<SlotsProvider>
					<Layout persistSEOData={persistSEOData} footerData={footerData}>
						<Slots />
					</Layout>
				</SlotsProvider>
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

export default SlotsPage
