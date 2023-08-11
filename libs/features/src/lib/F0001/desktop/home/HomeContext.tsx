import React, { createContext, useContext, ReactNode } from 'react'
import {
	IAnnouncementData,
	IBannerData,
	IHighlightData,
	IHotEventData,
	IHotGame,
	INewsData,
	IPromotionData,
	ISocialChannelData,
	IViewedGameData,
	useGetAnnouncementQuery,
	useGetRecentlyViewedQuery,
	useGetSocialChannelQuery,
	useLazyGetPromotionDetailQuery,
} from '@nx-next-app/service'
import { CurrenciesEnum, DeviceTypeEnum } from '@nx-next-app/types'
import { useAuth } from '@nx-next-app/data-access'
import dynamic from 'next/dynamic'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { SocialChannelEnum } from '@nx-next-app/features/F0001/types'
import { paths } from '@nx-next-app/constants'
import { useRouter } from 'next/router'

interface IHomeProviderProps {
	children: ReactNode
	jackPotCurrencies: CurrenciesEnum[]
	persistAnnouncementData: IAnnouncementData[]
	persistBannerData: IBannerData[]
	persistPromotionData: IPromotionData[]
	persistLatestHighlightVideo: IHighlightData
	persistHotEventData: IHotEventData[]
	persistHotGameData: IHotGame[]
	persistNewsData: INewsData[]
}

export interface HomeContextInterface {
	announcementData: IAnnouncementData[]
	promotionData: IPromotionData[]
	bannerData: IBannerData[]
	hotEventData: IHotEventData[]
	latestHighlightVideo: IHighlightData
	jackPotCurrencies: CurrenciesEnum[]
	hotGameData: IHotGame[]
	newsData: INewsData[]
	recentlyViewedList: IViewedGameData[]
	socialChannelList: ISocialChannelData[]
	handlePromotionClick: (bonusCode: string) => void
	handleMarqueeClick: () => void
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const HomeContext = createContext<HomeContextInterface>(null!)

export const useHome = () => {
	return useContext(HomeContext)
}

const PromotionDetailModal = dynamic(
	() => import('../modal/promotionDetailModal/PromotionDetailModal'),
	{
		ssr: false,
	}
)

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

export const HomeProvider = ({
	children,
	jackPotCurrencies,
	persistAnnouncementData,
	persistBannerData,
	persistPromotionData,
	persistHotEventData,
	persistLatestHighlightVideo,
	persistHotGameData,
	persistNewsData,
}: IHomeProviderProps) => {
	const { push } = useRouter()

	const {
		auth: { isLogin },
		userInfo: { currencyId, langId },
	} = useAuth()

	const { modal } = useGlobalModal()

	const { data: { data: announcementData = persistAnnouncementData } = {} } =
		useGetAnnouncementQuery(
			{ currencyId, langId },
			{
				pollingInterval: 60000,
			}
		)

	const { data: { data: recentlyViewData } = {} } = useGetRecentlyViewedQuery(
		{
			currencyId,
			deviceType: Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']),
		},
		{
			skip: !isLogin,
		}
	)

	const { data: { data: socialChannelList = [] } = {} } =
		useGetSocialChannelQuery({
			currencyId: currencyId as number,
			langId,
			displayPage: SocialChannelEnum.HOME,
		})

	const { recentlyViewedList = [] } = recentlyViewData ?? {}

	const [getPromotionDetail] = useLazyGetPromotionDetailQuery()
	// promotion click 事件
	const handlePromotionClick = async (bonusCode: string) => {
		try {
			// 桌機模組固定傳桌機
			const { data: promotionDetail } = await getPromotionDetail({
				currencyId,
				langId,
				bonusCode,
				deviceType: DeviceTypeEnum.Desktop,
			}).unwrap()
			modal.open(<PromotionDetailModal promotionDetail={promotionDetail} />)
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	// 跑馬燈資訊 click 事件
	const handleMarqueeClick = () => {
		if (isLogin) {
			push(paths.announcement.root)
		} else {
			modal.open(<LoginModal />)
		}
	}

	const value: HomeContextInterface = {
		announcementData,
		recentlyViewedList,
		jackPotCurrencies,
		socialChannelList,
		bannerData: persistBannerData,
		promotionData: persistPromotionData,
		hotEventData: persistHotEventData,
		latestHighlightVideo: persistLatestHighlightVideo,
		hotGameData: persistHotGameData,
		newsData: persistNewsData,
		handlePromotionClick,
		handleMarqueeClick,
	}

	return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>
}
