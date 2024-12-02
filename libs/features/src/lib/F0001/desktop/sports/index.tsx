import { LobbyGamePage } from "@nx-next-app/features/F0001/desktop/lobby-game/styles";
import SportGame from "@nx-next-app/features/F0001/desktop/sport-game";
import SportBanner from "@nx-next-app/features/F0001/desktop/sports/SportBanner";
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
			<SportBanner />
			<SportList />
		</LobbyGamePage>
	)
}

export default Sports
