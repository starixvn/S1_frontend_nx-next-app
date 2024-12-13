import { NoData } from "@nx-next-app/features/F0001/desktop/common/NoData";
import GameLobbyIcon from "@nx-next-app/features/F0001/desktop/lobby-game/GameLobbyIcon";
import { GameListContainer } from "@nx-next-app/features/F0001/desktop/lobby-game/styles";
import { useLobby } from "@nx-next-app/features/F0001/providers";
import { Suspense } from "react";

const GameList = () => {
	const { lobbyGameList, gameListRef } = useLobby()

	return lobbyGameList && lobbyGameList.length > 0 ? (
		<Suspense>
			<GameListContainer>
				{lobbyGameList.map(game => {
					return <GameLobbyIcon game={game} />
				})}

				<span ref={gameListRef} />
			</GameListContainer>
		</Suspense>
	) : (
		<NoData customClass='no-border' />
	)
}

export default GameList
