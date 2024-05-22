import { Suspense } from 'react'
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
		onGameActive,
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
			<div className='slotList'>
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
						const resultTpName = vendorList.find(
							({ tpId: vendorTpId }) => vendorTpId === tpId
						)?.tpName
						const resultImgName = imgName[langId] ?? imgName['en']
						const resultImgUrl = `${imgUrl}/${resultGameImgDisplayText}/${resultImgName}`
						const resultGameName = gameName[langId] ?? gameName['en']
						return (
							<div
								className={classNames('info', { 'star active': isMaintain })}
								key={`slots-game-${tpId}-${gameId}`}
							>
								{newGamesArr.includes(gameId) ? (
									<i className='icon  icon-new' />
								) : null}

								<button
									onClick={() =>
										onGameActive({
											tpId,
											gameId,
											imgName,
											gameName,
											playFree,
											isMaintain,
											isFavorite,
											...rest,
											resultTpName,
											resultGameImgDisplayText,
											resultGameName,
										})
									}
								>
									<img src={resultImgUrl} alt={resultGameName} />
								</button>
								<span>{resultGameImgDisplayText}</span>
								{isMaintain && (
									<div className='under'>{t('Label_underMaintenance')}</div>
								)}
								<span
									onClick={() =>
										onFavoritesToggle({
											tpId,
											gameId,
										})
									}
									className={`icon icon-star-${isFavorite ? 'full' : 'empty'}`}
								/>
							</div>
						)
					}
				)}
				<span ref={gameListRef} />
			</div>
		</Suspense>
	) : (
		<div className='nodata icon icon-nodata'>
			<div className='txt-white'>{t('Label_General_NoData')}</div>
		</div>
	)
}

export default GameList
