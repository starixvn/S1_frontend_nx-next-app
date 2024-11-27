import { paths } from '@nx-next-app/constants'
import GameList from '@nx-next-app/features/F0001/desktop/home/GameList'
import GroupTitle from '@nx-next-app/features/F0001/desktop/home/GroupTitle'
import HotEvents from '@nx-next-app/features/F0001/desktop/home/hotMatch'
import { SportContainer } from '@nx-next-app/features/F0001/desktop/home/sportGames/styles'
import { GameGroup } from '@nx-next-app/features/F0001/desktop/home/styles'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { TpCategory } from '@nx-next-app/service'

const SportGames = () => {
	const { hotGameData, slotGameData } = useHome()
	const { jackpot = [] } = slotGameData ?? {}

	const sportGames = hotGameData.filter(element => {
		return element.tpCategory === TpCategory.Sports
	})

	if (sportGames?.length === 0 && jackpot?.length === 0) return null

	return (
		<SportContainer>
			<GameGroup className='content-container others'>
				<GroupTitle title='Sports' href={paths.sports.root} />
				<GameList gameData={sportGames} isControlButton parentId='SportGames' />
				<HotEvents />
			</GameGroup>
		</SportContainer>
	)
}

export default SportGames
