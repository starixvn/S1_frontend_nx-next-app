import LobbyPageBanner from "@nx-next-app/features/F0001/desktop/lobby-game/LobbyPageBanner";
import { LobbyGamePage } from "@nx-next-app/features/F0001/desktop/lobby-game/styles";
import CategoryFilter from "@nx-next-app/features/F0001/desktop/slots/CategoryFilter";
import GameList from "@nx-next-app/features/F0001/desktop/slots/GameList";
import SearchBox from "@nx-next-app/features/F0001/desktop/slots/SearchBox";
import VendorFilter from "@nx-next-app/features/F0001/desktop/slots/vendorFilter";
import { CarouselBanner } from '@nx-next-app/features/F0001/desktop/common'
import { useSlots } from '@nx-next-app/features/F0001/providers'
import { Loading } from '@nx-next-app/components/D0001'

const Slots = () => {
	const { bannerList, isGetBannerV3Fetching } = useSlots()

	if (isGetBannerV3Fetching) return <Loading />

	return (
		<LobbyGamePage className='main-content '>
			{!isGetBannerV3Fetching && (
				<div className='lobby-banner'>
					<CarouselBanner
						bannerList={bannerList}
						navigation={false}
						pagination={false}
					/>
				</div>
			)}

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
