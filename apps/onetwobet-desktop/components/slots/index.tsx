import { useSlots } from '@nx-next-app/operations'
import { Loading } from '../common'
import CarouselBanner from '../common/carouselBanner'
import CategoryFilter from './CategoryFilter'
import GameList from './GameList'
import SearchBox from './SearchBox'
import VendorFilter from './vendorFilter'

const Slots = () => {
	const { bannerList, isGetBannerV3Fetching } = useSlots()
	if (isGetBannerV3Fetching) return <Loading />
	return (
		<main className='lobby'>
			{!isGetBannerV3Fetching && (
				<div className='lobby-banner'>
					<CarouselBanner
						bannerList={bannerList}
						navigation={false}
						pagination={false}
					/>
				</div>
			)}
			<div className='lobby-content slots'>
				<div className='top'>
					<SearchBox />
					<VendorFilter />
				</div>
				<CategoryFilter />
				<GameList />
			</div>
		</main>
	)
}

export default Slots
