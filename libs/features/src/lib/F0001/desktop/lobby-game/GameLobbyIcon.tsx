import { useGlobalModal } from "@nx-next-app/components/config-provider";
import { LoadingIcon, NoGameIcon } from "@nx-next-app/features/F0001/desktop/home/gameIcon/icons";
import { GameIconContainer } from "@nx-next-app/features/F0001/desktop/lobby-game/styles";
import { useMenu } from "@nx-next-app/features/F0001/hooks";
import { useLobby } from "@nx-next-app/features/F0001/providers";
import { IDisplayLobbyGameData } from "@nx-next-app/service";
import { IDynamicSubMenuItem, ProviderEnum } from "@nx-next-app/types";
import classNames from "classnames";
import dynamic from "next/dynamic";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Img } from "react-image";
import { useInView } from "react-intersection-observer";

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

const LiveStreamingModalDesktop = dynamic(
	() => import('../modal/LiveStreamingModal'),
	{ ssr: false }
)

const GameLobbyIcon: FC<{ game: IDisplayLobbyGameData }> = ({ game }) => {
	const {
		tpId,
		gameId,
		gameName,
		tpName,
		isMaintain,
		isFavorite,
		imgGameName,
		betType,
		tpGameType,
		displayText,
	} = game

	const { onFavoritesToggle, isNewGame } = useLobby()

	const { t } = useTranslation()
	const newGamesArr = isNewGame()
	const { onMenuOpen } = useMenu()
	const { modal } = useGlobalModal()
	const onItemClick = (item: IDynamicSubMenuItem) => {
		onMenuOpen(item, {
			loginCallback: () => modal.open(<LoginModal />),
			messageCallBack: message => modal.error(message),
			liveStreamingCallback: () => modal.open(<LiveStreamingModalDesktop />),
		})
	}

	const resultImgUrl = `${process.env['NEXT_PUBLIC_IMAGE_HOST']}/${tpName}/${imgGameName}-en@2x.webp`

	const lobbyGameItem = {
		tpId,
		betType,
		tpGameType,
		gameId,
		tpName,
	} as IDynamicSubMenuItem

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
			<div className='img-wrapper'>
				{inView && (
					<Img
						className='img'
						src={resultImgUrl}
						loader={<LoadingIcon />}
						unloader={<NoGameIcon />}
						alt={gameName}
					/>
				)}
			</div>
			<div className='details'>
				<div className='providerName'>
					{tpId === ProviderEnum.MaxGame ||
					tpId === ProviderEnum.Keno ||
					tpId === ProviderEnum.Lottery ||
					tpId === ProviderEnum.TableGame
						? 'MaxPlay'
						: displayText}
				</div>
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
				<button
					className='button btn-primary btn-play'
					onClick={() => onItemClick(lobbyGameItem)}
				>
					{t('Label_Play')}
				</button>
			</div>

			{isMaintain && (
				<div className='um-container'>
					<div className='under'>{t('Label_General_UnderMaintenance')}</div>
				</div>
			)}

			{newGamesArr.includes(gameId) && (
				<div className='new-icon'>{t('Label_General_New')}</div>
			)}
		</GameIconContainer>
	)
}

export default GameLobbyIcon
