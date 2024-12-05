import CategoryFilter from "@nx-next-app/features/F0001/desktop/lobby-game/CategoryFilter";
import GameList from "@nx-next-app/features/F0001/desktop/lobby-game/GameList";
import LobbyPageBanner from "@nx-next-app/features/F0001/desktop/lobby-game/LobbyPageBanner";
import SearchBox from "@nx-next-app/features/F0001/desktop/lobby-game/SearchBox";
import { LobbyGamePage } from "@nx-next-app/features/F0001/desktop/lobby-game/styles";
import VendorFilter from "@nx-next-app/features/F0001/desktop/lobby-game/vendorFilter";

const Lottery = () => {
	return (
		<LobbyGamePage className='main-content '>
			<LobbyPageBanner
				alt='Lottery'
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/lottery-banner.webp`}
			/>

			<div className='content-container'>
				<div className='filter-form'>
					<SearchBox />
					<VendorFilter pathRoot='' />
				</div>
				<CategoryFilter />
				<GameList />
			</div>
		</LobbyGamePage>
	)
}

export default Lottery
