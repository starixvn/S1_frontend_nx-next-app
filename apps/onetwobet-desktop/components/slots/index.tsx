import { useSlots } from '@nx-next-app/operations'
import { Loading } from '../common'
import Banner from './Banner'
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
				<Banner bannerList={bannerList} navigation={false} pagination={false} />
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
