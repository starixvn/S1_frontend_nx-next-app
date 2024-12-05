import AppearSensor from "@nx-next-app/features/F0001/desktop/common/appearSensor";
import { LoadingIcon } from "@nx-next-app/features/F0001/desktop/home/gameIcon/icons";
import { GameIconContainer } from "@nx-next-app/features/F0001/desktop/home/gameIcon/styles";
import { useTranslation } from "next-i18next";
import { FC } from "react";
import { Img } from "react-image";

interface IGameItem {
	gameId: string
	gameName?: string
	imageUrl: string
	isMaintain: boolean
	tpId?: number
	tpName?: string
}

interface IGameIcon {
	gameItem: IGameItem
	isLarge?: boolean
	onClick: () => void
}

const GameIcon: FC<IGameIcon> = ({ gameItem, isLarge, onClick }) => {
  if(!gameItem) return null;
	const { gameId, imageUrl, gameName, isMaintain, tpName } = gameItem
	const { t } = useTranslation()

	return (
		<AppearSensor>
			{({ hasBeenVisible }: { hasBeenVisible: boolean }) => {
				return (
					<GameIconContainer
						className={`embla__slide game-icon ${isMaintain ? 'maintain' : ''}`}
						$isMaintain={isMaintain}
						key={`casino-game-${gameId}`}
					>
						<div className='img-wrapper'>
							{hasBeenVisible && (
								<Img
									className='img'
									src={`${process.env['NEXT_PUBLIC_IMAGE_HOST']}/${imageUrl}${
										isLarge ? '@2x' : '@1x'
									}.webp`}
									loader={<LoadingIcon />}
									// unloader={<NoGameIcon />}
									unloader={<p>{gameName}</p>}
									alt={gameName}
								/>
							)}
							<button className='button btn-primary btn-play' onClick={onClick}>
								{t('Label_Play')}
							</button>

							<div className='providerName'>{tpName}</div>
						</div>

						{isMaintain && (
							<div className='um-container'>
								<div className='txt-maintain'>
									{t('Label_General_UnderMaintenance')}
								</div>
							</div>
						)}
					</GameIconContainer>
				)
			}}
		</AppearSensor>
	)
}

export default GameIcon
