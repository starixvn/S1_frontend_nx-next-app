import React from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	AuthProvider,
	getVipBanner,
	GlobalDataProvider,
} from '@nx-next-app/data-access'
import { Layout, Vip } from '@nx-next-app/features/F0001/desktop'
import { CurrenciesEnum } from '@nx-next-app/types'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { includes } from 'lodash'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { IVipBannerData } from '@nx-next-app/service'

interface IVipPageProps extends InitialPropsInterface {
	vipBannerData: IVipBannerData
}

const VipPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	footerData,
	vipBannerData,
}: IVipPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData} footerData={footerData}>
					<Vip vipBannerData={vipBannerData} />
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const { currentHeaderCookies } = initialProps

	const currencyId = initialProps.originCookies[ENV_COOKIE_NAMES.CurrencyId]

	const vipBannerData = await getVipBanner(
		{
			currencyId: Number(currencyId),
		},
		{ headers: { cookie: currentHeaderCookies } }
	)

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
			vipBannerData,
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default VipPage
