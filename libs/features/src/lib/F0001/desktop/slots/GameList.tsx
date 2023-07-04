import React, { LegacyRef, Suspense } from 'react'
import {
	IDisplayGameData,
	IGameData,
	IVendorData,
} from 'libs/web/src/service/gameApi/type'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'

const GameList = ({
	vendorList,
	activeCategory,
	slotsGameList,
	gameListRef,
	imgUrl,
	onSetFavorites,
	onPlay,
}: {
	vendorList: IVendorData[]
	activeCategory: string
	slotsGameList: IDisplayGameData[]
	gameListRef: LegacyRef<HTMLDivElement> | undefined
	imgUrl: string
	onSetFavorites: (gameObj: IGameData) => void
	onPlay: (targetGame: IGameData) => void
}) => {
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
								className={isMaintain ? 'active' : ''}
								style={{
									pointerEvents: isMaintain ? 'none' : 'auto',
								}}
								key={`casino-game-${tpId}-${gameId}`}
							>
								<div className='brand'>
									<span>{resultGameImgDisplayText}</span>
								</div>

								<div
									className={`icon ${
										activeCategory === 'new' ? 'icon-new' : ''
									}`}
								/>

								<img alt='Casino_tpInfo' src={resultImgUrl} />

								<div className='txt-darkBlue'>
									<div>{resultGameName}</div>
									<div
										onClick={() =>
											onSetFavorites({
												tpId,
												gameId,
												imgName,
												gameName,
												playFree,
												...rest,
											})
										}
										className={`icon icon-star-full${
											isFavorite ? ' active' : ''
										}`}
									/>
								</div>

								<div className='btnGroup'>
									<button
										className='blue'
										onClick={() =>
											onPlay({
												tpId,
												gameId,
												imgName,
												gameName,
												playFree,
												...rest,
											})
										}
									>
										{t('Label_Play')}
									</button>

									{playFree ? (
										<button
											className='blue'
											onClick={() =>
												onPlay({
													tpId,
													gameId,
													imgName,
													gameName,
													playFree,
													...rest,
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
			<div>{t('Label_NoData')}</div>
		</div>
	)
}

export default GameList
