import { NoData } from "@nx-next-app/features/F0001/h5/common/NoData";
import GameLobbyIcon from "@nx-next-app/features/F0001/h5/lobby-game/GameLobbyIcon";
import { GameListContainer } from "@nx-next-app/features/F0001/h5/lobby-game/styles";
import { useLobby } from "@nx-next-app/features/F0001/providers";
import { Suspense } from "react";

const GameList = () => {
	const { lobbyGameList, gameListRef } = useLobby()

	return lobbyGameList && lobbyGameList.length > 0 ? (
		<Suspense>
			<GameListContainer>
				{lobbyGameList.map(game => {
					const { tpId, gameId } = game
					return (
						<GameLobbyIcon key={`casino-game-${tpId}-${gameId}`} game={game} />
					)
				})}

				<span ref={gameListRef} />
			</GameListContainer>
		</Suspense>
	) : (
		<NoData customClass='no-border' />
	)
}

export default GameList
