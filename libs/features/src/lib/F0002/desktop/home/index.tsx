import React from 'react'
import dynamic from 'next/dynamic'
import { Marquee } from '@nx-next-app/components/D0002'
import { useHome } from '@nx-next-app/features/F0002/providers'
import { DesktopHomeComponentsEnum } from '@nx-next-app/types'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

import { PromotionMarquee } from './PromotionMarquee'
import { LatestVideoAndEvent } from './latestVideoAndEvent'
import { HotGameMarquee } from './HotGameMarquee'
import { NewsBlock } from './news'
import { RecentlyViewGames } from './RecentlyViewGames'
import CarouselBanner from '../common/carouselBanner'
import { CenterBanner } from './CenterBanner'

const LuckyWheel = dynamic(() => import('../common/LuckyWheel'), { ssr: false })

const QuickDownload = dynamic(() => import('./widgets/QuickDownload'), {
	ssr: false,
})

const QuickLink = dynamic(() => import('./widgets/QuickLink'), { ssr: false })

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
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
	const { modal } = useGlobalModal()
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
