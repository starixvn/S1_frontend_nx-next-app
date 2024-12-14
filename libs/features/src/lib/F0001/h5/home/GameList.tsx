import { useGlobalModal } from "@nx-next-app/components/config-provider";
import { paths } from "@nx-next-app/constants";
import EmblaCarousel from "@nx-next-app/features/F0001/h5/common/emblaCarousel";
import GameIcon from "@nx-next-app/features/F0001/h5/home/gameIcon";
import { GameContainer } from "@nx-next-app/features/F0001/h5/home/styles";
import { useHome } from "@nx-next-app/features/F0001/providers";
import { IHotGame } from "@nx-next-app/service";
import { EmblaOptionsType } from "embla-carousel";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getIsTpMaintain } from '@nx-next-app/utils'
import { useGlobalData } from '@nx-next-app/data-access'

type IGameList = {
	gameData: IHotGame[]
	isControlButton: boolean
	children?: React.ReactNode
	extraClassName?: string
}

const GameList: React.FC<IGameList> = (props: IGameList) => {
	const { gameData, isControlButton, children, extraClassName } = props
	const { modal } = useGlobalModal()
	const { t } = useTranslation()
	const { push } = useRouter()
	const { handleHotGameClick } = useHome()
  const { tpMaintainList } = useGlobalData()

	const gameTypeEmblaOptions: EmblaOptionsType = { slidesToScroll: 'auto' }

	if (gameData === null || gameData === undefined || gameData?.length === 0) {
		return <div />
	}

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
										underMaintenanceCallback: () => {
											modal.info(t('Label_underMaintenance'), {
												title: t('Label_General_ImportantNote'),
											})
										},
										loginCallback: () => push(paths.login.root),
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
