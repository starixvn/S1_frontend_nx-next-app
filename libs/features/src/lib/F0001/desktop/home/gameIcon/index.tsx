import { GameIconContainer } from "@nx-next-app/features/F0001/desktop/home/gameIcon/styles";
import { useTranslation } from "next-i18next";
import { FC } from "react";

interface IGameItem {
	gameId: string
	gameName?: string
	gameLogo: string
	isMaintain: boolean
	tpId?: number
	tpName?: string
}

interface IGameIcon {
	gameItem: IGameItem
	onClick: () => void
}

const GameIcon: FC<IGameIcon> = ({ gameItem, onClick }) => {
	const { gameId, gameLogo, gameName, isMaintain, tpId, tpName } = gameItem
	const { t } = useTranslation()

	return (
		<GameIconContainer
			isMaintain={isMaintain}
			style={{
				pointerEvents: isMaintain ? 'none' : 'auto',
			}}
			key={`casino-game-${gameId}`}
		>
			{isMaintain && (
				<div className='under'>{t('Label_General_UnderMaintenance')}</div>
			)}

			<div className='img-wrapper'>
				<img className='img' src={gameLogo} alt={gameName} />

				<button className='button btn-primary btn-play' onClick={onClick}>
					{t('Label_Play')}
				</button>

				<div className='providerName'>{tpName}</div>
			</div>
		</GameIconContainer>
	)
}

export default GameIcon
