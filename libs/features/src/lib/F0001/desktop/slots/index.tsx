import {
	LoadingIcon,
	NoGameIcon,
} from '@nx-next-app/features/F0001/desktop/home/gameIcon/icons'
import { LobbyGamePage } from '@nx-next-app/features/F0001/desktop/lobby-game/styles'
import CategoryFilter from '@nx-next-app/features/F0001/desktop/slots/CategoryFilter'
import GameList from '@nx-next-app/features/F0001/desktop/slots/GameList'
import SearchBox from '@nx-next-app/features/F0001/desktop/slots/SearchBox'
import VendorFilter from '@nx-next-app/features/F0001/desktop/slots/vendorFilter'
import { Img } from 'react-image'

const Slots = () => {
	return (
		<LobbyGamePage className='main-content '>
			<div className='banner-container'>
				<div className='content-container'>
					<Img
						className='img-banner'
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/slot-banner.webp`}
						loader={<LoadingIcon />}
						unloader={<NoGameIcon />}
						alt='Live Casino'
					/>
				</div>
			</div>
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
