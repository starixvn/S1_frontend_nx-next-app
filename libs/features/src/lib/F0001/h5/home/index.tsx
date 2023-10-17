import { includes } from 'lodash-es'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import {
	Header,
	useAppDownload,
	Marquee,
	JackPot,
} from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useTpWalletBalanceListFetcher } from '@nx-next-app/hooks'
import { useSetHideBalanceMutation } from '@nx-next-app/service'
import { useHome } from '@nx-next-app/features/F0001/providers'

import dynamic from 'next/dynamic'
import Menu from './menu'
import { LoginBlock } from './LoginBlock'
import { AppDownload } from './AppDownload'
import { PromotionMarquee } from './PromotionMarquee'
import { HotEventSwiper } from './HotEventSwiper'
import { HotGameMarquee } from './HotGameMarquee'
import { RecentlyViewGames } from './RecentlyViewGames'
import { FriendReferral } from './FriendReferral'
import { FooterBlock } from './footerBlock'
import CarouselBanner from '../common/carouselBanner'
import { HeaderQuickLink } from './HeaderQuickLink'

interface IHomeProps {
	persistAppDownloadHint: string
}

const LuckyWheel = dynamic(() => import('../common/LuckyWheel'), { ssr: false })

const Home = ({ persistAppDownloadHint }: IHomeProps) => {
	const { push } = useRouter()

	const {
		userInfo: { langId, currencyId },
		auth: { isLogin },
	} = useAuth()

	const {
		bannerData,
		announcementData,
		handleMarqueeClick,
		jackPotCurrencies,
		recentlyViewedList,
	} = useHome()

	const {
		isLoading: isTpWalletBalanceListLoading,
		isHideBalance,
		totalWalletBalance,
		mainWalletInfo,
		custBonusWalletList,
		tpWalletBalanceList,
		onRefetchAllWallet,
	} = useTpWalletBalanceListFetcher({ langId })

	const [setHideBalance] = useSetHideBalanceMutation()

	const { isAppDownloadHintActive, onCloseAppDownloadHint } = useAppDownload(
		Boolean(persistAppDownloadHint)
	)

	return (
		<>
			<Header>
				<Header.AppDownLoad
					isAppDownloadHintActive={isAppDownloadHintActive}
					onCloseAppDownloadHint={onCloseAppDownloadHint}
				/>

				<Header.HeaderModule
					isTpWalletBalanceListLoading={isTpWalletBalanceListLoading}
					originIsHideBalance={isHideBalance}
					totalWalletBalance={totalWalletBalance}
					mainWalletInfo={mainWalletInfo}
					custBonusWalletList={custBonusWalletList}
					tpWalletBalanceList={tpWalletBalanceList}
					onRefetchAllWallet={onRefetchAllWallet}
					onSetHideBalance={setHideBalance}
				/>
			</Header>

			<main
				// * 當 Header.AppDownLoad 顯示時要加入 'active' class name
				className={classNames({
					active: isAppDownloadHintActive,
				})}
			>
				{isLogin && <HeaderQuickLink />}

				<CarouselBanner
					bannerList={bannerData}
					pagination={false}
					navigation={false}
				/>
				<Marquee
					data={announcementData}
					onMarqueeClick={() =>
						handleMarqueeClick({
							loginCallback: () => push(paths.login.root),
						})
					}
				/>
				{!isLogin && <LoginBlock />}
				<div id='content'>
					<Menu />
					{/* Promotion跑馬燈 */}
					<PromotionMarquee />
					{/* HotEvent */}
					<HotEventSwiper />
					{/* 熱門遊戲 */}
					<HotGameMarquee />
					{/* 有登入才會顯示最近看過的遊戲 */}
					{recentlyViewedList.length > 0 && <RecentlyViewGames />}
					{isLogin && <FriendReferral />}
					{includes(jackPotCurrencies, currencyId) && (
						<JackPot onClick={() => push(paths.slots.root)} isRoot />
					)}
					<LuckyWheel />
					{/* 先隱藏 */}
					{/* <AppDownload /> */}
					{/* <FooterBlock /> */}
				</div>
			</main>
		</>
	)
}

export default Home
