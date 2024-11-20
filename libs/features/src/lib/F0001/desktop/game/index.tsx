import VendorFilter from '@nx-next-app/features/F0001/desktop/lobby-game/vendorFilter'
import SearchBox from '@nx-next-app/features/F0001/desktop/lobby-game/SearchBox'
import GameList from '@nx-next-app/features/F0001/desktop/lobby-game/GameList'
import CategoryFilter from '@nx-next-app/features/F0001/desktop/lobby-game/CategoryFilter'
import { CarouselBanner } from '@nx-next-app/features/F0001/desktop/common'
import { useLobby } from '@nx-next-app/features/F0001/providers'
import { Loading } from '@nx-next-app/components/D0001'

const Game = () => {
	// const { bannerList, isGetBannerV3Fetching } = useLobby()

	// if (isGetBannerV3Fetching) return <Loading />

	return (
		<main className='lobby'>
			{/* {!isGetBannerV3Fetching && (
				<div className='lobby-banner'>
					<CarouselBanner
						bannerList={bannerList}
						navigation={false}
						pagination={false}
					/>
				</div>
			)} */}
			<div className='lobby-content slots'>
				<div className='top'>
					<SearchBox />
					<VendorFilter />
				</div>
        <CategoryFilter/>
				<GameList />
			</div>
		</main>
	)
}

export default Game

