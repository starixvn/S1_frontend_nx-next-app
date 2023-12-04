import React from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout, Home } from '@nx-next-app/features/F0001/desktop'
import { HomeProvider } from '@nx-next-app/features/F0001/providers'
import {
	AuthProvider,
	GlobalDataProvider,
	getAnnouncement,
	getBanner,
	getPromotion,
	getLatestHighlightVideo,
	getHotEvent,
	getHotGame,
	getNews,
	getSlotGamePage,
	SlotGameCategoryEnum,
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
	IHotGame,
	INewsData,
	IPromotionData,
	ISlotsGameData,
} from '@nx-next-app/service'
import { BannerTypeEnum, IFooterData } from '@nx-next-app/types'
import { DEVICE_TYPE, ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { DESKTOP_HOME_ORDERS, FOOTER_DATA } from '@nx-next-app/site/nova88'

// 此為優化專案導出所需要的設定，因配合 nx 配置路徑衝突做的優化
// 優化專案 build 出來的檔案結構，僅獨立輸出必要的資源而非整包 node_module , 控管 docker image 大小
// https://nextjs.org/docs/pages/api-reference/next-config-js/output
// https://github.com/nrwl/nx/issues/9017
import path from 'path'

// path.resolve 會把指定路徑解析成絕對路徑
// 這樣解析是為了讓 next 輸出時可以正確吃到當前 project 的 next.config
// 用於解決 nx 在 next 專案上 path 衝突使用的小 trick
path.resolve('./next.config.js')

interface IHomePageProps extends InitialPropsInterface {
	persistAnnouncementData: IAnnouncementData[]
	persistBannerData: IBannerData[]
	persistPromotionData: IPromotionData[]
	persistLatestHighlightVideo: IHighlightData
	persistHotEventData: IHotEventData[]
	persistHotGameData: IHotGame[]
	persistSlotsGameData: ISlotsGameData
	persistNewsData: INewsData[]
	persistFooterData: IFooterData
}

const HomePage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistAnnouncementData,
	persistBannerData,
	persistPromotionData,
	persistLatestHighlightVideo,
	persistHotEventData,
	persistHotGameData,
	persistSlotsGameData,
	persistNewsData,
	persistFooterData,
}: IHomePageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout
					showFooter
					persistSEOData={persistSEOData}
					footerData={persistFooterData}
				>
					<HomeProvider
						persistAnnouncementData={persistAnnouncementData}
						persistBannerData={persistBannerData}
						persistPromotionData={persistPromotionData}
						persistLatestHighlightVideo={persistLatestHighlightVideo}
						persistHotEventData={persistHotEventData}
						persistHotGameData={persistHotGameData}
						persistNewsData={persistNewsData}
						persistSlotsGameData={persistSlotsGameData}
						persistLicenseData={persistFooterData.licenseData}
						persistProgramList={persistFooterData.programList}
						desktopHomeOrders={DESKTOP_HOME_ORDERS}
					>
						<Home />
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

	const { HotGame: persistHotGameData = [] } = hotGameData ?? {}

	const persistSlotsGameData = await getSlotGamePage(
		{
			deviceType: DEVICE_TYPE.Desktop,
			currencyId,
			slotGameCategoryList: [SlotGameCategoryEnum.Jackpot],
		},
		{ headers: { cookie: currentHeaderCookies } }
	)

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
			persistSlotsGameData,
			persistFooterData: FOOTER_DATA({ langId, currencyId }),
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default HomePage
