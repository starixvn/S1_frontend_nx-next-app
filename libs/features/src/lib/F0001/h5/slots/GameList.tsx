import { NoData } from "@nx-next-app/features/F0001/h5/common/NoData";
import { GameListContainer } from "@nx-next-app/features/F0001/h5/lobby-game/styles";
import SlotGameIcon from "@nx-next-app/features/F0001/h5/slots/GameSlotIcon";
import { useSlots } from "@nx-next-app/features/F0001/providers";
import { Suspense } from "react";

const GameList = () => {
	const { slotsGameList, gameListRef } = useSlots()

	return slotsGameList && slotsGameList.length > 0 ? (
		<Suspense>
			<GameListContainer>
				{slotsGameList.map(game => {
					const { tpId, gameId } = game
					return (
						<SlotGameIcon key={`slots-game-${tpId}-${gameId}`} game={game} />
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
