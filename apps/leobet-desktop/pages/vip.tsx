import React from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	AuthProvider,
	getVipBanner,
	GlobalDataProvider,
} from '@nx-next-app/data-access'
import { Layout, Vip } from '@nx-next-app/features/F0001/desktop'
import { CurrenciesEnum, IFooterData } from '@nx-next-app/types'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { includes } from 'lodash'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { IVipBannerData } from '@nx-next-app/service'
import { FOOTER_DATA } from '@nx-next-app/site/leobet'

interface IVipPageProps extends InitialPropsInterface {
	vipBannerData: IVipBannerData
	persistFooterData: IFooterData
}

const VipPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
	vipBannerData,
}: IVipPageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData} footerData={persistFooterData}>
					<Vip vipBannerData={vipBannerData} />
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const { originCookies, currentHeaderCookies } = initialProps
	const langId = originCookies[ENV_COOKIE_NAMES.LangId]
	const currencyId = Number(originCookies[ENV_COOKIE_NAMES.CurrencyId])

	const vipBannerData = await getVipBanner(
		{
			currencyId: Number(currencyId),
		},
		{ headers: { cookie: currentHeaderCookies } }
	)

	// * 只支援 MYR IDR THB 幣別
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
			persistFooterData: FOOTER_DATA({ langId, currencyId }),
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default VipPage
