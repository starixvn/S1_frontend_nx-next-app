import { useGlobalModal } from "@nx-next-app/components/config-provider";
import { paths } from "@nx-next-app/constants";
import EmblaCarousel from "@nx-next-app/features/F0001/desktop/common/emblaCarousel";
import GameIcon from "@nx-next-app/features/F0001/desktop/home/gameIcon";
import { GameContainer } from "@nx-next-app/features/F0001/desktop/home/liveCasinoGames/styles";
import { GameGroup, GroupTitle } from "@nx-next-app/features/F0001/desktop/home/styles";
import { useHome } from "@nx-next-app/features/F0001/providers";
import { TpCategory } from "@nx-next-app/service";
import { EmblaOptionsType } from "embla-carousel";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import Link from "next/link";

const LoginModal = dynamic(() => import('../../modal/LoginModal'), {
	ssr: false,
})

const UnderMaintenanceModal = dynamic(
	() => import('../../modal/UnderMaintainModal'),
	{
		ssr: false,
	}
)

const LiveCasinoGames = () => {
	const { t } = useTranslation()
	const { hotGameData, slotGameData, handleHotGameClick, handleSlotGamePlay } =
		useHome()
	const { jackpot = [] } = slotGameData ?? {}

	const { modal } = useGlobalModal()

	const hotGameCasino = hotGameData.filter(element => {
		return element.tpCategory === TpCategory.LiveCasino
	})

	if (hotGameCasino?.length === 0 && jackpot?.length === 0) return null

	const gameTypeEmblaOptions: EmblaOptionsType = { slidesToScroll: 'auto' }

	console.log('-----------hotGameCasino', hotGameCasino)
	return (
		<GameGroup className='content-container live-casino'>
			{hotGameCasino.length > 0 && (
				<>
					<GroupTitle>
						{t('Label_General_CasinoWithLive').toUpperCase()}
						<Link href={paths.slots.root} passHref>
							<a className='load-more'>
								All <span className='icon icon-arrow-right-line' />
							</a>
						</Link>
					</GroupTitle>
					<GameContainer>
						<EmblaCarousel
							options={gameTypeEmblaOptions}
							isControlButton
							extraClassName='two-rows'
						>
							{hotGameCasino.map(game => {
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

export default LiveCasinoGames
