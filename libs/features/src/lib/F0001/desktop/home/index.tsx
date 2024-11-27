import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { HomePage } from '@nx-next-app/features/F0001/desktop/home/styles'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { DesktopHomeComponentsEnum } from '@nx-next-app/features/F0001/types'
import dynamic from 'next/dynamic'
import { Fragment, useCallback } from 'react'

// Page Components
const ProvidersBlock = dynamic(() => import('./ProvidersBlock'), { ssr: false })

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

// const HotGameLiveCasino = dynamic(() => import('./HotGameLiveCasino'), {
// 	ssr: false,
// })
// const HotGameFishing = dynamic(() => import('./HotGameFishing'), { ssr: false })
// const HotGameCockfighting = dynamic(() => import('./HotGameCockfighting'), {
// 	ssr: false,
// })
// const HotGameLottery = dynamic(() => import('./HotGameLottery'), { ssr: false })
// const HotGameVirtualSports = dynamic(() => import('./HotGameVirtualSports'), {
// 	ssr: false,
// })
// const HotGameP2P = dynamic(() => import('./HotGameP2P'), { ssr: false })
// const HotGameCrypto = dynamic(() => import('./HotGameCrypto'), { ssr: false })
// const HotGameESports = dynamic(() => import('./HotGameESports'), { ssr: false })

// const RecentlyViewGames = dynamic(() => import('./RecentlyViewGames'), {
// 	ssr: false,
// })

// const LuckyWheel = dynamic(() => import('../common/LuckyWheel'), { ssr: false })

// const EuropeCupEntry = dynamic(() => import('../common/EuropeCupEntry'), {
// 	ssr: false,
// })

// const Retention = dynamic(() => import('../common/RetentionEntry'), {
// 	ssr: false,
// })

// const LiveStreamingLink = dynamic(() => import('../common/liveStreamingLink'), {
// 	ssr: false,
// })

// const QuickDownload = dynamic(() => import('./widgets/QuickDownload'), {
// 	ssr: false,
// })

// const QuickLink = dynamic(() => import('./widgets/QuickLink'), { ssr: false })

// const OlympicEntry = dynamic(() => import('../common/OlympicEntry'), {
// 	ssr: false,
// })

const Home = () => {
	// 因為有用useCallback避免render issue，因此這邊資料僅使用static＆serverSide data
	// clientSide api fetch在元件內部呼叫
	const { bannerData, desktopHomeOrders } = useHome()

	const {
		userInfo: { langId, currencyId },
	} = useAuth()
	const { ALLOWED_CURRENCIES } = useStaticData()

	const homeComponents = {
		[DesktopHomeComponentsEnum.CarouselBanner]: (
			<CarouselBanner
				className='homebanner'
				bannerList={bannerData}
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

		// [DesktopHomeComponentsEnum.HotGameLiveCasino]: <HotGameLiveCasino />,

		// [DesktopHomeComponentsEnum.HotGameFishing]: <HotGameFishing />,
		// [DesktopHomeComponentsEnum.HotGameCockfighting]: <HotGameCockfighting />,
		// [DesktopHomeComponentsEnum.HotGameLottery]: <HotGameLottery />,
		// [DesktopHomeComponentsEnum.HotGameVirtualSports]: <HotGameVirtualSports />,
		// [DesktopHomeComponentsEnum.HotGameP2P]: <HotGameP2P />,
		// [DesktopHomeComponentsEnum.HotGameCrypto]: <HotGameCrypto />,
		// [DesktopHomeComponentsEnum.HotGameESports]: <HotGameESports />,
		// [DesktopHomeComponentsEnum.RecentlyViewGames]: <RecentlyViewGames />,
		// [DesktopHomeComponentsEnum.ProviderBlock]: <ProvidersBlock />,
		// [DesktopHomeComponentsEnum.EuropeCupEntry]: includes(
		// 	ALLOWED_CURRENCIES.Euro_Cup,
		// 	currencyId
		// ) ? (
		// 	<EuropeCupEntry />
		// ) : null,
		// [DesktopHomeComponentsEnum.LuckyWheel]: <LuckyWheel />,
		// [DesktopHomeComponentsEnum.Retention]: <Retention />,
		// [DesktopHomeComponentsEnum.LiveStreamingLink]: <LiveStreamingLink />,
		// [DesktopHomeComponentsEnum.QuickDownload]: <QuickDownload />,
		// [DesktopHomeComponentsEnum.QuickLink]: <QuickLink />,
		// [DesktopHomeComponentsEnum.OlympicEntry]: includes(
		// 	ALLOWED_CURRENCIES.OLYMPIC,
		// 	currencyId
		// ) ? (
		// 	<OlympicEntry />
		// ) : null,
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
