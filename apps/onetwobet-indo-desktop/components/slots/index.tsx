import { useSlots } from '@nx-next-app/operations'
import { Loading } from '../common'
import Banner from './Banner'
import CategoryFilter from './CategoryFilter'
import GameList from './GameList'
import SearchBox from './SearchBox'
import VendorFilter from './vendorFilter'

const Slots = () => {
	const { isGetBannerV3Fetching } = useSlots()
	if (isGetBannerV3Fetching) return <Loading />
	return (
		<main className='lobby'>
			<Banner />
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
