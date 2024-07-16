import React from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { Layout, Olympic } from '@nx-next-app/features/F0001/h5'
import { OlympicProvider } from '@nx-next-app/features/F0001/providers'
import { includes } from 'lodash'
import { ALLOWED_CURRENCIES } from '@nx-next-app/site/nova88'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'

type IEuroCupProps = InitialPropsInterface

const OlympicPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
}: IEuroCupProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData}>
					<OlympicProvider>
						<Olympic />
					</OlympicProvider>
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)

	const { originCookies } = initialProps

	const currencyId = Number(originCookies[ENV_COOKIE_NAMES.CurrencyId])

	if (!includes(ALLOWED_CURRENCIES['VIP'], Number(currencyId))) {
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

export default OlympicPage
