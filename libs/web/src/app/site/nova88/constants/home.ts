import {
	DesktopHomeComponentsEnum,
	MobileHomeComponentsEnum,
} from '@nx-next-app/features/F0001/types'

export const DESKTOP_HOME_ORDERS = [
	DesktopHomeComponentsEnum.Announcement,
	DesktopHomeComponentsEnum.CarouselBanner,
	DesktopHomeComponentsEnum.WelcomeInfo,
	DesktopHomeComponentsEnum.PromotionSwiper,
	DesktopHomeComponentsEnum.HotMatch,
	DesktopHomeComponentsEnum.LiveCasino,
	DesktopHomeComponentsEnum.HotGame,
	// DesktopHomeComponentsEnum.RecentlyViewGames, 目前隱藏，未來看需求有可能開啟
	DesktopHomeComponentsEnum.ProviderBlock,
	DesktopHomeComponentsEnum.OfficialPartner,
	DesktopHomeComponentsEnum.LiveStreamingLink,
	DesktopHomeComponentsEnum.EuropeCupEntry,
	DesktopHomeComponentsEnum.LuckyWheel,
	DesktopHomeComponentsEnum.Retention,
	DesktopHomeComponentsEnum.OlympicEntry,
]

export const MOBILE_HOME_ORDERS = [
	MobileHomeComponentsEnum.Announcement,
	MobileHomeComponentsEnum.CarouselBanner,
	MobileHomeComponentsEnum.HotEventSwiper,
	MobileHomeComponentsEnum.PromotionSwiper,
	MobileHomeComponentsEnum.HotGameSwiper,
	// MobileHomeComponentsEnum.RecentlyViewGames,  目前隱藏，未來看需求有可能開啟
	MobileHomeComponentsEnum.JackPotSwiper,
	MobileHomeComponentsEnum.AppDownload,
	MobileHomeComponentsEnum.PartnerBlock,
	MobileHomeComponentsEnum.FooterBlock,
	MobileHomeComponentsEnum.LiveStreamingLink,
	MobileHomeComponentsEnum.EuropeCupEntry,
	MobileHomeComponentsEnum.LuckyWheel,
	MobileHomeComponentsEnum.Retention,
	MobileHomeComponentsEnum.OlympicEntry,
]
