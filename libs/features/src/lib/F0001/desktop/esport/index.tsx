import ESportBanner from "@nx-next-app/features/F0001/desktop/esport/ESportBanner";
import { LobbyGamePage } from "@nx-next-app/features/F0001/desktop/lobby-game/styles";

import ESportList from "./ESportList";

const ESport = () => {
	return (
		<LobbyGamePage className='main-content sports'>
			<ESportBanner />
			<ESportList />
		</LobbyGamePage>
	)
}

export default ESport
