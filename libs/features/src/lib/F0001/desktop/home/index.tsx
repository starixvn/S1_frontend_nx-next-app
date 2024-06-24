import React from 'react'
import dynamic from 'next/dynamic'
import { includes } from 'lodash-es'
import { Marquee } from '@nx-next-app/components/D0001'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { DesktopHomeComponentsEnum } from '@nx-next-app/features/F0001/types'
import { ALLOWED_CURRENCIES } from '@nx-next-app/site/nova88'
import { useAuth } from '@nx-next-app/data-access'

// Page Components
const ProvidersBlock = dynamic(() => import('./ProvidersBlock'), { ssr: false })

const WelcomeInfo = dynamic(() => import('./WelcomeInfo'))

const CarouselBanner = dynamic(() => import('../common/carouselBanner'))

const HotMatch = dynamic(() => import('./hotMatch'))

const LiveCasino = dynamic(() => import('./LiveCasino'))

const HotGame = dynamic(() => import('./HotGame'), { ssr: false })

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

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

const OlympicEntry = dynamic(() => import('../common/OlympicEntry'), {
	ssr: false,
})

const Home = () => {
	const {
		bannerData,
		announcementData,
		socialChannelList,
		desktopHomeOrders,
		handleMarqueeClick,
	} = useHome()
	const {
		userInfo: { currencyId },
	} = useAuth()

	const { modal } = useGlobalModal()
	const homeComponents = {
		[DesktopHomeComponentsEnum.CarouselBanner]: () => (
			<CarouselBanner
				className='homebanner'
				bannerList={bannerData}
				navigation={false}
			/>
		),
		[DesktopHomeComponentsEnum.Marquee]: () => (
			<Marquee
				data={announcementData}
				onMarqueeClick={() =>
					handleMarqueeClick({
						loginCallback: () => modal.open(<LoginModal />),
					})
				}
			/>
		),
		[DesktopHomeComponentsEnum.PromotionSwiper]: () => <PromotionSwiper />,
		[DesktopHomeComponentsEnum.WelcomeInfo]: () => <WelcomeInfo />,
		[DesktopHomeComponentsEnum.HotMatch]: () => <HotMatch />,
		[DesktopHomeComponentsEnum.LiveCasino]: () => <LiveCasino />,
		[DesktopHomeComponentsEnum.HotGame]: () => <HotGame />,
		[DesktopHomeComponentsEnum.RecentlyViewGames]: () => <RecentlyViewGames />,
		[DesktopHomeComponentsEnum.AppDownloadBanner]: () => <AppDownloadBanner />,
		[DesktopHomeComponentsEnum.OfficialPartner]: () => <OfficialPartner />,
		[DesktopHomeComponentsEnum.ProviderBlock]: () => <ProvidersBlock />,
		[DesktopHomeComponentsEnum.EuropeCupEntry]: () =>
			includes(ALLOWED_CURRENCIES.Euro_Cup, currencyId) ? (
				<EuropeCupEntry />
			) : null,
		[DesktopHomeComponentsEnum.LuckyWheel]: () => <LuckyWheel />,
		[DesktopHomeComponentsEnum.Retention]: () => <Retention />,
		[DesktopHomeComponentsEnum.LiveStreamingLink]: () => <LiveStreamingLink />,
		[DesktopHomeComponentsEnum.QuickDownload]: () => <QuickDownload />,
		[DesktopHomeComponentsEnum.QuickLink]: () => (
			<QuickLink socialChannelList={socialChannelList} />
		),
		[DesktopHomeComponentsEnum.OlympicEntry]: () => <OlympicEntry />,
	}
	return (
		<main>
			{desktopHomeOrders.map(component => {
				const Component = homeComponents[component]
				return Component ? <Component key={component} /> : null
			})}
		</main>
	)
}

export default Home
