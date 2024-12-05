import { paths } from "@nx-next-app/constants";
import GameList from "@nx-next-app/features/F0001/h5/home/GameList";
import GroupTitle from "@nx-next-app/features/F0001/h5/home/GroupTitle";
import { GameGroup } from "@nx-next-app/features/F0001/h5/home/styles";
import { useHome } from "@nx-next-app/features/F0001/providers";
import { TpCategory } from "@nx-next-app/service";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";

export const DynamicSwiper = dynamic(() => import('react-id-swiper'), {
	ssr: false,
})

const TableGames = () => {
	const { hotGameData } = useHome()
	const { t } = useTranslation()

	const hotGameCasino = hotGameData?.filter(element => {
		return element.tpCategory === TpCategory.Games
	})

	if (hotGameCasino === null || hotGameCasino === undefined || hotGameCasino?.length === 0) {
		return <div />
	}

	return (
		<GameGroup>
			<GroupTitle
				title={t('Label_General_Table_Games')}
				href={paths.game.root}
			/>
			<GameList gameData={hotGameCasino} isControlButton />
		</GameGroup>
	)
}

export default TableGames
