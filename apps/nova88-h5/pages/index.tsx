import React from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	AuthProvider,
	getAnnouncement,
	getBanner,
	getHotEvent,
	getHotGame,
	getLatestHighlightVideo,
	getNews,
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
	IAnnouncementData,
	IBannerData,
	IHighlightData,
	IHotEventData,
	IHotGame,
	INewsData,
	IPromotionData,
} from '@nx-next-app/service'
import { BannerTypeEnum } from '@nx-next-app/types'

interface IHomePageProps extends InitialPropsInterface {
	persistAnnouncementData: IAnnouncementData[]
	persistBannerData: IBannerData[]
	persistPromotionData: IPromotionData[]
	persistLatestHighlightVideo: IHighlightData
	persistHotEventData: IHotEventData[]
	persistHotGameData: IHotGame[]
	persistNewsData: INewsData[]
}

const HomePage = ({
	originIsSignIn,
	originCookies,
	footerData,
	persistSEOData,
	persistAnnouncementData,
	persistBannerData,
	persistPromotionData,
	persistLatestHighlightVideo,
	persistHotEventData,
	persistHotGameData,
	persistNewsData,
}: IHomePageProps) => {
	const persistAppDownloadHint = originCookies[ENV_COOKIE_NAMES.AppDownloadHint]

	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData}>
					<HomeProvider
						persistAnnouncementData={persistAnnouncementData}
						persistBannerData={persistBannerData}
						persistPromotionData={persistPromotionData}
						persistLatestHighlightVideo={persistLatestHighlightVideo}
						persistHotEventData={persistHotEventData}
						persistHotGameData={persistHotGameData}
						persistNewsData={persistNewsData}
						persistLicenseData={footerData.licenseData}
						persistServicePlanData={footerData.servicePlanData}
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
	const persistAnnouncementData = await getAnnouncement({ langId, currencyId })

	const persistBannerData = await getBanner(
		{
			langId,
			currencyId,
			bannerTypes: [BannerTypeEnum.Main],
		},
		{ headers: { cookie: currentHeaderCookies } }
	)

	const persistPromotionData = await getPromotion(
		{
			langId,
			currencyId,
			deviceType: Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']),
		},
		{ headers: { cookie: currentHeaderCookies } }
	)

	const persistLatestHighlightVideo = await getLatestHighlightVideo({ langId })

	const persistHotEventData = await getHotEvent({ langId })

	const hotGameData = await getHotGame({
		deviceType: Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']),
		currencyId,
	})

	const { HotGame: persistHotGameData } = hotGameData ?? {}

	const persistNewsData = await getNews({
		langId,
		currencyId,
		pageSize: 2,
		pageNumber: 1,
	})

	return {
		props: {
			persistBannerData,
			persistAnnouncementData,
			persistPromotionData,
			persistLatestHighlightVideo,
			persistHotEventData,
			persistHotGameData,
			persistNewsData,
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default HomePage
