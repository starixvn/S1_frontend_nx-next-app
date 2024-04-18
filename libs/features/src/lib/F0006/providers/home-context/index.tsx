import dayjs from 'dayjs'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { find, head } from 'lodash-es'
import { paths } from '@nx-next-app/constants'
import isBetween from 'dayjs/plugin/isBetween'
import React, { createContext, useContext, ReactNode } from 'react'
import { useMenu } from '@nx-next-app/features/F0006/hooks'
import { useAuth, useGlobalData, useStaticData } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	type IAnnouncementData,
	type IBannerData,
	type IHighlightData,
	type IHotEventData,
	type IHotGame,
	type INewsData,
	type IPromotionData,
	type ISocialChannelData,
	useGetAnnouncementQuery,
	useGetHotEventListQuery,
	useGetReferralCodeQuery,
	useGetReferralSettingQuery,
	useGetSocialChannelQuery,
} from '@nx-next-app/service'
import {
	CurrenciesEnum,
	DeviceTypeEnum,
	type IFooterData,
} from '@nx-next-app/types'
import {
	CategoryEnum,
	DesktopHomeComponentsEnum,
	MobileHomeComponentsEnum,
	GameTypeEnum,
	SocialChannelEnum,
} from '@nx-next-app/features/F0006/types'

dayjs.extend(isBetween)
interface IHomeProviderProps {
	children: ReactNode
	persistBannerData: IBannerData[]
	persistPromotionData: IPromotionData[]
	persistLatestHighlightVideo: IHighlightData
	persistHotEventData: IHotEventData[]
	persistHotGameData: IHotGame[]
	persistNewsData: INewsData[]
	// For H5
	persistLicenseData: IFooterData['licenseData']
	persistProgramList: IFooterData['programList']
	// 桌機排序與開關
	desktopHomeOrders?: DesktopHomeComponentsEnum[]
	// 手機排序與開關
	mobileHomeOrders?: MobileHomeComponentsEnum[]
}

export interface HomeContextInterface {
	// 桌機排序與開關
	desktopHomeOrders: DesktopHomeComponentsEnum[]
	// 手機排序與開關
	mobileHomeOrders: MobileHomeComponentsEnum[]
	announcementData: IAnnouncementData[] | null
	promotionData: IPromotionData[]
	bannerData: IBannerData[]
	hotEventData: IHotEventData[] | null
	latestHighlightVideo: IHighlightData
	jackPotCurrencies: CurrenciesEnum[]
	hotGameData: IHotGame[]
	newsData: INewsData[]
	socialChannelList: ISocialChannelData[]
	footerSocialChannelList: ISocialChannelData[]
	licenseData: IFooterData['licenseData']
	affiliateData: { allowCurrencies: CurrenciesEnum[]; link: string }
	referralData: { referralBonus: number | null; referralCode: string }
	handlePromotionClick: (bonusCode: string) => void
	handleMarqueeClick: ({ loginCallback }: { loginCallback: () => void }) => void
	handleHotGameClick: (
		{
			game,
		}: {
			game: IHotGame
		},
		{
			loginCallback,
			underMaintenanceCallback,
		}: { loginCallback: () => void; underMaintenanceCallback: () => void }
	) => void
	// HotEvent 元件使用
	formatHdp: (hdp: number) => string | number
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const HomeContext = createContext<HomeContextInterface>(null!)

export const useHome = () => {
	return useContext(HomeContext)
}

const DesktopPromotionDetailModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/desktop/modal/promotionDetailModal/PromotionDetailModal'
		),
	{ ssr: false }
)

const H5PromotionDetailModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/h5/modal/promotionDetailModal/PromotionDetailModal'
		),
	{ ssr: false }
)

const deviceType = Number(process.env['NEXT_PUBLIC_DEVICE_TYPE'])

// 如果沒指定則使用 default 排序並全開
const defaultDesktopHomeOrders = [
	DesktopHomeComponentsEnum.CarouselBanner,
	DesktopHomeComponentsEnum.Marquee,
	DesktopHomeComponentsEnum.PromotionMarquee,
	DesktopHomeComponentsEnum.LatestVideoAndEvent,
	DesktopHomeComponentsEnum.HotGameMarquee,
	DesktopHomeComponentsEnum.RecentlyViewGames,
	DesktopHomeComponentsEnum.NewsBlock,
	DesktopHomeComponentsEnum.CenterBanner,
	DesktopHomeComponentsEnum.LuckyWheel,
	DesktopHomeComponentsEnum.QuickDownload,
	DesktopHomeComponentsEnum.QuickLink,
]

const defaultMobileHomeOrders = [
	MobileHomeComponentsEnum.CarouselBanner,
	MobileHomeComponentsEnum.Marquee,
	MobileHomeComponentsEnum.PromotionMarquee,
	MobileHomeComponentsEnum.HotEventSwiper,
	MobileHomeComponentsEnum.HotGameMarquee,
	MobileHomeComponentsEnum.RecentlyViewGames,
	MobileHomeComponentsEnum.FriendReferral,
	MobileHomeComponentsEnum.Jackpot,
	MobileHomeComponentsEnum.LuckyWheel,
	MobileHomeComponentsEnum.AppDownload,
	MobileHomeComponentsEnum.FooterBlock,
]

export const HomeProvider = ({
	children,
	persistBannerData,
	persistPromotionData,
	persistHotEventData,
	persistLatestHighlightVideo,
	persistHotGameData,
	persistNewsData,
	persistLicenseData,
	persistProgramList,
	desktopHomeOrders = defaultDesktopHomeOrders,
	mobileHomeOrders = defaultMobileHomeOrders,
}: IHomeProviderProps) => {
	const { push } = useRouter()
	const { onEnterSlotsPage, onEnterPage } = useMenu()
	const { tpMaintainList } = useGlobalData()
	const {
		auth: { isLogin },
		userInfo: { currencyId, langId },
	} = useAuth()

	const { ALLOWED_CURRENCIES } = useStaticData()

	const { modal } = useGlobalModal()

	const { data: { data: announcementData = [] } = {} } =
		useGetAnnouncementQuery(
			{ currencyId, langId },
			{
				pollingInterval: 60000,
			}
		)

	const { data: { data: hotEventData = persistHotEventData } = {} } =
		useGetHotEventListQuery(
			{ langId },
			{
				pollingInterval: 60000,
				skip: !langId,
			}
		)

	const { data: { data: socialChannelList = [] } = {} } =
		useGetSocialChannelQuery({
			currencyId: currencyId as number,
			langId,
			displayPage: SocialChannelEnum.HOME,
		})

	const { data: { data: footerSocialChannelList = [] } = {} } =
		useGetSocialChannelQuery(
			{
				currencyId: currencyId as number,
				langId,
				displayPage: SocialChannelEnum.FOOTER,
				// 手機版才需要
			},
			{
				skip: deviceType !== DeviceTypeEnum.Mobile,
			}
		)

	const { data: { data: referralSetting = [] } = {} } =
		useGetReferralSettingQuery(null, { skip: !isLogin })
	const { data: { data: referralCode = '' } = {} } = useGetReferralCodeQuery(
		null,
		{
			skip: !isLogin,
		}
	)

	const referralData = {
		referralBonus: head(referralSetting)?.bonusAmount ?? null,
		referralCode,
	}

	const affiliateData = {
		allowCurrencies: ALLOWED_CURRENCIES['AFFILIATE'] as CurrenciesEnum[],
		link:
			find(
				persistProgramList,
				({ displayKey }) => displayKey === 'Label_Affiliate_Program'
			)?.applyNowLink ?? '',
	}

	const jackPotCurrencies = ALLOWED_CURRENCIES['JACKPOT'] as CurrenciesEnum[]

	// promotion click 事件
	const handlePromotionClick = async (bonusCode: string) => {
		try {
			switch (deviceType) {
				case DeviceTypeEnum.Desktop:
					modal.open(<DesktopPromotionDetailModal bonusCode={bonusCode} />)
					break

				case DeviceTypeEnum.Mobile:
					modal.open(<H5PromotionDetailModal bonusCode={bonusCode} />, {
						className: 'promospop',
					})
					break

				default:
					break
			}
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	// 跑馬燈資訊 click 事件
	const handleMarqueeClick = ({
		loginCallback,
	}: {
		loginCallback: () => void
	}) => {
		if (isLogin) {
			push(paths.announcement.root)
		} else {
			loginCallback()
		}
	}

	const formatHdp = (hdp: number) => {
		if (hdp === 0) return hdp

		return `${hdp > 0 ? '+' : ''}${hdp}`
	}

	const handleHotGameClick = (
		{
			game,
		}: {
			game: IHotGame
		},
		{
			loginCallback,
			underMaintenanceCallback,
		}: { loginCallback: () => void; underMaintenanceCallback: () => void }
	) => {
		const { tpId, gameId, tpCategory, tpGameType } = game ?? {}

		const isInMaintain = tpMaintainList?.some(
			maintain =>
				maintain.tpId === game.tpId &&
				(maintain.tpGameType === game.tpGameType ||
					maintain.tpGameType === GameTypeEnum.All)
		)

		if (isInMaintain) {
			underMaintenanceCallback()
		} else if (tpCategory === CategoryEnum.SLOTS) {
			onEnterSlotsPage(
				{ tpId: String(tpId), gameId, tpGameType: String(tpGameType) },
				{ loginCallback }
			)
		} else {
			onEnterPage({ tpId, gameId, tpGameType, langId }, { loginCallback })
		}
	}

	const value: HomeContextInterface = {
		desktopHomeOrders,
		mobileHomeOrders,
		announcementData,
		jackPotCurrencies,
		socialChannelList,
		hotEventData,
		footerSocialChannelList,
		promotionData: persistPromotionData,
		licenseData: persistLicenseData,
		bannerData: persistBannerData,
		latestHighlightVideo: persistLatestHighlightVideo,
		hotGameData: persistHotGameData,
		newsData: persistNewsData,
		referralData,
		affiliateData,
		handlePromotionClick,
		handleMarqueeClick,
		handleHotGameClick,
		formatHdp,
	}

	return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>
}
