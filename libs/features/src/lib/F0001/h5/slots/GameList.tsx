import { useAuth } from '@nx-next-app/data-access'
import { LoadingIcon } from '@nx-next-app/features/F0001/h5/home/gameIcon/icons'
import {
	GameIconContainer,
	GameListContainer,
} from '@nx-next-app/features/F0001/h5/lobby-game/styles'
import { useSlots } from '@nx-next-app/features/F0001/providers'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { Suspense } from 'react'
import { Img } from 'react-image'

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
			<GameListContainer>
				{slotsGameList.map(
					({
						tpId,
						gameId,
						imgName,
						gameName,
						playFree,
						isMaintain,
						isFavorite,
						tpName,
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
							<GameIconContainer
								className={classNames({ 'star active': isMaintain })}
								key={`slots-game-${tpId}-${gameId}`}
							>
								<button
									className='img-wrapper'
									onClick={() =>
										onGameActive({
											tpId,
											gameId,
											imgName,
											gameName,
											playFree,
											isMaintain,
											isFavorite,
											tpName,
											...rest,
											resultTpName,
											resultGameImgDisplayText,
											resultGameName,
										})
									}
								>
									<Img
										className='img'
										src={resultImgUrl}
										loader={<LoadingIcon />}
										// unloader={<NoGameIcon />}
										unloader={<p>{resultGameName}</p>}
										alt={resultGameName}
									/>
								</button>
								<div className='details'>
									<div className='providerName'>{tpName}</div>
									<span
										onClick={() =>
											onFavoritesToggle({
												tpId,
												gameId,
											})
										}
										className={classNames('icon icon-star-fill icon-favorite', {
											active: isFavorite,
										})}
									/>
								</div>

								{isMaintain && (
									<div className='um-container'>
										<div className='under'>
											{t('Label_General_UnderMaintenance')}
										</div>
									</div>
								)}

								{newGamesArr.includes(gameId) ? (
									<div className='new-icon'>{t('Label_General_New')}</div>
								) : null}
							</GameIconContainer>
						)
					}
				)}
				<span ref={gameListRef} />
			</GameListContainer>
		</Suspense>
	) : (
		<div className='nodata icon icon-nodata'>
			<div className='txt-white'>{t('Label_General_NoData')}</div>
		</div>
	)
}

export default GameList
