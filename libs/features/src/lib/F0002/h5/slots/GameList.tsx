import React, { Suspense } from 'react'
import classNames from 'classnames'
import Image from 'next/future/image'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { useSlots } from '@nx-next-app/features/F0002/providers'

const GameList = () => {
	const {
		slotsGameList,
		vendorList,
		imgUrl,
		activeCategoryKey,
		gameListRef,
		onGameActive,
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
						const resultTpName = vendorList.find(
							({ tpId: vendorTpId }) => vendorTpId === tpId
						)?.tpName
						const resultImgName = imgName[langId] ?? imgName['en']
						const resultImgUrl = `${imgUrl}/${resultTpName}/${resultImgName}`
						const resultGameName = gameName[langId] ?? gameName['en']
						return (
							<div
								className={classNames('info', { 'star active': isMaintain })}
								key={`slots-game-${tpId}-${gameId}`}
							>
								{activeCategoryKey === 'new' ? (
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
									<Image
										src={resultImgUrl}
										alt={resultGameName}
										width={300}
										height={300}
									/>
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
