import { useGlobalModal } from "@nx-next-app/components/config-provider";
import { paths } from "@nx-next-app/constants";
import EmblaCarousel from "@nx-next-app/features/F0001/desktop/common/emblaCarousel";
import GameIcon from "@nx-next-app/features/F0001/desktop/home/gameIcon";
import GroupTitle from "@nx-next-app/features/F0001/desktop/home/GroupTitle";
import { GameContainer } from "@nx-next-app/features/F0001/desktop/home/slotGames/styles";
import { GameGroup } from "@nx-next-app/features/F0001/desktop/home/styles";
import { useHome } from "@nx-next-app/features/F0001/providers";
import { TpCategory } from "@nx-next-app/service";
import { EmblaOptionsType } from "embla-carousel";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { getIsTpMaintain } from '@nx-next-app/utils'
import { useGlobalData } from '@nx-next-app/data-access'

const LoginModal = dynamic(() => import('../../modal/LoginModal'), {
	ssr: false,
})

const UnderMaintenanceModal = dynamic(
	() => import('../../modal/UnderMaintainModal'),
	{
		ssr: false,
	}
)

const HotGameSlot = () => {
	const { t } = useTranslation()
	const { hotGameData, slotGameData, handleHotGameClick } = useHome()
	const { jackpot = [] } = slotGameData ?? {}
	const { tpMaintainList } = useGlobalData()

	const { modal } = useGlobalModal()

	const slotGames = hotGameData?.filter(element => {
		return element.tpCategory === TpCategory.Casino
	})

	if (slotGames?.length === 0 && jackpot?.length === 0) return null

	const gameTypeEmblaOptions: EmblaOptionsType = { slidesToScroll: 'auto' }
	let largeGame: any
	let largeGameItem: any

	if (slotGames?.length > 0) {
		largeGame = slotGames.shift()
		largeGameItem = {
			gameId: largeGame.gameId,
			imageUrl: largeGame.gameLogo,
			isMaintain: getIsTpMaintain({
        tpMaintainList,
        tpId: largeGame.tpId,
        tpGameType: largeGame.tpGameType,
      }),
			tpName: largeGame.tpName,
			gameName: largeGame.gameName,
		}
	}

	if (slotGames === null || slotGames === undefined || slotGames?.length === 0) {
		return <div />
	}

	return (
		<GameGroup className='content-container slot'>
			<GroupTitle title={t('Label_General_Slots')} href={paths.slots.root} />
			<GameContainer>
				<div className='game-large'>
					<GameIcon
						key={1}
						gameItem={largeGameItem}
						isLarge
						onClick={() =>
							handleHotGameClick(
								{
									game: largeGame,
								},
								{
									underMaintenanceCallback: () =>
										modal.open(<UnderMaintenanceModal />),
									loginCallback: () => modal.open(<LoginModal />),
								}
							)
						}
					/>
				</div>
				<EmblaCarousel
					options={gameTypeEmblaOptions}
					isControlButton
					extraClassName='two-rows'
				>
					{slotGames?.map(game => {
						const { gameLogo, gameName, gameId, tpName, tpId, tpGameType } = game
						const gameItem = {
							gameId,
							imageUrl: gameLogo,
							isMaintain: getIsTpMaintain({
                tpMaintainList,
                tpId,
                tpGameType,
              }),
							tpName,
							gameName,
						}

						return (
							<GameIcon
								key={gameId}
								gameItem={gameItem}
								onClick={() =>
									handleHotGameClick(
										{
											game,
										},
										{
											underMaintenanceCallback: () =>
												modal.open(<UnderMaintenanceModal />),
											loginCallback: () => modal.open(<LoginModal />),
										}
									)
								}
							/>
						)
					})}
				</EmblaCarousel>
			</GameContainer>
		</GameGroup>
	)
}

export default HotGameSlot
