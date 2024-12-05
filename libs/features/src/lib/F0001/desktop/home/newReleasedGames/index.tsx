import GameList from "@nx-next-app/features/F0001/desktop/home/GameList";
import GroupTitle from "@nx-next-app/features/F0001/desktop/home/GroupTitle";
import { GameGroup } from "@nx-next-app/features/F0001/desktop/home/styles";
import { useHome } from "@nx-next-app/features/F0001/providers";
import { useTranslation } from "next-i18next";

const NewReleasedGames = () => {
	const { t } = useTranslation()
	const { newGameData } = useHome()

	if (newGameData?.length === 0) {
		return <div />
	}

	return (
		<GameGroup className='content-container others'>
			<GroupTitle title={t('Label_New_Release')} />
			<GameList gameData={newGameData} isControlButton />
		</GameGroup>
	)
}

export default NewReleasedGames
