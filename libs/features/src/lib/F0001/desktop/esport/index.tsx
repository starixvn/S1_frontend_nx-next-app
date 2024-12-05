import LobbyPageBanner from "@nx-next-app/features/F0001/desktop/lobby-game/LobbyPageBanner";
import { LobbyGamePage } from "@nx-next-app/features/F0001/desktop/lobby-game/styles";

import ESportList from "./ESportList";

const ESport = () => {
	return (
		<LobbyGamePage className='main-content sports'>
			<LobbyPageBanner
				alt='E-Sport'
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/e-sport-banner.webp`}
			/>
			<ESportList />
		</LobbyGamePage>
	)
}

export default ESport
