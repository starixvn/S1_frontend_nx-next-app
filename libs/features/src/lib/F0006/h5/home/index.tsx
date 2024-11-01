import {
	Header,
	JackPot,
	Marquee,
	useAppDownload,
} from '@nx-next-app/components/H0006'
import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useHome } from '@nx-next-app/features/F0006/providers'
import { MobileHomeComponentsEnum } from '@nx-next-app/features/F0006/types'
import { useTpWalletBalanceListFetcher } from '@nx-next-app/hooks'
import { useSetHideBalanceMutation } from '@nx-next-app/service'
import { CurrenciesEnum } from '@nx-next-app/types'
import { multiEqual } from '@nx-next-app/utils'
import classNames from 'classnames'
import { includes } from 'lodash-es'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import CarouselBanner from '../common/carouselBanner'
import { AppDownload } from './AppDownload'
import { FriendReferral } from './FriendReferral'
import { HeaderQuickLink } from './HeaderQuickLink'
import { HotEventSwiper } from './HotEventSwiper'
import { HotGameMarquee } from './HotGameMarquee'
import { LoginBlock } from './LoginBlock'
import { PromotionMarquee } from './PromotionMarquee'
import { RecentlyViewGames } from './RecentlyViewGames'
import { SimpleFooter } from './SimpleFooter'
import { FooterBlock } from './footerBlock'
import Menu from './menu'

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
		mobileHomeOrders,
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

	const { ALLOWED_CURRENCIES } = useStaticData()

	const homeComponents = {
		[MobileHomeComponentsEnum.CarouselBanner]: () => (
			<CarouselBanner
				bannerList={bannerData}
				pagination={false}
				navigation={false}
			/>
		),
		[MobileHomeComponentsEnum.Marquee]: () => (
			<Marquee
				data={announcementData}
				onMarqueeClick={() =>
					handleMarqueeClick({
						loginCallback: () => push(paths.login.root),
					})
				}
			/>
		),
		[MobileHomeComponentsEnum.PromotionMarquee]: () => <PromotionMarquee />,
		[MobileHomeComponentsEnum.HotEventSwiper]: () => <HotEventSwiper />,
		[MobileHomeComponentsEnum.HotGameMarquee]: () => <HotGameMarquee />,
		[MobileHomeComponentsEnum.RecentlyViewGames]: () => <RecentlyViewGames />,
		[MobileHomeComponentsEnum.FriendReferral]: () => <FriendReferral />,
		[MobileHomeComponentsEnum.Jackpot]: () =>
			includes(jackPotCurrencies, currencyId) ? (
				<JackPot onClick={() => push(paths.slots.root)} isRoot />
			) : null,
		[MobileHomeComponentsEnum.LuckyWheel]: () => <LuckyWheel />,
		[MobileHomeComponentsEnum.AppDownload]: () => <AppDownload />,
		[MobileHomeComponentsEnum.FooterBlock]: () => <FooterBlock />,
		[MobileHomeComponentsEnum.SimpleFooter]: () => <SimpleFooter />,
	}

	// banner 區塊，目前只有兩個
	const bannerBlockOrders = mobileHomeOrders.filter(component =>
		multiEqual(component, [
			MobileHomeComponentsEnum.CarouselBanner,
			MobileHomeComponentsEnum.Marquee,
		])
	)

	// contents 區塊
	const contentOrders = mobileHomeOrders.filter(
		component => !includes(bannerBlockOrders, component)
	)

	const showAppDownload = includes(
		ALLOWED_CURRENCIES['APP_DOWNLOAD'] as CurrenciesEnum[],
		currencyId
	)

	return (
		<>
			<Header>
				<Header.AppDownLoad
					isAppDownloadHintActive={isAppDownloadHintActive}
					onCloseAppDownloadHint={onCloseAppDownloadHint}
					showAppDownload={showAppDownload}
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
				{bannerBlockOrders.map(component => {
					const Component = homeComponents[component]
					return Component ? <Component key={component} /> : null
				})}

				{!isLogin && <LoginBlock />}
				<div id='content'>
					<Menu />
					{contentOrders.map(component => {
						const Component = homeComponents[component]
						return Component ? <Component key={component} /> : null
					})}
				</div>
			</main>
		</>
	)
}

export default Home
