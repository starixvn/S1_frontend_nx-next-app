import Jackpot from '@nx-next-app/components/D0001/jackpot'
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
		<main>
			{!isGetBannerV3Fetching && (
				<CarouselBanner
					bannerList={bannerList}
					navigation={false}
					pagination={false}
				/>
			)}
			<section className='inside'>
				<div className='rightModule'>
					<div className='slotJpot'>
						<Jackpot onClick={() => null} />
					</div>
					<div className='infoModule'>
						<VendorFilter />
						<div className='casinoSelect'>
							<CategoryFilter />
							<SearchBox />
						</div>
						<GameList />
					</div>
				</div>
			</section>
		</main>
	)
}

export default Slots
