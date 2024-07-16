import React, { Suspense } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { useSlots } from '@nx-next-app/features/F0001/providers'

const GameList = () => {
	const {
		slotsGameList,
		vendorList,
		imgUrl,
		gameListRef,
		onGamePlay,
		onFavoritesToggle,
		isNewGame,
	} = useSlots()
	const {
		userInfo: { langId },
	} = useAuth()
	const { t } = useTranslation()
	const newGamesArr = isNewGame()

	return slotsGameList && slotsGameList.length > 0 ? (
		<Suspense>
			<div className='slots-list'>
				{slotsGameList.map(
					({
						tpId,
						gameId,
						imgName,
						gameName,
						playFree,
						isMaintain,
						isFavorite,
						...rest
					}) => {
						const resultGameImgDisplayText = vendorList.find(
							({ tpId: vendorTpId }) => vendorTpId === tpId
						)?.gameImgDisplayText
						const resultImgName = imgName[langId] ?? imgName['en']
						const resultImgUrl = `${imgUrl}/${resultGameImgDisplayText}/${resultImgName}`
						const resultGameName = gameName[langId] ?? gameName['en']

						return (
							<div
								className='slots-list-item'
								style={{
									pointerEvents: isMaintain ? 'none' : 'auto',
								}}
								key={`casino-game-${tpId}-${gameId}`}
							>
								{isMaintain && (
									<div className='under'>
										{t('Label_General_UnderMaintenance')}
									</div>
								)}
								{newGamesArr.includes(gameId) && (
									<div className='new-icon'>{t('Label_General_New')}</div>
								)}

								<div className='img-wrapper'>
									<img src={resultImgUrl} alt='' />
									<div className='btn-container'>
										<button
											className='btn-play'
											onClick={() =>
												onGamePlay({
													tpId,
													gameId,
													playFree: false,
												})
											}
										>
											{t('Label_Play')}
										</button>

										{playFree ? (
											<button
												className='btn-demo'
												onClick={() =>
													onGamePlay({
														tpId,
														gameId,
														playFree,
													})
												}
											>
												{t('Label_Demo')}
											</button>
										) : null}
									</div>
								</div>
								<div className='details'>
									<div>
										<div>{resultGameName}</div>
										<div>{resultGameImgDisplayText}</div>
									</div>
									<div
										className={classNames({ active: isFavorite })}
										onClick={() =>
											onFavoritesToggle({
												tpId,
												gameId,
											})
										}
									>
										<img
											src={`${
												process.env['NEXT_PUBLIC_BANNER_HOST']
											}/desktop/img/4.0/lobby-slots/star-icon${
												isFavorite ? '-active' : ''
											}.png`}
											alt=''
										/>
									</div>
								</div>
							</div>
						)
					}
				)}
				<span ref={gameListRef} />
			</div>
		</Suspense>
	) : (
		<div className='nodata'>
			<img
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/nodata-icon.png`}
				alt=''
			/>
			<div>{t('Label_General_NoData')}</div>
		</div>
	)
}

export default GameList
