import { LoadingIcon } from "@nx-next-app/features/F0001/h5/home/gameIcon/icons";
import { GameIconContainer } from "@nx-next-app/features/F0001/h5/home/gameIcon/styles";
import { useTranslation } from "next-i18next";
import { FC } from "react";
import { Img } from "react-image";
import { useInView } from "react-intersection-observer";

interface IGameItem {
	gameId: string
	gameName?: string
	imageUrl: string
	isMaintain: boolean
	tpId?: number
	tpName?: string
}

interface IGameIcon {
	gameItem: IGameItem
	isLarge?: boolean
	onClick: () => void
}

const GameIcon: FC<IGameIcon> = ({ gameItem, isLarge, onClick }) => {
	const { gameId, imageUrl, gameName, isMaintain, tpName } = gameItem
	const { t } = useTranslation()

	const { ref, inView } = useInView({
		threshold: 0.1, // Trigger when 10% of the element is visible
	})

	return (
		<GameIconContainer
			className={`embla__slide game-icon ${isMaintain ? 'maintain' : ''}`}
			$isMaintain={isMaintain}
			key={`casino-game-${gameId}`}
			ref={ref}
		>
			<div className='img-wrapper' onClick={onClick}>
				{inView && (
					<Img
						className='img'
						src={`${process.env['NEXT_PUBLIC_IMAGE_HOST']}/${imageUrl}${
							isLarge ? '@2x' : '@1x'
						}.webp`}
						loader={<LoadingIcon />}
						// unloader={<NoGameIcon />}
						unloader={<p>{gameName}</p>}
						alt={gameName}
					/>
				)}

				<div className='providerName'>{tpName}</div>
			</div>

			{isMaintain && (
				<div className='um-container'>
					<div className='txt-maintain'>
						{t('Label_General_UnderMaintenance')}
					</div>
				</div>
			)}
		</GameIconContainer>
	)
}

export default GameIcon
