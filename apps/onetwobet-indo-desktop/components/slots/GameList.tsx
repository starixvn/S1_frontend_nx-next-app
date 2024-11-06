import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { useSlots } from '@nx-next-app/operations'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'

const GameList = () => {
	const {
		slotsGameList,
		vendorList,
		imgUrl,
		gameListRef,
		onGamePlay,
		onFavoritesToggle,
		newGameIds,
	} = useSlots()
	const {
		userInfo: { langId },
	} = useAuth()
	const { t } = useTranslation()
	const { getBannerUrl } = useGlobalData()

	return slotsGameList && slotsGameList.length > 0 ? (
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
							{newGameIds.has(gameId) && (
								<div className='new-icon'>{t('Label_General_New')}</div>
							)}

							<div className='img-wrapper'>
								<img src={resultImgUrl} style={{ aspectRatio: 1 }} alt='' />
								<div className='btn-container'>
									<button
										className='btn-play'
										onClick={() =>
											onGamePlay({ tpId, gameId, playFree: false })
										}
									>
										{t('Label_Play')}
									</button>

									{playFree ? (
										<button
											className='btn-demo'
											onClick={() => onGamePlay({ tpId, gameId, playFree })}
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
									onClick={() => onFavoritesToggle({ tpId, gameId })}
								>
									<img
										src={getBannerUrl(
											isFavorite
												? '/desktop/img/4.0/lobby-slots/star-icon-active.png'
												: '/desktop/img/4.0/lobby-slots/star-icon.png'
										)}
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
	) : (
		<div className='nodata'>
			<img src={getBannerUrl('/desktop/img/4.0/nodata-icon.png')} alt='' />
			<div>{t('Label_General_NoData')}</div>
		</div>
	)
}

export default GameList
