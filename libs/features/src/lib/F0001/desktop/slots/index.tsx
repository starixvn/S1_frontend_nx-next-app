import LobbyPageBanner from "@nx-next-app/features/F0001/desktop/lobby-game/LobbyPageBanner";
import { LobbyGamePage } from "@nx-next-app/features/F0001/desktop/lobby-game/styles";
import CategoryFilter from "@nx-next-app/features/F0001/desktop/slots/CategoryFilter";
import GameList from "@nx-next-app/features/F0001/desktop/slots/GameList";
import SearchBox from "@nx-next-app/features/F0001/desktop/slots/SearchBox";
import VendorFilter from "@nx-next-app/features/F0001/desktop/slots/vendorFilter";

const Slots = () => {
	return (
		<LobbyGamePage className='main-content '>
			<LobbyPageBanner
				alt='Slot'
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/slot-banner.webp`}
			/>

			<div className='content-container'>
				<div className='filter-form'>
					<SearchBox />
					<VendorFilter />
				</div>
				<CategoryFilter />
				<GameList />
			</div>
		</LobbyGamePage>
	)
}

export default Slots
