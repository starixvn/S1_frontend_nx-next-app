import { Header, JackPot, useAppDownload } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { useAuth, useGlobalData, useStaticData } from '@nx-next-app/data-access'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { MobileHomeComponentsEnum } from '@nx-next-app/features/F0001/types'
import { useTpWalletBalanceListFetcher } from '@nx-next-app/hooks'
import { useSetHideBalanceMutation } from '@nx-next-app/service'
import { CurrenciesEnum } from '@nx-next-app/types'
import { multiEqual } from '@nx-next-app/utils'
import classNames from 'classnames'
import { includes } from 'lodash-es'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Fragment, useCallback } from 'react'
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

const Retention = dynamic(() => import('../common/RetentionEntry'), {
	ssr: false,
})

const CarouselBanner = dynamic(() => import('../common/carouselBanner'), {
	ssr: false,
})

const Announcement = dynamic(() => import('./Announcement'))

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

const OlympicEntry = dynamic(() => import('../common/OlympicEntry'), {
	ssr: false,
})

const NewYearEvent = dynamic(() => import('../common/NewYearEvent'), {
	ssr: false,
})

const Home = ({ persistAppDownloadHint }: IHomeProps) => {
	const { push } = useRouter()

	const {
		userInfo: { langId, currencyId },
	} = useAuth()

	// 因為有用useCallback避免render issue，因此這邊資料僅使用static＆serverSide data
	// clientSide api fetch在元件內部呼叫
	const { bannerData, mobileHomeOrders } = useHome()

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

	const { isInApp } = useGlobalData()

	const { ALLOWED_CURRENCIES } = useStaticData()

	const homeComponents = {
		[MobileHomeComponentsEnum.CarouselBanner]: (
			<div className='home-mainbanner'>
				<CarouselBanner
					bannerList={bannerData}
					pagination={false}
					navigation={false}
				/>
			</div>
		),
		[MobileHomeComponentsEnum.Announcement]: <Announcement />,
		[MobileHomeComponentsEnum.PromotionSwiper]: <PromotionSwiper />,
		[MobileHomeComponentsEnum.HotEventSwiper]: includes(
			ALLOWED_CURRENCIES.SPORTS_SABA_CLUB,
			currencyId
		) ? (
			<HotEventSwiper />
		) : null,
		[MobileHomeComponentsEnum.HotGameSwiper]: <HotGameSwiper />,
		[MobileHomeComponentsEnum.RecentlyViewGames]: <RecentlyViewGames />,
		[MobileHomeComponentsEnum.FriendReferral]: <FriendReferral />,
		[MobileHomeComponentsEnum.Jackpot]: includes(
			ALLOWED_CURRENCIES.JACKPOT,
			currencyId
		) ? (
			<JackPot onClick={() => push(paths.slots.root)} isRoot />
		) : null,
		[MobileHomeComponentsEnum.EuropeCupEntry]: includes(
			ALLOWED_CURRENCIES.Euro_Cup,
			currencyId
		) ? (
			<EuroCupEntry />
		) : null,
		[MobileHomeComponentsEnum.LuckyWheel]: <LuckyWheel />,
		[MobileHomeComponentsEnum.NewYearEvent]: <NewYearEvent />,
		[MobileHomeComponentsEnum.Retention]: <Retention />,

		[MobileHomeComponentsEnum.LiveStreamingLink]: <LiveStreamingLink />,
		[MobileHomeComponentsEnum.AppDownload]:
			isInApp === false ? <AppDownload /> : null,

		[MobileHomeComponentsEnum.FooterBlock]: <FooterBlock />,
		[MobileHomeComponentsEnum.SimpleFooter]: <SimpleFooter />,
		[MobileHomeComponentsEnum.JackPotSwiper]: <JackPotSwiper />,
		[MobileHomeComponentsEnum.PartnerBlock]: <PartnerBlock />,
		[MobileHomeComponentsEnum.OlympicEntry]: includes(
			ALLOWED_CURRENCIES.OLYMPIC,
			currencyId
		) ? (
			<OlympicEntry />
		) : null,
	}

	// banner 區塊，目前只有兩個
	const bannerBlockOrders = mobileHomeOrders.filter(component =>
		multiEqual(component, [
			MobileHomeComponentsEnum.CarouselBanner,
			MobileHomeComponentsEnum.Announcement,
		])
	)

	// contents 區塊
	const contentOrders = mobileHomeOrders.filter(
		component => !includes(bannerBlockOrders, component)
	)

	const showAppDownload =
		isInApp === false &&
		isAppDownloadHintActive &&
		includes(ALLOWED_CURRENCIES['APP_DOWNLOAD'] as CurrenciesEnum[], currencyId)

	// 避免map造成多次調用renderComponent因此用useCallback包起來
	const renderComponent = useCallback(
		(component: MobileHomeComponentsEnum) => {
			return homeComponents[component] ? (
				<Fragment key={component}>{homeComponents[component]}</Fragment>
			) : null
		},
		[langId, currencyId]
	)

	return (
		<>
			<Header>
				<Header.AppDownLoad
					isAppDownloadHintActive={showAppDownload}
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
				className={classNames({ active: showAppDownload })}
			>
				{bannerBlockOrders.map(component => renderComponent(component))}

				<Menu />

				{contentOrders.map(component => renderComponent(component))}
			</main>
		</>
	)
}

export default Home
