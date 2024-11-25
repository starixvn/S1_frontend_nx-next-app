import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import EmblaCarousel from '@nx-next-app/features/F0001/desktop/common/emblaCarousel'
import GameIcon from '@nx-next-app/features/F0001/desktop/home/gameIcon'
import { GameContainer } from '@nx-next-app/features/F0001/desktop/home/liveCasinoGames/styles'
import {
	GameGroup,
	GroupTitle,
} from '@nx-next-app/features/F0001/desktop/home/styles'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { EmblaOptionsType } from 'embla-carousel'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const LoginModal = dynamic(() => import('../../modal/LoginModal'), {
	ssr: false,
})

const UnderMaintenanceModal = dynamic(
	() => import('../../modal/UnderMaintainModal'),
	{
		ssr: false,
	}
)

const NewReleasedGames = () => {
	const { t } = useTranslation()
	const { newGameData, handleHotGameClick, handleSlotGamePlay } = useHome()

	const { modal } = useGlobalModal()

	const gameTypeEmblaOptions: EmblaOptionsType = { slidesToScroll: 'auto' }

	if (newGameData.length === 0) {
		return <div />
	}

	return (
		<GameGroup className='content-container others'>
			{newGameData.length > 0 && (
				<>
					<GroupTitle>
						New Release
						<Link href={paths.slots.root} passHref>
							<a className='load-more'>
								All <span className='icon icon-arrow-right-line' />
							</a>
						</Link>
					</GroupTitle>
					<GameContainer>
						<EmblaCarousel options={gameTypeEmblaOptions} isControlButton>
							{newGameData.map(game => {
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
				</>
			)}
		</GameGroup>
	)
}

export default NewReleasedGames
