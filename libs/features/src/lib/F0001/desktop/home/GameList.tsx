import { useGlobalModal } from '@nx-next-app/components/config-provider'
import EmblaCarousel from '@nx-next-app/features/F0001/desktop/common/emblaCarousel'
import GameIcon from '@nx-next-app/features/F0001/desktop/home/gameIcon'
import { GameContainer } from '@nx-next-app/features/F0001/desktop/home/styles'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { IHotGame } from '@nx-next-app/service'
import { EmblaOptionsType } from 'embla-carousel'
import dynamic from 'next/dynamic'
import React from 'react'
import { getIsTpMaintain } from '@nx-next-app/utils'
import { useGlobalData } from '@nx-next-app/data-access'

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
}

const GameList: React.FC<IGameList> = (props: IGameList) => {
	const { gameData, isControlButton, children, extraClassName } = props

	const { handleHotGameClick } = useHome()
	const gameTypeEmblaOptions: EmblaOptionsType = { slidesToScroll: 'auto' }
	const { modal } = useGlobalModal()
	const { tpMaintainList } = useGlobalData()

	return (
		<GameContainer>
			{children}
			<EmblaCarousel
				options={gameTypeEmblaOptions}
				isControlButton={isControlButton}
				extraClassName={extraClassName}
			>
				{gameData?.map(game => {
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
	)
}

export default GameList
