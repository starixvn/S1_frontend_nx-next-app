import {
	DesktopHomeComponentsEnum,
	MobileHomeComponentsEnum,
} from '@nx-next-app/features/F0001/types'

export const DESKTOP_HOME_ORDERS = [
	DesktopHomeComponentsEnum.Announcement,
	DesktopHomeComponentsEnum.CarouselBanner,
	DesktopHomeComponentsEnum.WelcomeInfo,
	DesktopHomeComponentsEnum.SlotGames,
	DesktopHomeComponentsEnum.LiveCasino,
	DesktopHomeComponentsEnum.PromotionSwiper,
	DesktopHomeComponentsEnum.TableGames,
	DesktopHomeComponentsEnum.HotGameSport,
	DesktopHomeComponentsEnum.NewRelease,
	// DesktopHomeComponentsEnum.HotGame,
	// DesktopHomeComponentsEnum.HotGameLiveCasino,
	// // DesktopHomeComponentsEnum.RecentlyViewGames, 目前隱藏，未來看需求有可能開啟
	// DesktopHomeComponentsEnum.ProviderBlock,
	// DesktopHomeComponentsEnum.LiveStreamingLink,
	// DesktopHomeComponentsEnum.EuropeCupEntry,
	// DesktopHomeComponentsEnum.LuckyWheel,
	// DesktopHomeComponentsEnum.Retention,
	// DesktopHomeComponentsEnum.OlympicEntry,
]

export const MOBILE_HOME_ORDERS = [
	MobileHomeComponentsEnum.Announcement,
	MobileHomeComponentsEnum.CarouselBanner,
	MobileHomeComponentsEnum.HotEventSwiper,
	MobileHomeComponentsEnum.PromotionSwiper,
	MobileHomeComponentsEnum.HotGameSwiper,
	MobileHomeComponentsEnum.HotGameCasinoSwiper,
	// MobileHomeComponentsEnum.RecentlyViewGames,  目前隱藏，未來看需求有可能開啟
	MobileHomeComponentsEnum.JackPotSwiper,
	// MobileHomeComponentsEnum.AppDownload,
	// MobileHomeComponentsEnum.PartnerBlock,
	MobileHomeComponentsEnum.FooterBlock,
	MobileHomeComponentsEnum.LiveStreamingLink,
	MobileHomeComponentsEnum.EuropeCupEntry,
	// MobileHomeComponentsEnum.LuckyWheel,
	MobileHomeComponentsEnum.Retention,
	MobileHomeComponentsEnum.OlympicEntry,
]
