import { useGlobalModal } from "@nx-next-app/components/config-provider";
import { paths } from "@nx-next-app/constants";
import { LoadingIcon } from "@nx-next-app/features/F0001/h5/home/gameIcon/icons";
import { GameIconContainer } from "@nx-next-app/features/F0001/h5/lobby-game/styles";
import { useMenu } from "@nx-next-app/features/F0001/hooks";
import { useLobby } from "@nx-next-app/features/F0001/providers";
import { IDisplayLobbyGameData } from "@nx-next-app/service";
import { IDynamicSubMenuItem, ProviderEnum } from "@nx-next-app/types";
import classNames from "classnames";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
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

const LiveStreamingModalH5 = dynamic(
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
	const { push } = useRouter()
	const { modal } = useGlobalModal()
	const onItemClick = (item: IDynamicSubMenuItem) => {
		onMenuOpen(item, {
			loginCallback: () => {
				push(paths.login.root)
			},
			messageCallBack: message => modal.error(message),
			liveStreamingCallback: () => modal.open(<LiveStreamingModalH5 />),
		})
	}

	const resultImgUrl = `${process.env['NEXT_PUBLIC_IMAGE_HOST']}/${tpName}/${imgGameName}-en@1x.webp`

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
			className={classNames({
				'star active': isMaintain,
			})}
			ref={ref}
		>
			<button
				className='img-wrapper'
				onClick={() => onItemClick(lobbyGameItem)}
			>
				{inView && (
					<Img
						className='img'
						src={resultImgUrl}
						loader={<LoadingIcon />}
						// unloader={<NoGameIcon />}
						unloader={<p>{gameName}</p>}
						alt={gameName}
					/>
				)}
			</button>

			<div className='providerName'>
				{tpId === ProviderEnum.MaxGame ||
				tpId === ProviderEnum.Keno ||
				tpId === ProviderEnum.Lottery ||
				tpId === ProviderEnum.TableGame
					? 'MaxPlay'
					: displayText}
			</div>

			<div
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

export default GameLobbyIcon
