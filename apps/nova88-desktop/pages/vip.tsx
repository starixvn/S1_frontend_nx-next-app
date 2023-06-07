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
import {
	VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY,
	VIP_CLUB_IMAGES,
	VIP_EVENT_CURRENCIES_LIMITATION_INFO,
} from '../data'

type IVipPageProps = InitialPropsInterface

const VipPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
}: IVipPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<Layout persistSEOData={persistSEOData}>
				<Vip
					VIP_CLUB_IMAGES={VIP_CLUB_IMAGES}
					VIP_EVENT_CURRENCIES_LIMITATION_INFO={
						VIP_EVENT_CURRENCIES_LIMITATION_INFO
					}
					VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY={
						VIP_BANNER_CAROUSEL_LIST_BY_CURRENCY
					}
				/>
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
