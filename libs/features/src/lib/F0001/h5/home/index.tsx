import { includes } from 'lodash-es'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import {
	Header,
	JackPot,
	Marquee,
	useAppDownload,
} from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useTpWalletBalanceListFetcher } from '@nx-next-app/hooks'
import { useSetHideBalanceMutation } from '@nx-next-app/service'
import { useHome } from '@nx-next-app/features/F0001/providers'
import dynamic from 'next/dynamic'
import { CurrenciesEnum } from '@nx-next-app/types'
import { multiEqual } from '@nx-next-app/utils'
import { MobileHomeComponentsEnum } from '@nx-next-app/features/F0001/types'
import Menu from './menu'

interface IHomeProps {
	persistAppDownloadHint: string
}

const LuckyWheel = dynamic(() => import('../common/LuckyWheel'), { ssr: false })

const LiveStreamingLink = dynamic(() => import('../common/liveStreamingLink'), {
	ssr: false,
})

const EuroCupEntry = dynamic(() => import('../common/EuroCupEntry'), {
	ssr: false,
})

const CarouselBanner = dynamic(() => import('../common/carouselBanner'), {
	ssr: false,
})

const PromotionSwiper = dynamic(() => import('./PromotionSwiper'))

const HotEventSwiper = dynamic(() => import('./HotEventSwiper'))

const HotGameSwiper = dynamic(() => import('./HotGameSwiper'))

const RecentlyViewGames = dynamic(() => import('./RecentlyViewGames'), {
	ssr: false,
})

const FriendReferral = dynamic(() => import('./FriendReferral'), { ssr: false })

const AppDownload = dynamic(() => import('./AppDownload'))

const SimpleFooter = dynamic(() => import('./SimpleFooter'))

const FooterBlock = dynamic(() => import('./footerBlock'))

const JackPotSwiper = dynamic(() => import('./JackPotSwiper'), { ssr: false })

const PartnerBlock = dynamic(() => import('./PartnerBlock'))

const Home = ({ persistAppDownloadHint }: IHomeProps) => {
	const { push } = useRouter()

	const {
		userInfo: { langId, currencyId },
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
			<div className='home-mainbanner'>
				<CarouselBanner
					bannerList={bannerData}
					pagination={false}
					navigation={false}
				/>
			</div>
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
		[MobileHomeComponentsEnum.PromotionSwiper]: () => <PromotionSwiper />,
		[MobileHomeComponentsEnum.HotEventSwiper]: () => <HotEventSwiper />,
		[MobileHomeComponentsEnum.HotGameSwiper]: () => <HotGameSwiper />,
		[MobileHomeComponentsEnum.RecentlyViewGames]: () => <RecentlyViewGames />,
		[MobileHomeComponentsEnum.FriendReferral]: () => <FriendReferral />,
		[MobileHomeComponentsEnum.Jackpot]: () =>
			includes(jackPotCurrencies, currencyId) ? (
				<JackPot onClick={() => push(paths.slots.root)} isRoot />
			) : null,
		[MobileHomeComponentsEnum.EuropeCupEntry]: () => includes(
			ALLOWED_CURRENCIES.Euro_Cup,
			currencyId
		) ? (
			<EuroCupEntry />
		) : null,
		[MobileHomeComponentsEnum.LuckyWheel]: () => <LuckyWheel />,
		[MobileHomeComponentsEnum.LiveStreamingLink]: () => <LiveStreamingLink />,
		[MobileHomeComponentsEnum.AppDownload]: () => <AppDownload />,
		[MobileHomeComponentsEnum.FooterBlock]: () => <FooterBlock />,
		[MobileHomeComponentsEnum.SimpleFooter]: () => <SimpleFooter />,
		[MobileHomeComponentsEnum.JackPotSwiper]: () => <JackPotSwiper />,
		[MobileHomeComponentsEnum.PartnerBlock]: () => <PartnerBlock />,
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
				{bannerBlockOrders.map(component => {
					const Component = homeComponents[component]
					return Component ? <Component key={component} /> : null
				})}

				<Menu />
				{contentOrders.map(component => {
					const Component = homeComponents[component]
					return Component ? <Component key={component} /> : null
				})}
			</main>
		</>
	)
}

export default Home
