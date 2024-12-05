import { paths } from "@nx-next-app/constants";
import GameList from "@nx-next-app/features/F0001/h5/home/GameList";
import GroupTitle from "@nx-next-app/features/F0001/h5/home/GroupTitle";
import { GameGroup } from "@nx-next-app/features/F0001/h5/home/styles";
import { useHome } from "@nx-next-app/features/F0001/providers";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";

export const DynamicSwiper = dynamic(() => import('react-id-swiper'), {
	ssr: false,
})

const NewReleaseGames = () => {
	const { newGameData } = useHome()
	const { t } = useTranslation()

	if (newGameData === null || newGameData === undefined || newGameData?.length === 0) {
		return <div />
	}

	return (
		<GameGroup>
			<GroupTitle title={t('Label_New_Release')} href={paths.sports.root} />
			<GameList gameData={newGameData} isControlButton />
		</GameGroup>
	)
}

export default NewReleaseGames
