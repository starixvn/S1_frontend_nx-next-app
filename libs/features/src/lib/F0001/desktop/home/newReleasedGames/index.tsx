import { paths } from '@nx-next-app/constants'
import GameList from '@nx-next-app/features/F0001/desktop/home/GameList'
import GroupTitle from '@nx-next-app/features/F0001/desktop/home/GroupTitle'
import { GameGroup } from '@nx-next-app/features/F0001/desktop/home/styles'
import { useHome } from '@nx-next-app/features/F0001/providers'

const NewReleasedGames = () => {
	const { newGameData } = useHome()

	if (newGameData.length === 0) {
		return <div />
	}

	return (
		<GameGroup className='content-container others'>
			<GroupTitle title='New Release' href={paths.sports.root} />
			<GameList gameData={newGameData} isControlButton parentId='NewReleased' />
		</GameGroup>
	)
}

export default NewReleasedGames
