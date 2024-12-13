import { useAuth } from "@nx-next-app/data-access";
import { LoadingIcon } from "@nx-next-app/features/F0001/h5/home/gameIcon/icons";
import { GameIconContainer } from "@nx-next-app/features/F0001/h5/lobby-game/styles";
import { useSlots } from "@nx-next-app/features/F0001/providers";
import { IDisplayGameData } from "@nx-next-app/service";
import classNames from "classnames";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Img } from "react-image";
import { useInView } from "react-intersection-observer";

const SlotGameIcon: FC<{ game: IDisplayGameData }> = ({ game }) => {
	const {
		tpId,
		gameId,
		imgName,
		gameName,
		playFree,
		isMaintain,
		isFavorite,
		tpName,
	} = game

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
			className={classNames({ 'star active': isMaintain })}
			ref={ref}
		>
			<button
				className='img-wrapper'
				onClick={() =>
					onGamePlay({
						tpId,
						gameId,
						playFree: false,
					})
				}
			>
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
			</button>
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

			{isMaintain && (
				<div className='um-container'>
					<div className='under'>{t('Label_General_UnderMaintenance')}</div>
				</div>
			)}

			{newGamesArr.includes(gameId) ? (
				<div className='new-icon'>{t('Label_General_New')}</div>
			) : null}
		</GameIconContainer>
	)
}

export default SlotGameIcon
