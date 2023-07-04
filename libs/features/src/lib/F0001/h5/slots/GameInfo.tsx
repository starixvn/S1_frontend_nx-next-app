import React, { Dispatch, SetStateAction } from 'react'
import Image from 'next/future/image'
import { IDisplayGameData } from 'libs/web/src/service/gameApi/type'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'

interface IGameInfoProps {
	imgUrl: string
	activeGame: IDisplayGameData & {
		resultTpName?: string
		resultGameImgDisplayText?: string
		resultGameName?: string
	}
	setActiveGame: Dispatch<SetStateAction<IDisplayGameData | null>>
	onSetFavorites: (gameObj: IDisplayGameData) => void
	onPlay: (targetGame: IDisplayGameData) => void
}

const GameInfo = ({
	imgUrl,
	activeGame,
	setActiveGame,
	onSetFavorites,
	onPlay,
}: IGameInfoProps) => {
	const {
		userInfo: { langId },
	} = useAuth()
	const { t } = useTranslation()
	return (
		<div className='slotpopup active' style={{ zIndex: 10 }}>
			<div className='slotFunction'>
				<Image
					src={`${imgUrl}/${activeGame.resultTpName}/${activeGame.imgName[langId]}`}
					alt={activeGame.resultGameName as string}
					width={300}
					height={300}
				/>

				<div className='gameTitle'>
					<div className='title text-org'>
						{activeGame.resultGameName as string}
					</div>
					<span
						onClick={() =>
							onSetFavorites({
								...activeGame,
								tpId: activeGame?.tpId,
								gameId: activeGame?.gameId,
								imgName: activeGame?.imgName,
								gameName: activeGame?.gameName,
								playFree: activeGame?.playFree,
							})
						}
						className={`icon icon-star-${
							activeGame.isFavorite ? 'full' : 'empty'
						}`}
					/>
				</div>
				<button
					className='icon icon-cancel-circle'
					onClick={() => setActiveGame(null)}
				/>
				<div className='btn-group'>
					<button
						className='blue'
						data-testid='clickPlay'
						onClick={() => onPlay(activeGame)}
					>
						{t('Label_Play')}
					</button>
					{activeGame.playFree ? (
						<button
							data-testid='clickFreePlay'
							className='orange'
							onClick={() => onPlay(activeGame)}
						>
							{t('Label_Demo')}
						</button>
					) : null}
				</div>
			</div>
		</div>
	)
}

export default GameInfo
