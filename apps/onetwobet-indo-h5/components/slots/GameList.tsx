import { useAuth } from '@nx-next-app/data-access'
import { useSlots } from '@nx-next-app/operations'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { Suspense } from 'react'

const GameList = () => {
	const {
		slotsGameList,
		vendorList,
		imgUrl,
		gameListRef,
		onGameActive,
		onFavoritesToggle,
		newGameIds,
	} = useSlots()
	const {
		userInfo: { langId },
	} = useAuth()
	const { t } = useTranslation()

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
								{newGameIds.has(gameId) && <i className='icon icon-new' />}
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
