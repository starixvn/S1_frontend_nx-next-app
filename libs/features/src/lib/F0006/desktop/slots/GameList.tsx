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
		activeCategoryKey,
		gameListRef,
		onGamePlay,
		onFavoritesToggle,
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
						const resultImgName = imgName[langId] ?? imgName['en']
						const resultImgUrl = `${imgUrl}/${resultGameImgDisplayText}/${resultImgName}`
						const resultGameName = gameName[langId] ?? gameName['en']

						return (
							<div
								className={classNames({ active: isMaintain })}
								style={{
									pointerEvents: isMaintain ? 'none' : 'auto',
								}}
								key={`casino-game-${tpId}-${gameId}`}
							>
								<div className='brand'>
									<span>{resultGameImgDisplayText}</span>
								</div>

								<div
									className={classNames('icon', {
										'icon-new': activeCategoryKey === 'new',
									})}
								/>

								<img alt='Casino_tpInfo' src={resultImgUrl} />

								<div className='txt-darkBlue'>
									<div>{resultGameName}</div>
									<div
										onClick={() =>
											onFavoritesToggle({
												tpId,
												gameId,
											})
										}
										className={classNames('icon icon-star-full', {
											active: isFavorite,
										})}
									/>
								</div>

								<div className='btnGroup'>
									<button
										className='blue'
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
											className='blue'
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
								<div className='under'>{t('Label_underMaintenance')}</div>
							</div>
						)
					}
				)}
				<span ref={gameListRef} />
			</div>
		</Suspense>
	) : (
		<div className='nodata icon icon-nodata'>
			<div>{t('Label_General_NoData')}</div>
		</div>
	)
}

export default GameList
