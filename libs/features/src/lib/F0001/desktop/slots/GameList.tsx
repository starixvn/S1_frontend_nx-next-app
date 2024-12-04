import { useAuth } from "@nx-next-app/data-access";
import AppearSensor from "@nx-next-app/features/F0001/desktop/common/appearSensor";
import { NoData } from "@nx-next-app/features/F0001/desktop/common/NoData";
import { LoadingIcon } from "@nx-next-app/features/F0001/desktop/home/gameIcon/icons";
import { GameIconContainer, GameListContainer } from "@nx-next-app/features/F0001/desktop/lobby-game/styles";
import { useSlots } from "@nx-next-app/features/F0001/providers";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import { Suspense } from "react";
import { Img } from "react-image";

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
			<GameListContainer>
				<AppearSensor>
					{({ hasBeenVisible }: { hasBeenVisible: boolean }) => {
						return slotsGameList.map(
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
								const resultImgName = imgName[langId] ?? imgName['-en']
								const resultImgUrl = `${imgUrl}/${resultGameImgDisplayText}/${resultImgName}@2x.webp`
								const resultGameName = gameName[langId] ?? gameName['en']

								return (
									<GameIconContainer
										style={{
											pointerEvents: isMaintain ? 'none' : 'auto',
										}}
										key={`casino-game-${tpId}-${gameId}`}
									>
										{isMaintain && (
											<div className='um-container'>
												<div className='under'>
													{t('Label_General_UnderMaintenance')}
												</div>
											</div>
										)}
										{newGamesArr.includes(gameId) && (
											<div className='new-icon'>{t('Label_General_New')}</div>
										)}

										<div className='img-wrapper'>
											{hasBeenVisible && (
												<Img
													className='img'
													src={resultImgUrl}
													loader={<LoadingIcon />}
													// unloader={<NoGameIcon />}
													unloader={<p>{resultGameName}</p>}
													alt={resultGameName}
												/>
											)}
										</div>
										<div className='details'>
											<div className='providerName'>
												{resultGameImgDisplayText}
											</div>

											<div
												className={classNames(
													'icon icon-star-fill icon-favorite',
													{ active: isFavorite }
												)}
												onClick={() =>
													onFavoritesToggle({
														tpId,
														gameId,
													})
												}
											/>

											<div className='btn-container'>
												<button
													className='button btn-primary btn-play'
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
														className='button btn-secondary btn-demo'
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
									</GameIconContainer>
								)
							}
						)
					}}
				</AppearSensor>
				<span ref={gameListRef} />
			</GameListContainer>
		</Suspense>
	) : (
		<NoData customClass='no-border' />
	)
}

export default GameList
