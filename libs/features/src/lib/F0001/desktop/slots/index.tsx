import VendorFilter from '@nx-next-app/features/F0001/desktop/slots/vendorFilter'
import CategoryFilter from '@nx-next-app/features/F0001/desktop/slots/CategoryFilter'
import SearchBox from '@nx-next-app/features/F0001/desktop/slots/SearchBox'
import GameList from '@nx-next-app/features/F0001/desktop/slots/GameList'
import { CarouselBanner } from '@nx-next-app/features/F0001/desktop/common'
import { useSlots } from '@nx-next-app/features/F0001/providers'
import { Loading } from '@nx-next-app/components/D0001'

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
