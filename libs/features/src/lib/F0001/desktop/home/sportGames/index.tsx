import { paths } from '@nx-next-app/constants'
import GameList from '@nx-next-app/features/F0001/desktop/home/GameList'
import GroupTitle from '@nx-next-app/features/F0001/desktop/home/GroupTitle'
import HotEvents from '@nx-next-app/features/F0001/desktop/home/hotMatch'
import { SportContainer } from '@nx-next-app/features/F0001/desktop/home/sportGames/styles'
import { GameGroup } from '@nx-next-app/features/F0001/desktop/home/styles'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { TpCategory } from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'

const SportGames = () => {
	const { t } = useTranslation()
	const { hotGameData, slotGameData } = useHome()
	const { jackpot = [] } = slotGameData ?? {}

	const sportGames = hotGameData?.filter(element => {
		return element.tpCategory === TpCategory.Sports
	})

	if (sportGames?.length === 0 && jackpot?.length === 0) return null

	return (
		<SportContainer>
			<GameGroup className='content-container others'>
				<GroupTitle
					title={t('Label_General_Sports')}
					href={paths.sports.root}
				/>
				<GameList gameData={sportGames} isControlButton />
				<HotEvents gameData={sportGames} />
			</GameGroup>
		</SportContainer>
	)
}

export default SportGames
