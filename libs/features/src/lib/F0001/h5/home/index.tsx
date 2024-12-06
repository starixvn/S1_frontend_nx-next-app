import { Header } from '@nx-next-app/components/H0001'
import { useAuth } from '@nx-next-app/data-access'
import { HomPageContainer } from '@nx-next-app/features/F0001/h5/home/styles'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { MobileHomeComponentsEnum } from '@nx-next-app/features/F0001/types'
import { useTpWalletBalanceListFetcher } from '@nx-next-app/hooks'
import { useSetHideBalanceMutation } from '@nx-next-app/service'
import { multiEqual } from '@nx-next-app/utils'
import { includes } from 'lodash-es'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Fragment, useCallback } from 'react'

import Menu from './menu'

const CarouselBanner = dynamic(() => import('../common/carouselBanner'), {
	ssr: false,
})

const Announcement = dynamic(() => import('./Announcement'))

const PromotionSwiper = dynamic(() => import('./PromotionSwiper'))

const LiveCasinoGames = dynamic(() => import('./LiveCasinoGames'))

const SlotGames = dynamic(() => import('./SlotGames'))

const TableGames = dynamic(() => import('./TableGames'))

const SportGames = dynamic(() => import('./sportsGames'))

const NewReleaseGames = dynamic(() => import('./NewReleaseGames'))

const ProvidersList = dynamic(() => import('./providers'), {
	ssr: false,
})

const SimpleFooter = dynamic(() => import('./SimpleFooter'))

const FooterBlock = dynamic(() => import('./footerBlock'))

const Home = () => {
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

	const homeComponents = {
		[MobileHomeComponentsEnum.CarouselBanner]: (
			<div className='home-mainbanner'>
				<CarouselBanner bannerList={bannerData} navigation={false} />
			</div>
		),
		[MobileHomeComponentsEnum.Announcement]: <Announcement />,
		[MobileHomeComponentsEnum.LiveCasino]: <LiveCasinoGames />,
		[MobileHomeComponentsEnum.TableGames]: <TableGames />,
		[MobileHomeComponentsEnum.SlotGames]: <SlotGames />,

		[MobileHomeComponentsEnum.HotGameSport]: <SportGames />,
		[MobileHomeComponentsEnum.NewRelease]: <NewReleaseGames />,
		[MobileHomeComponentsEnum.ProviderList]: <ProvidersList />,
		[MobileHomeComponentsEnum.PromotionSwiper]: <PromotionSwiper />,
		// [MobileHomeComponentsEnum.HotEventSwiper]: includes(
		// 	ALLOWED_CURRENCIES.SPORTS_SABA_CLUB,
		// 	currencyId
		// ) ? (
		// 	<HotEventSwiper />
		// ) : null,
		// [MobileHomeComponentsEnum.HotGameSwiper]: <HotGameSwiper />,

		// [MobileHomeComponentsEnum.RecentlyViewGames]: <RecentlyViewGames />,
		// [MobileHomeComponentsEnum.FriendReferral]: <FriendReferral />,
		// [MobileHomeComponentsEnum.Jackpot]: includes(
		// 	ALLOWED_CURRENCIES.JACKPOT,
		// 	currencyId
		// ) ? (
		// 	<JackPot onClick={() => push(paths.slots.root)} isRoot />
		// ) : null,
		// [MobileHomeComponentsEnum.EuropeCupEntry]: includes(
		// 	ALLOWED_CURRENCIES.Euro_Cup,
		// 	currencyId
		// ) ? (
		// 	<EuroCupEntry />
		// ) : null,
		// [MobileHomeComponentsEnum.LuckyWheel]: <LuckyWheel />,
		// [MobileHomeComponentsEnum.Retention]: <Retention />,

		// [MobileHomeComponentsEnum.LiveStreamingLink]: <LiveStreamingLink />,

		[MobileHomeComponentsEnum.FooterBlock]: <FooterBlock />,
		[MobileHomeComponentsEnum.SimpleFooter]: <SimpleFooter />,
		// TODO: Hide in phase 1
		// [MobileHomeComponentsEnum.JackPotSwiper]: <JackPotSwiper />,
		// [MobileHomeComponentsEnum.JackPotSwiper]: <div />,

		// [MobileHomeComponentsEnum.OlympicEntry]: includes(
		// 	ALLOWED_CURRENCIES.OLYMPIC,
		// 	currencyId
		// ) ? (
		// 	<OlympicEntry />
		// ) : null,
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
		<HomPageContainer>
			<Header>
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
				<Menu />
			</Header>

			<div className='main-content-mobile'>
				{bannerBlockOrders.map(component => renderComponent(component))}

				{contentOrders.map(component => renderComponent(component))}
			</div>
		</HomPageContainer>
	)
}

export default Home
