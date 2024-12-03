import { paths } from "@nx-next-app/constants";
import GameList from "@nx-next-app/features/F0001/desktop/home/GameList";
import GroupTitle from "@nx-next-app/features/F0001/desktop/home/GroupTitle";
import { LiveCasinoContainer } from "@nx-next-app/features/F0001/desktop/home/liveCasinoGames/styles";
import { GameGroup } from "@nx-next-app/features/F0001/desktop/home/styles";
import { useHome } from "@nx-next-app/features/F0001/providers";
import { TpCategory } from "@nx-next-app/service";
import { useTranslation } from "next-i18next";

const LiveCasinoGames = () => {
	const { t } = useTranslation()
	const { hotGameData, slotGameData } = useHome()
	const { jackpot = [] } = slotGameData ?? {}

	const liveCasinoGames = hotGameData.filter(element => {
		return element.tpCategory === TpCategory.LiveCasino
	})

	if (liveCasinoGames?.length === 0 && jackpot?.length === 0) return null

	if (liveCasinoGames.length === 0) {
		return <div />
	}

	return (
		<LiveCasinoContainer>
			<GameGroup className='content-container others'>
				<GroupTitle
					title={t('Label_General_CasinoWithLive')}
					href={paths.liveCasino.root}
				/>
				<GameList
					gameData={liveCasinoGames}
					isControlButton
					extraClassName='two-rows'
				/>
			</GameGroup>
		</LiveCasinoContainer>
	)
}

export default LiveCasinoGames
