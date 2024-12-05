import { Header } from "@nx-next-app/components/H0001";
import { paths } from "@nx-next-app/constants";
import { LoadingIcon, NoGameIcon } from "@nx-next-app/features/F0001/h5/home/gameIcon/icons";
import CategoryFilter from "@nx-next-app/features/F0001/h5/lobby-game/CategoryFilter";
import GameList from "@nx-next-app/features/F0001/h5/lobby-game/GameList";
import { LobbyGamePage } from "@nx-next-app/features/F0001/h5/lobby-game/styles";
import VendorFilter from "@nx-next-app/features/F0001/h5/lobby-game/vendorFilter";
import { useLobby } from "@nx-next-app/features/F0001/providers";
import { MenuKeyEnum } from "@nx-next-app/types";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import { Img } from "react-image";

const LiveCasino = () => {
	const {
		searchCategoryText,
		navRef,
		isShowSearchInput,
		isNavInView,
		setIsShowSearchInput,
		onSearchCategoryTextChange,
		onInputClose,
	} = useLobby()
	const { t } = useTranslation()
	return (
		<LobbyGamePage>
			<Header>
				<Header.Tag
					title={t('Label_General_CasinoWithLive') as string}
					back={`${paths.home.root}/?prevPageRecord=${MenuKeyEnum.Casino}`}
					onSearchBarChange={onSearchCategoryTextChange}
					searchText={searchCategoryText}
					isShowSearchInput={isShowSearchInput}
					setIsShowSearchInput={() => setIsShowSearchInput(true)}
					onInputClose={onInputClose}
				/>
			</Header>
			<div className='banner-container'>
				<Img
					className='img-banner'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/new-ui/live-casino-banner.webp`}
					loader={<LoadingIcon />}
					unloader={<NoGameIcon />}
					alt='Live Casino'
				/>
			</div>
			<div className={classNames('functionList', { active: !isNavInView })}>
				<VendorFilter />
				<CategoryFilter />
			</div>
			<div ref={navRef} />
			<GameList />
		</LobbyGamePage>
	)
}

export default LiveCasino
