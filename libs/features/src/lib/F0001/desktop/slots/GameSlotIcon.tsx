import { useAuth } from "@nx-next-app/data-access";
import { LoadingIcon } from "@nx-next-app/features/F0001/desktop/home/gameIcon/icons";
import { GameIconContainer } from "@nx-next-app/features/F0001/desktop/lobby-game/styles";
import { useSlots } from "@nx-next-app/features/F0001/providers";
import { IDisplayGameData } from "@nx-next-app/service";
import classNames from "classnames";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Img } from "react-image";
import { useInView } from "react-intersection-observer";

const SlotGameIcon: FC<{ game: IDisplayGameData }> = ({ game }) => {
	const { tpId, gameId, imgName, gameName, playFree, isMaintain, isFavorite } =
		game

	const {
		userInfo: { langId },
	} = useAuth()

	const { vendorList, imgUrl, onGamePlay, onFavoritesToggle, isNewGame } =
		useSlots()

	const newGamesArr = isNewGame()

	const { t } = useTranslation()

	const resultGameImgDisplayText = vendorList.find(
		({ tpId: vendorTpId }) => vendorTpId === tpId
	)?.gameImgDisplayText

	const resultImgUrl = `${imgUrl}/${resultGameImgDisplayText}/${imgName['en']}@2x.webp`

	const resultGameName = gameName[langId] ?? gameName['en']

	const { ref, inView } = useInView({
		threshold: 0.1, // Trigger when 10% of the element is visible
	})

	return (
		<GameIconContainer
			ref={ref}
			style={{
				pointerEvents: isMaintain ? 'none' : 'auto',
			}}
		>
			{isMaintain && (
				<div className='um-container'>
					<div className='under'>{t('Label_General_UnderMaintenance')}</div>
				</div>
			)}
			{newGamesArr.includes(gameId) && (
				<div className='new-icon'>{t('Label_General_New')}</div>
			)}

			<div className='img-wrapper'>
				{inView && (
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
				<div className='providerName'>{resultGameImgDisplayText}</div>

				<div
					className={classNames('icon icon-star-fill icon-favorite', {
						active: isFavorite,
					})}
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

export default SlotGameIcon
