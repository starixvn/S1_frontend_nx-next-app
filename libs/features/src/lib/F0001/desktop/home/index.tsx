import React from 'react'
import dynamic from 'next/dynamic'
import { Marquee } from '@nx-next-app/components/D0001'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

import { PromotionMarquee } from './PromotionMarquee'
import { LatestVideAndEvent } from './latestVideoAndEvent'
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
		recentlyViewedList,
		socialChannelList,
		handleMarqueeClick,
	} = useHome()
	const { modal } = useGlobalModal()

	return (
		<main>
			{/* 首頁輪播 */}
			<CarouselBanner
				bannerList={bannerData}
				pagination={false}
				navigation={false}
			/>
			{/* 跑馬燈 */}
			<Marquee
				data={announcementData}
				onMarqueeClick={() =>
					handleMarqueeClick({
						loginCallback: () => modal.open(<LoginModal />),
					})
				}
			/>
			{/* Promotion跑馬燈 */}
			<PromotionMarquee />
			{/* 最新影片 與 event 區塊 */}
			<LatestVideAndEvent />
			{/* 熱門遊戲 */}
			<HotGameMarquee />
			{/* 有登入才會顯示最近看過的遊戲 */}
			{recentlyViewedList.length > 0 && <RecentlyViewGames />}
			{/* News */}
			<NewsBlock />
			{/* 底部 App download Banner */}
			<CenterBanner />
			{/* 頁面小元件，一律使用 dynamic import */}
			<LuckyWheel />
			<QuickDownload />
			{socialChannelList.length > 0 && (
				<QuickLink socialChannelList={socialChannelList} />
			)}
		</main>
	)
}

export default Home
