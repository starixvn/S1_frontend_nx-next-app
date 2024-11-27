import { useGlobalModal } from '@nx-next-app/components/config-provider'
import EmblaCarousel from '@nx-next-app/features/F0001/desktop/common/emblaCarousel'
import GameIcon from '@nx-next-app/features/F0001/desktop/home/gameIcon'
import { GameContainer } from '@nx-next-app/features/F0001/desktop/home/styles'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { IHotGame } from '@nx-next-app/service'
import { EmblaOptionsType } from 'embla-carousel'
import dynamic from 'next/dynamic'
import React from 'react'

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

const UnderMaintenanceModal = dynamic(
	() => import('../modal/UnderMaintainModal'),
	{
		ssr: false,
	}
)

type IGameList = {
	gameData: IHotGame[]
	isControlButton: boolean
	children?: React.ReactNode
	extraClassName?: string
	parentId?: string
}

const GameList: React.FC<IGameList> = (props: IGameList) => {
	const { gameData, isControlButton, children, extraClassName, parentId } =
		props

	const { handleHotGameClick } = useHome()
	const gameTypeEmblaOptions: EmblaOptionsType = { slidesToScroll: 'auto' }
	const { modal } = useGlobalModal()

	return (
		<GameContainer>
			{children}
			<EmblaCarousel
				options={gameTypeEmblaOptions}
				isControlButton={isControlButton}
				extraClassName={extraClassName}
			>
				{gameData.map((game, index) => {
					const { gameLogo, gameName, gameId, tpName } = game
					const gameItem = {
						gameId,
						imageUrl: gameLogo,
						isMaintain: false,
						tpName,
						gameName,
					}

					return (
						<GameIcon
							key={`${gameId}_${parentId}`}
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
	)
}

export default GameList
