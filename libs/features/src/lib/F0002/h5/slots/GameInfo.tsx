import React from 'react'
import Image from 'next/future/image'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { useSlots } from '@nx-next-app/features/F0002/providers'
import { IGameData } from '@nx-next-app/service'

const GameInfo = () => {
	const {
		imgUrl,
		activeGame,
		isFavorite,
		onFavoritesToggle,
		onGamePlay,
		onGameActive,
	} = useSlots()
	const {
		userInfo: { langId },
	} = useAuth()
	const { t } = useTranslation()

	return (
		<div className='slotpopup active' style={{ zIndex: 10 }}>
			<div className='slotFunction'>
				<Image
					src={`${imgUrl}/${activeGame?.resultTpName}/${activeGame?.imgName[langId]}`}
					alt={activeGame?.resultGameName as string}
					width={300}
					height={300}
				/>

				<div className='gameTitle'>
					<div className='title text-org'>
						{activeGame?.resultGameName as string}
					</div>
					<span
						onClick={() => onFavoritesToggle(activeGame as IGameData)}
						className={`icon icon-star-${isFavorite ? 'full' : 'empty'}`}
					/>
				</div>
				<button
					className='icon icon-cancel-circle'
					onClick={() => onGameActive(null)}
				/>
				<div className='btn-group'>
					<button
						className='blue'
						data-testid='clickPlay'
						onClick={() => {
							if (activeGame?.tpId && activeGame?.gameId) {
								onGamePlay({
									tpId: activeGame.tpId,
									gameId: activeGame.gameId,
									playFree: activeGame?.playFree,
								})
							}
						}}
					>
						{t('Label_Play')}
					</button>
					{activeGame?.playFree ? (
						<button
							data-testid='clickFreePlay'
							className='orange'
							onClick={() => {
								if (activeGame?.tpId && activeGame?.gameId) {
									onGamePlay({
										tpId: activeGame.tpId,
										gameId: activeGame.gameId,
										playFree: activeGame?.playFree,
									})
								}
							}}
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
