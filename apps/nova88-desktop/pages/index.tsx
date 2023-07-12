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
} from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import {
	IAnnouncementData,
	IBannerData,
	IHighlightData,
	IPromotionData,
} from '@nx-next-app/service'
import {
	BannerTypeEnum,
	DeviceTypeEnum,
	IResponseConvertedFooterData,
} from '@nx-next-app/types'
import { ALLOWED_CURRENCIES } from '@nx-next-app/site/nova88'

interface IHomePageProps extends InitialPropsInterface {
	announcementData: IAnnouncementData[]
	bannerData: IBannerData[]
	promotionData: IPromotionData[]
	latestHighlightVideo: IHighlightData
	footerData: IResponseConvertedFooterData
}

const HomePage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	announcementData,
	bannerData,
	promotionData,
	latestHighlightVideo,
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
		langId: originCookies[
			`${process.env['NEXT_PUBLIC_SITE_NAME']}_langId`
		] as string,
		currencyId: Number(
			originCookies[`${process.env['NEXT_PUBLIC_SITE_NAME']}_currencyId`]
		),
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

	return {
		props: {
			bannerData,
			announcementData,
			promotionData,
			latestHighlightVideo,
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default HomePage
