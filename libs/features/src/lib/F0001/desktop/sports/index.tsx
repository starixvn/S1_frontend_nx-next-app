import SportBanner from '@nx-next-app/features/F0001/desktop/sports/SportBanner'
import { LobbyGamePage } from '@nx-next-app/features/F0001/desktop/lobby-game/styles'
import SportList from './SportList'

const Sports = () => {
	return (
		<LobbyGamePage className='main-content '>
        <SportBanner />
        <SportList />
		</LobbyGamePage>
	)
}

export default Sports
