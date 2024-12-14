import { Header } from "@nx-next-app/components/H0001";
import { paths } from "@nx-next-app/constants";
import { useAuth } from "@nx-next-app/data-access";
import CarouselBanner from "@nx-next-app/features/F0001/h5/common/carouselBanner";
import { LoadingIcon } from "@nx-next-app/features/F0001/h5/home/gameIcon/icons";
import LobbyPageBanner from "@nx-next-app/features/F0001/h5/lobby-game/LobbyPageBanner";
import { LobbyGamePage } from "@nx-next-app/features/F0001/h5/lobby-game/styles";
import CategoryFilter from "@nx-next-app/features/F0001/h5/slots/CategoryFilter";
import GameInfo from "@nx-next-app/features/F0001/h5/slots/GameInfo";
import GameList from "@nx-next-app/features/F0001/h5/slots/GameList";
import VendorFilter from "@nx-next-app/features/F0001/h5/slots/vendorFilter";
import { useSlots } from "@nx-next-app/features/F0001/providers";
import { MenuKeyEnum } from "@nx-next-app/types";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

const Slots = () => {
	const {
		searchCategoryText,
		activeGame,
		isShowSearchInput,
		isNavInView,
		setIsShowSearchInput,
		onSearchCategoryTextChange,
		onInputClose,
		bannerList,
		isGetBannerV3Fetching,
	} = useSlots()
	const { t } = useTranslation()
	const { auth } = useAuth()

	if (isGetBannerV3Fetching) return <LoadingIcon />

	return (
		<LobbyGamePage $isLogin={auth.isLogin}>
			<Header>
				<Header.Tag
					title={t('Label_General_Slots') as string}
					back={`${paths.home.root}/?prevPageRecord=${MenuKeyEnum.Slot}`}
					onSearchBarChange={onSearchCategoryTextChange}
					searchText={searchCategoryText}
					isShowSearchInput={isShowSearchInput}
					setIsShowSearchInput={() => setIsShowSearchInput(true)}
					onInputClose={onInputClose}
				/>
			</Header>
			{!isGetBannerV3Fetching && (
				bannerList.length > 0 ? (
					<div className='banner-container'>
						<CarouselBanner
							bannerList={bannerList}
							navigation={false}
							pagination={false}
						/>
					</div>
				) : (
					<LobbyPageBanner
						alt='Slots'
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/new-ui/slot-banner.webp`}
					/>
				)
			)}
			<div className={classNames('functionList', { active: !isNavInView })}>
				<VendorFilter />
				<CategoryFilter />
			</div>
			<GameList />
			{activeGame && <GameInfo />}
		</LobbyGamePage>
	)
}

export default Slots
