import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import EmblaCarousel from '@nx-next-app/features/F0001/desktop/common/emblaCarousel'
import GameIcon from '@nx-next-app/features/F0001/desktop/home/gameIcon'
import HotEvents from '@nx-next-app/features/F0001/desktop/home/hotMatch'
import { GameContainer } from '@nx-next-app/features/F0001/desktop/home/liveCasinoGames/styles'
import {
	GameGroup,
	GroupTitle,
} from '@nx-next-app/features/F0001/desktop/home/styles'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { TpCategory } from '@nx-next-app/service'
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

const SportGames = () => {
	const { t } = useTranslation()
	const { hotGameData, slotGameData, handleHotGameClick } = useHome()
	const { jackpot = [] } = slotGameData ?? {}

	const { modal } = useGlobalModal()

	const sportGames = hotGameData.filter(element => {
		return element.tpCategory === TpCategory.Sports
	})

	if (sportGames?.length === 0 && jackpot?.length === 0) return null

	const gameTypeEmblaOptions: EmblaOptionsType = { slidesToScroll: 'auto' }

	return (
		<GameGroup className='content-container others'>
			{sportGames.length > 0 && (
				<>
					<GroupTitle>
						Sports
						<Link href={paths.slots.root} passHref>
							<a className='load-more'>
								All <span className='icon icon-arrow-right-line' />
							</a>
						</Link>
					</GroupTitle>
					<GameContainer>
						<EmblaCarousel options={gameTypeEmblaOptions} isControlButton>
							{sportGames.map(game => {
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
						<HotEvents />
					</GameContainer>
				</>
			)}
		</GameGroup>
	)
}

export default SportGames
