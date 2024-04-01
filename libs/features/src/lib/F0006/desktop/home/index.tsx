import React from 'react'
import dynamic from 'next/dynamic'
import { Marquee } from '@nx-next-app/components/D0006'
import { useHome } from '@nx-next-app/features/F0006/providers'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { DesktopHomeComponentsEnum } from '@nx-next-app/features/F0006/types'

const CarouselBanner = dynamic(() => import('../common/carouselBanner'))

const PromotionMarquee = dynamic(() => import('./PromotionMarquee'))

const LatestVideoAndEvent = dynamic(() => import('./latestVideoAndEvent'))

const HotGameMarquee = dynamic(() => import('./HotGameMarquee'), { ssr: false })

const NewsBlock = dynamic(() => import('./news'))

const RecentlyViewGames = dynamic(() => import('./RecentlyViewGames'), {
	ssr: false,
})

const CenterBanner = dynamic(() => import('./CenterBanner'), { ssr: false })

const LuckyWheel = dynamic(() => import('../common/LuckyWheel'), { ssr: false })

const QuickDownload = dynamic(() => import('./widgets/QuickDownload'), {
	ssr: false,
})

const QuickLink = dynamic(() => import('./widgets/QuickLink'), { ssr: false })

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

const Home = () => {
	const { modal } = useGlobalModal()

	const {
		bannerData,
		announcementData,
		socialChannelList,
		desktopHomeOrders,
		handleMarqueeClick,
	} = useHome()

	const homeComponents = {
		[DesktopHomeComponentsEnum.CarouselBanner]: (
			<CarouselBanner
				bannerList={bannerData}
				pagination={false}
				navigation={false}
			/>
		),
		[DesktopHomeComponentsEnum.Marquee]: (
			<Marquee
				data={announcementData}
				onMarqueeClick={() =>
					handleMarqueeClick({
						loginCallback: () => modal.open(<LoginModal />),
					})
				}
			/>
		),
		[DesktopHomeComponentsEnum.PromotionMarquee]: <PromotionMarquee />,
		[DesktopHomeComponentsEnum.LatestVideoAndEvent]: <LatestVideoAndEvent />,
		[DesktopHomeComponentsEnum.HotGameMarquee]: <HotGameMarquee />,
		[DesktopHomeComponentsEnum.RecentlyViewGames]: <RecentlyViewGames />,
		[DesktopHomeComponentsEnum.NewsBlock]: <NewsBlock />,
		[DesktopHomeComponentsEnum.CenterBanner]: <CenterBanner />,
		[DesktopHomeComponentsEnum.LuckyWheel]: <LuckyWheel />,
		[DesktopHomeComponentsEnum.QuickDownload]: <QuickDownload />,
		[DesktopHomeComponentsEnum.QuickLink]: (
			<QuickLink socialChannelList={socialChannelList} />
		),
	}
	return (
		<main>
			{desktopHomeOrders.map(component =>
				homeComponents[component] ? homeComponents[component] : null
			)}
		</main>
	)
}

export default Home
