import LobbyPageBanner from "@nx-next-app/features/F0001/desktop/lobby-game/LobbyPageBanner";
import { LobbyGamePage } from "@nx-next-app/features/F0001/desktop/lobby-game/styles";
import SportGame from "@nx-next-app/features/F0001/desktop/sport-game";
import { useRouter } from "next/router";

import SportList from "./SportList";

const Sports = () => {
	const {
		query: { provider: queryProvider },
	} = useRouter()
	return queryProvider ? (
		<SportGame />
	) : (
		<LobbyGamePage className='main-content sports'>
			<LobbyPageBanner
				alt='Sports'
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/sport-banner.webp`}
			/>
			<SportList />
		</LobbyGamePage>
	)
}

export default Sports
