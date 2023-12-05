import React, { createContext, ReactNode, useContext } from 'react'
import {
	IAnnouncementData,
	IBannerData,
	IHighlightData,
	IHotEventData,
	IHotGame,
	INewsData,
	IPromotionData,
	ISlotsGameData,
	ISocialChannelData,
	IViewedGameData,
	useGetAnnouncementQuery,
	useGetHotEventListQuery,
	useGetRecentlyViewedQuery,
	useGetReferralCodeQuery,
	useGetReferralSettingQuery,
	useGetSocialChannelQuery,
} from '@nx-next-app/service'
import {
	CurrenciesEnum,
	DeviceTypeEnum,
	IFooterData,
	ISubMenu,
} from '@nx-next-app/types'
import { useAuth, useGlobalData, useStaticData } from '@nx-next-app/data-access'
import dynamic from 'next/dynamic'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	CategoryEnum,
	GameTypeEnum,
	SocialChannelEnum,
	MobileHomeComponentsEnum,
	DesktopHomeComponentsEnum,
} from '@nx-next-app/features/F0001/types'
import { paths } from '@nx-next-app/constants'
import { useRouter } from 'next/router'
import { filter, find, head } from 'lodash-es'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { useMenu } from '@nx-next-app/features/F0001/hooks'

dayjs.extend(isBetween)
interface IHomeProviderProps {
	children: ReactNode
	persistAnnouncementData: IAnnouncementData[]
	persistBannerData: IBannerData[]
	persistPromotionData: IPromotionData[]
	persistLatestHighlightVideo: IHighlightData
	persistHotEventData: IHotEventData[]
	persistHotGameData: IHotGame[]
	persistNewsData: INewsData[]
	persistSlotsGameData: ISlotsGameData
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
	hotEventData: IHotEventData[]
	latestHighlightVideo: IHighlightData
	jackPotCurrencies: CurrenciesEnum[]
	hotGameData: IHotGame[]
	newsData: INewsData[]
	recentlyViewedList: IViewedGameData[]
	socialChannelList: ISocialChannelData[]
	footerSocialChannelList: ISocialChannelData[]
	slotGameData: ISlotsGameData
	licenseData: IFooterData['licenseData']
	affiliateData: { allowCurrencies: CurrenciesEnum[]; link: string }
	referralData: { referralBonus: number | null; referralCode: string }
	handlePromotionClick: (bonusCode: string) => void
	handleMarqueeClick: ({ loginCallback }: { loginCallback: () => void }) => void
	handleRecentlyViewGameClick: (
		{
			tpId,
			tpGameType,
			isMaintain,
		}: {
			tpId: number
			tpGameType: number
			isMaintain: boolean
		},
		{
			loginCallback,
		}: {
			loginCallback: () => void
		}
	) => void
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
	handleSlotGamePlay: (
		{
			tpId,
			gameId,
			playFree,
		}: {
			tpId: number
			gameId: string
			playFree?: boolean
		},
		{ loginCallback }: { loginCallback: () => void }
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
	DesktopHomeComponentsEnum.Marquee,
	DesktopHomeComponentsEnum.CarouselBanner,
	DesktopHomeComponentsEnum.WelcomeInfo,
	DesktopHomeComponentsEnum.PromotionSwiper,
	DesktopHomeComponentsEnum.HotMatch,
	DesktopHomeComponentsEnum.LiveCasino,
	DesktopHomeComponentsEnum.HotGame,
	DesktopHomeComponentsEnum.AppDownloadBanner,
	DesktopHomeComponentsEnum.OfficialPartner,
	DesktopHomeComponentsEnum.LuckyWheel,
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
	persistNewsData,
	persistProgramList,
	persistBannerData,
	persistPromotionData,
	persistHotEventData,
	persistHotGameData,
	persistLicenseData,
	persistSlotsGameData,
	persistAnnouncementData,
	persistLatestHighlightVideo,
	desktopHomeOrders = defaultDesktopHomeOrders,
	mobileHomeOrders = defaultMobileHomeOrders,
}: IHomeProviderProps) => {
	const { push } = useRouter()
	const { onEnterSlotsPage, onEnterPage, menuData, onMenuOpen } = useMenu()
	const { tpMaintainList } = useGlobalData()
	const {
		auth: { isLogin },
		userInfo: { currencyId, langId },
	} = useAuth()

	const { ALLOWED_CURRENCIES, SLOT_TP_GAME_TYPE } = useStaticData()

	const { modal } = useGlobalModal()

	const { data: { data: announcementData = persistAnnouncementData } = {} } =
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

	const { data: { data: recentlyViewData } = {} } = useGetRecentlyViewedQuery(
		{
			currencyId,
			deviceType,
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

	const { recentlyViewedList = [] } = recentlyViewData ?? {}

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

	const promotionData = filter(
		persistPromotionData,
		({ displayFrom, displayTo }) => {
			return dayjs().isBetween(dayjs.unix(displayFrom), dayjs.unix(displayTo))
		}
	)

	const formatHdp = (hdp: number) => {
		if (hdp === 0) return hdp

		return `${hdp > 0 ? '+' : ''}${hdp}`
	}

	const handleHotGameClick = (
		{
			game,
			playFree = false,
		}: {
			game: IHotGame
			playFree?: boolean
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
				{
					tpId: String(tpId),
					gameId,
					tpGameType: String(tpGameType),
					isFree: playFree,
				},
				{ loginCallback }
			)
		} else {
			onEnterPage({ tpId, gameId, tpGameType, langId }, { loginCallback })
		}
	}

	const handleSlotGamePlay = (
		{
			tpId,
			gameId,
			playFree = false,
		}: {
			tpId: number
			gameId: string
			playFree?: boolean
		},
		{ loginCallback }: { loginCallback: () => void }
	) => {
		const tpGameType =
			find(Object.values(SLOT_TP_GAME_TYPE), { TP_ID: tpId })?.TP_GAME_TYPE ||
			''

		onEnterSlotsPage(
			{
				tpId: String(tpId),
				tpGameType: String(tpGameType),
				gameId,
				isFree: playFree,
			},
			{ loginCallback }
		)
	}

	const handleRecentlyViewGameClick = (
		{
			tpId,
			tpGameType,
			isMaintain,
		}: {
			tpId: number
			tpGameType: number
			isMaintain: boolean
		},
		{
			loginCallback,
		}: {
			loginCallback: () => void
		}
	) => {
		if (!isMaintain) {
			// 非 Maintain 才做動作
			let subMenu: ISubMenu | undefined
			Object.values(menuData).forEach((item: any) => {
				const result = item.subMenu?.find(
					({ product }: ISubMenu) =>
						product?.TP_ID === tpId && product?.TP_GAME_TYPE === tpGameType
				)
				if (result !== undefined) {
					subMenu = result
				}
			})
			if (subMenu !== undefined) {
				onMenuOpen(subMenu, { loginCallback })
			}
		}
	}

	const value: HomeContextInterface = {
		desktopHomeOrders,
		mobileHomeOrders,
		announcementData,
		recentlyViewedList,
		jackPotCurrencies,
		socialChannelList,
		footerSocialChannelList,
		promotionData,
		hotEventData,
		slotGameData: persistSlotsGameData,
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
		handleRecentlyViewGameClick,
		handleSlotGamePlay,
		formatHdp,
	}

	return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>
}
