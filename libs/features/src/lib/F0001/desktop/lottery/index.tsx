import {
	LoadingIcon,
	NoGameIcon,
} from '@nx-next-app/features/F0001/desktop/home/gameIcon/icons'
import CategoryFilter from '@nx-next-app/features/F0001/desktop/lobby-game/CategoryFilter'
import GameList from '@nx-next-app/features/F0001/desktop/lobby-game/GameList'
import SearchBox from '@nx-next-app/features/F0001/desktop/lobby-game/SearchBox'
import { LobbyGamePage } from '@nx-next-app/features/F0001/desktop/lobby-game/styles'
import VendorFilter from '@nx-next-app/features/F0001/desktop/lobby-game/vendorFilter'
import { Img } from 'react-image'

const Lottery = () => {
	return (
		<LobbyGamePage className='main-content '>
			<div className='banner-container'>
				<div className='content-container'>
					<Img
						className='img-banner'
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/lottery-banner.webp`}
						loader={<LoadingIcon />}
						unloader={<NoGameIcon />}
						alt='Live Casino'
					/>
				</div>
			</div>

			<div className='content-container'>
				<div className='filter-form'>
					<SearchBox />
					<VendorFilter pathRoot=''/>
				</div>
				<CategoryFilter />
				<GameList />
			</div>
		</LobbyGamePage>
	)
}

export default Lottery
