import React from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout, Home } from '@nx-next-app/features/F0001/desktop'
import {
	AuthProvider,
	GlobalDataProvider,
	getAnnouncement,
	getBanner,
	getPromotion,
	getLatestHighlightVideo,
	getHotEvent,
} from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import {
	IAnnouncementData,
	IBannerData,
	IHighlightData,
	IHotEventData,
	IPromotionData,
} from '@nx-next-app/service'
import {
	BannerTypeEnum,
	DeviceTypeEnum,
	IResponseConvertedFooterData,
} from '@nx-next-app/types'
import { ALLOWED_CURRENCIES } from '@nx-next-app/site/nova88'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'

interface IHomePageProps extends InitialPropsInterface {
	announcementData: IAnnouncementData[]
	bannerData: IBannerData[]
	promotionData: IPromotionData[]
	latestHighlightVideo: IHighlightData
	footerData: IResponseConvertedFooterData
	hotEventData: IHotEventData[]
}

const HomePage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	announcementData,
	bannerData,
	promotionData,
	latestHighlightVideo,
	hotEventData,
	footerData,
}: IHomePageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData} footerData={footerData}>
					<Home
						announcementData={announcementData}
						bannerData={bannerData}
						promotionData={promotionData}
						latestHighlightVideo={latestHighlightVideo}
						hotEventData={hotEventData}
						jackPotCurrencies={ALLOWED_CURRENCIES.JACKPOT}
					/>
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
	const announcementData = await getAnnouncement({ langId, currencyId })

	const bannerData = await getBanner(
		{
			langId,
			currencyId,
			bannerTypes: [BannerTypeEnum.Main],
		},
		{ headers: { cookie: currentHeaderCookies } }
	)
	const promotionData = await getPromotion(
		{ langId, currencyId, deviceType: DeviceTypeEnum.Desktop },
		{ headers: { cookie: currentHeaderCookies } }
	)

	const latestHighlightVideo = await getLatestHighlightVideo({ langId })

	const hotEventData = await getHotEvent({ langId })

	return {
		props: {
			bannerData,
			announcementData,
			promotionData,
			latestHighlightVideo,
			hotEventData,
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default HomePage
