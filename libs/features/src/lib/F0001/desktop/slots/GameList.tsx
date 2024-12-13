import { NoData } from "@nx-next-app/features/F0001/desktop/common/NoData";
import { GameListContainer } from "@nx-next-app/features/F0001/desktop/lobby-game/styles";
import SlotGameIcon from "@nx-next-app/features/F0001/desktop/slots/GameSlotIcon";
import { useSlots } from "@nx-next-app/features/F0001/providers";
import { Suspense } from "react";

const GameList = () => {
	const { slotsGameList, gameListRef } = useSlots()

	return slotsGameList && slotsGameList.length > 0 ? (
		<Suspense>
			<GameListContainer>
				{slotsGameList.map(game => {
					return <SlotGameIcon game={game} />
				})}
				<span ref={gameListRef} />
			</GameListContainer>
		</Suspense>
	) : (
		<NoData customClass='no-border' />
	)
}

export default GameList
