import { paths } from "@nx-next-app/constants";
import GameList from "@nx-next-app/features/F0001/desktop/home/GameList";
import GroupTitle from "@nx-next-app/features/F0001/desktop/home/GroupTitle";
import { GameGroup } from "@nx-next-app/features/F0001/desktop/home/styles";
import { useHome } from "@nx-next-app/features/F0001/providers";
import { TpCategory } from "@nx-next-app/service";
import { useTranslation } from "next-i18next";

const TableGames = () => {
	const { t } = useTranslation()
	const { hotGameData, slotGameData } = useHome()
	const { jackpot = [] } = slotGameData ?? {}

	const tableGames = hotGameData?.filter(element => {
		return element.tpCategory === TpCategory.Games
	})

	if (tableGames?.length === 0 && jackpot?.length === 0) return null

	if (tableGames?.length === 0) {
		return <div />
	}

	return (
		<GameGroup className='content-container others'>
			<GroupTitle
				title={t('Label_General_Table_Games')}
				href={paths.game.root}
			/>
			<GameList gameData={tableGames} isControlButton />
		</GameGroup>
	)
}

export default TableGames
