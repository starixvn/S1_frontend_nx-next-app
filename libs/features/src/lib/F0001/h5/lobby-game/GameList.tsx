import { useGlobalModal } from "@nx-next-app/components/config-provider";
import { paths } from "@nx-next-app/constants";
import { GameIconContainer, GameListContainer } from "@nx-next-app/features/F0001/h5/lobby-game/styles";
import { useMenu } from "@nx-next-app/features/F0001/hooks";
import { useLobby } from "@nx-next-app/features/F0001/providers";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Suspense } from "react";

import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0001/types'
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

const GameList = () => {
	const {
		lobbyGameList,
		vendorList,
		gameListRef,
		onFavoritesToggle,
		isNewGame,
	} = useLobby()

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

	console.log('-------lobbyGameList', lobbyGameList)

	return lobbyGameList && lobbyGameList.length > 0 ? (
		<Suspense>
			<GameListContainer>
				{lobbyGameList.map(
					({
						tpId,
						gameId,
						gameName,
						tpName,
						isMaintain,
						isFavorite,
						imgGameName,
						betType,
						tpGameType,
						...rest
					}) => {
						const resultGameImgDisplayText = vendorList.find(
							({ tpId: vendorTpId }) => vendorTpId === tpId
						)?.gameImgDisplayText

						const resultImgUrl = `${
							process.env['NEXT_PUBLIC_IMAGE_HOST']
						}/${tpName}/${gameName.toLowerCase().split(' ').join('-')}@1x.webp`

						const lobbyGameItem = {
							tpId,
							betType,
							tpGameType,
							gameId,
							tpName,
						} as IDynamicSubMenuItem

						return (
							<GameIconContainer
								className={classNames('game-icon', {
									'star active': isMaintain,
								})}
							>
								{newGamesArr.includes(gameId) ? (
									<i className='icon  icon-new' />
								) : null}

								<button onClick={() => onItemClick(lobbyGameItem)}>
									<img src={resultImgUrl} alt={gameName} />
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
							</GameIconContainer>
						)
					}
				)}
				<span ref={gameListRef} />
			</GameListContainer>
		</Suspense>
	) : (
		<div className='nodata icon icon-nodata'>
			<div className='txt-white'>{t('Label_General_NoData')}</div>
		</div>
	)
}

export default GameList
