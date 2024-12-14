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
			{!isGetBannerV3Fetching && bannerList.length > 0 && (
				<div className='banner-container'>
					<div className='content-container'>
						<CarouselBanner
							bannerList={bannerList}
							navigation={false}
							pagination={false}
						/>
					</div>
				</div>
			)}

			{!isGetBannerV3Fetching && bannerList.length === 0 && (
				<LobbyPageBanner
					alt='Slot'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/slot-banner.webp`}
				/>
			)}

			< div className='content-container'>
				<div className='filter-form'>
					<SearchBox />
					<VendorFilter />
				</div>
				<CategoryFilter />
				<GameList />
			</div>
		</LobbyGamePage >
	)
}

export default Slots
