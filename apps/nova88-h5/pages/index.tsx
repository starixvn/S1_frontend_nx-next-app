import React from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	AuthProvider,
	getBanner,
	getHotEvent,
	getHotGame,
	getPromotion,
	GlobalDataProvider,
} from '@nx-next-app/data-access'
import { HomeProvider } from '@nx-next-app/features/F0001/providers'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { Layout, Home } from '@nx-next-app/features/F0001/h5'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import {
	IBannerData,
	IHotEventData,
	IHotGame,
	IPromotionData,
} from '@nx-next-app/service'
import { BannerTypeEnum, IFooterData } from '@nx-next-app/types'
import { FOOTER_DATA, MOBILE_HOME_ORDERS } from '@nx-next-app/site/nova88'

// 此為優化專案導出所需要的設定，因配合 nx 配置路徑衝突做的優化
// 優化專案 build 出來的檔案結構，僅獨立輸出必要的資源而非整包 node_module , 控管 docker image 大小
// https://nextjs.org/docs/pages/api-reference/next-config-js/output
// https://github.com/nrwl/nx/issues/9017
import path from 'path'
import { filter } from 'lodash-es'
import dayjs from 'dayjs'

path.resolve('./next.config.js')

interface IHomePageProps extends InitialPropsInterface {
	persistBannerData: IBannerData[]
	persistPromotionData: IPromotionData[]
	persistHotEventData: IHotEventData[]
	persistHotGameData: IHotGame[]
	persistFooterData: IFooterData
}

const HomePage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistBannerData,
	persistPromotionData,
	persistHotEventData,
	persistHotGameData,
	persistFooterData,
}: IHomePageProps) => {
	const persistAppDownloadHint = originCookies[ENV_COOKIE_NAMES.AppDownloadHint]

	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData}>
					<HomeProvider
						persistBannerData={persistBannerData}
						persistPromotionData={persistPromotionData}
						persistHotEventData={persistHotEventData}
						persistHotGameData={persistHotGameData}
						persistLicenseData={persistFooterData.licenseData}
						persistQuickLinksList={persistFooterData.quickLinks}
						persistPlatformList={persistFooterData.platformList}
						mobileHomeOrders={MOBILE_HOME_ORDERS}
					>
						<Home persistAppDownloadHint={persistAppDownloadHint} />
					</HomeProvider>
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const { originCookies, currentHeaderCookies } = initialProps

	const { langId, currencyId } = {
		langId: originCookies[ENV_COOKIE_NAMES.LangId] as string,
		currencyId: Number(originCookies[ENV_COOKIE_NAMES.CurrencyId]),
	}
	const [
		persistBannerData,
		rawPromotionData,
		persistHotEventData,
		hotGameData,
	] = await Promise.all([
		getBanner(
			{
				langId,
				currencyId,
				bannerTypes: [BannerTypeEnum.Main],
			},
			{ headers: { cookie: currentHeaderCookies } }
		),
		getPromotion(
			{
				langId,
				currencyId,
				deviceType: Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']),
			},
			{ headers: { cookie: currentHeaderCookies } }
		),
		getHotEvent({ langId }),
		getHotGame({
			deviceType: Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']),
			currencyId,
		}),
	])

	const { HotGame: persistHotGameData = [] } = hotGameData ?? {}

	const persistPromotionData = filter(
		rawPromotionData,
		({ displayFrom, displayTo }) => {
			return dayjs().isBetween(dayjs.unix(displayFrom), dayjs.unix(displayTo))
		}
	)

	return {
		props: {
			persistBannerData,
			persistPromotionData,
			persistHotEventData,
			persistHotGameData,
			persistFooterData: FOOTER_DATA({ langId, currencyId }),
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default HomePage
