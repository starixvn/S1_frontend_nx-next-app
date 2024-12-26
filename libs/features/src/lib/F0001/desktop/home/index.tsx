import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { DesktopHomeComponentsEnum } from '@nx-next-app/features/F0001/types'
import { includes } from 'lodash-es'
import dynamic from 'next/dynamic'
import { Fragment, useCallback } from 'react'

// Page Components
const ProvidersBlock = dynamic(() => import('./ProvidersBlock'), { ssr: false })

const WelcomeInfo = dynamic(() => import('./WelcomeInfo'))

const CarouselBanner = dynamic(() => import('../common/carouselBanner'))

const HotMatch = dynamic(() => import('./hotMatch'))

const LiveCasino = dynamic(() => import('./LiveCasino'))

const HotGame = dynamic(() => import('./HotGame'), { ssr: false })

const Announcement = dynamic(() => import('./Announcement'), { ssr: false })

const AppDownloadBanner = dynamic(() => import('./AppDownloadBanner'), {
	ssr: false,
})

const RecentlyViewGames = dynamic(() => import('./RecentlyViewGames'), {
	ssr: false,
})

const PromotionSwiper = dynamic(() => import('./PromotionSwiper'))

const OfficialPartner = dynamic(() => import('./OfficialPartner'), {
	ssr: false,
})

const LuckyWheel = dynamic(() => import('../common/LuckyWheel'), { ssr: false })

const EuropeCupEntry = dynamic(() => import('../common/EuropeCupEntry'), {
	ssr: false,
})

const Retention = dynamic(() => import('../common/RetentionEntry'), {
	ssr: false,
})

const LiveStreamingLink = dynamic(() => import('../common/liveStreamingLink'), {
	ssr: false,
})

const QuickDownload = dynamic(() => import('./widgets/QuickDownload'), {
	ssr: false,
})

const QuickLink = dynamic(() => import('./widgets/QuickLink'), { ssr: false })

const OlympicEntry = dynamic(() => import('../common/OlympicEntry'), {
	ssr: false,
})

const NewYearEvent = dynamic(() => import('../common/NewYearEvent'), {
	ssr: false,
})

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
		[DesktopHomeComponentsEnum.HotMatch]: includes(
			ALLOWED_CURRENCIES.SPORTS_SABA_CLUB,
			currencyId
		) ? (
			<HotMatch />
		) : null,
		[DesktopHomeComponentsEnum.LiveCasino]: <LiveCasino />,
		[DesktopHomeComponentsEnum.HotGame]: <HotGame />,
		[DesktopHomeComponentsEnum.RecentlyViewGames]: <RecentlyViewGames />,
		[DesktopHomeComponentsEnum.AppDownloadBanner]: <AppDownloadBanner />,
		[DesktopHomeComponentsEnum.OfficialPartner]: <OfficialPartner />,
		[DesktopHomeComponentsEnum.ProviderBlock]: <ProvidersBlock />,
		[DesktopHomeComponentsEnum.EuropeCupEntry]: includes(
			ALLOWED_CURRENCIES.Euro_Cup,
			currencyId
		) ? (
			<EuropeCupEntry />
		) : null,
		[DesktopHomeComponentsEnum.LuckyWheel]: <LuckyWheel />,
		[DesktopHomeComponentsEnum.NewYearEvent]: <NewYearEvent />,
		[DesktopHomeComponentsEnum.Retention]: <Retention />,
		[DesktopHomeComponentsEnum.LiveStreamingLink]: <LiveStreamingLink />,
		[DesktopHomeComponentsEnum.QuickDownload]: <QuickDownload />,
		[DesktopHomeComponentsEnum.QuickLink]: <QuickLink />,
		[DesktopHomeComponentsEnum.OlympicEntry]: includes(
			ALLOWED_CURRENCIES.OLYMPIC,
			currencyId
		) ? (
			<OlympicEntry />
		) : null,
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
		<main>
			{desktopHomeOrders.map(component => renderComponent(component))}
		</main>
	)
}

export default Home
