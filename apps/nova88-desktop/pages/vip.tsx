import React from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AuthProvider } from '@nx-next-app/data-access'
import { Layout, Vip } from '@nx-next-app/features/F0001/desktop'
import { CurrenciesEnum } from '@nx-next-app/types'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { includes } from 'lodash-es'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'

type IVipPageProps = InitialPropsInterface

const VipPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
}: IVipPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<Layout persistSEOData={persistSEOData}>
				<Vip />
			</Layout>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)

	const currencyId = initialProps.originCookies[ENV_COOKIE_NAMES.CurrencyId]

	if (
		!includes(
			[CurrenciesEnum.MYR, CurrenciesEnum.IDR, CurrenciesEnum.THB],
			Number(currencyId)
		)
	) {
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

export default VipPage
