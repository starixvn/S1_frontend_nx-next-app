import { useAuth } from "@nx-next-app/data-access";
import { HomePage } from "@nx-next-app/features/F0001/desktop/home/styles";
import { useHome } from "@nx-next-app/features/F0001/providers";
import { DesktopHomeComponentsEnum } from "@nx-next-app/features/F0001/types";
import { IBannerData } from "@nx-next-app/service";
import dynamic from "next/dynamic";
import { Fragment, useCallback } from "react";

// Page Components

const WelcomeInfo = dynamic(() => import('./welcomeInfo/WelcomeInfo'))

const CarouselBanner = dynamic(() => import('../common/carouselBanner'))

const LiveCasino = dynamic(() => import('./liveCasinoGames'))

const HotGame = dynamic(() => import('./HotGame'), { ssr: false })

const TableGames = dynamic(() => import('./tableGames'), { ssr: false })

const HotGameSport = dynamic(() => import('./sportGames'), { ssr: false })

const HotGameSlot = dynamic(() => import('./slotGames'), {
	ssr: false,
})

const Announcement = dynamic(() => import('./Announcement'), { ssr: false })

const PromotionSwiper = dynamic(() => import('./promotion'))

const NewReleasedGame = dynamic(() => import('./newReleasedGames'))

const ProviderList = dynamic(() => import('./providers'), { ssr: false })

const defaultBanner: IBannerData[] = [
	{
		bannerName: 'Default Banner',
		bannerType: 1,
		actionMode: 1,
		bonusCode: null,
		tpId: '0',
		gameId: null,
		urlRouter: '',
		details: null,
		bannerLink: '',
		bannerPCUrl: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/default-banner-lobby.webp`,
		bannerMobileUrl: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/new-ui/default-banner-lobby.webp`,
		logo: null,
		backgroundPic: null,
		tpGameType: 0,
		redirectLink: null,
		itemKey: '',
	},
]

const Home = () => {
	// 因為有用useCallback避免render issue，因此這邊資料僅使用static＆serverSide data
	// clientSide api fetch在元件內部呼叫
	const { bannerData, desktopHomeOrders } = useHome()

	const {
		userInfo: { langId, currencyId },
	} = useAuth()

	const bannerList =
		bannerData !== null && bannerData !== undefined && bannerData?.length > 0
			? bannerData
			: defaultBanner

	const homeComponents = {
		[DesktopHomeComponentsEnum.CarouselBanner]: (
			<CarouselBanner
				className='homebanner'
				bannerList={bannerList}
				navigation={false}
			/>
		),
		[DesktopHomeComponentsEnum.Announcement]: <Announcement />,
		[DesktopHomeComponentsEnum.PromotionSwiper]: <PromotionSwiper />,
		[DesktopHomeComponentsEnum.WelcomeInfo]: <WelcomeInfo />,
		[DesktopHomeComponentsEnum.TableGames]: <TableGames />,
		[DesktopHomeComponentsEnum.LiveCasino]: <LiveCasino />,
		[DesktopHomeComponentsEnum.SlotGames]: <HotGameSlot />,
		[DesktopHomeComponentsEnum.HotGame]: <HotGame />,
		[DesktopHomeComponentsEnum.HotGameSport]: <HotGameSport />,
		[DesktopHomeComponentsEnum.NewRelease]: <NewReleasedGame />,
		[DesktopHomeComponentsEnum.ProviderList]: <ProviderList />,
	}

	// 避免map造成多次調用renderComponent因此用useCallback包起來
	const renderComponent = useCallback(
		(component: DesktopHomeComponentsEnum) => {
			return homeComponents[component] ? (
				<Fragment key={component}>{homeComponents[component]}</Fragment>
			) : null
		},
		[langId, currencyId]
	)

	return (
		<HomePage className='main-content'>
			{desktopHomeOrders.map(component => renderComponent(component))}
		</HomePage>
	)
}

export default Home
