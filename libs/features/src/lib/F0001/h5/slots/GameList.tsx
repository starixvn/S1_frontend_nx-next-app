import React, { LegacyRef, Suspense } from 'react'
import Image from 'next/future/image'
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
	onActive,
	onSetFavorites,
}: {
	vendorList: IVendorData[]
	activeCategory: string
	slotsGameList: IDisplayGameData[]
	gameListRef: LegacyRef<HTMLDivElement> | undefined
	imgUrl: string
	onActive: (
		targetGame: IDisplayGameData & {
			resultTpName?: string
			resultGameImgDisplayText?: string
			resultGameName?: string
		}
	) => void
	onSetFavorites: (gameObj: IGameData) => void
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
								className={`info ${isMaintain ? 'star active' : ''}`}
								key={`slots-game-${tpId}-${gameId}`}
							>
								{activeCategory === 'new' ? (
									<i className='icon  icon-new' />
								) : null}

								<button
									onClick={() =>
										onActive({
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
										onSetFavorites({
											tpId,
											gameId,
											imgName,
											gameName,
											playFree,
											...rest,
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
			<div className='txt-white'>{t('Label_NoData')}</div>
		</div>
	)
}

export default GameList
