import { useGlobalModal } from "@nx-next-app/components/config-provider";
import { useAuth } from "@nx-next-app/data-access";
import { GameListContainer } from "@nx-next-app/features/F0001/desktop/lobby-game/styles";
import { useMenu } from "@nx-next-app/features/F0001/hooks";
import { useLobby } from "@nx-next-app/features/F0001/providers";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0001/types'
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

const GameList = () => {
	const {
		lobbyGameList,
		vendorList,
		imgUrl,
		gameListRef,
		onGamePlay,
		onFavoritesToggle,
		isNewGame,
	} = useLobby()
	const {
		userInfo: { langId },
	} = useAuth()
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
						const resultImgUrl = `${process.env['NEXT_PUBLIC_IMAGE_HOST']}/${tpName}/${imgGameName}-en@2x.webp`

						const lobbyGameItem = {
							tpId,
							betType,
							tpGameType,
							gameId,
							tpName,
						} as IDynamicSubMenuItem
						return (
							<div
								className='game-icon'
								style={{
									pointerEvents: isMaintain ? 'none' : 'auto',
								}}
							>
								{isMaintain && (
									<div className='under'>
										{t('Label_General_UnderMaintenance')}
									</div>
								)}
								{newGamesArr.includes(gameId) && (
									<div className='new-icon'>{t('Label_General_New')}</div>
								)}

								<div className='img-wrapper'>
									<img src={resultImgUrl} alt={gameName} />
									<div className='btn-container'>
										<button
											className='btn-play'
											onClick={() => onItemClick(lobbyGameItem)}
										>
											{t('Label_Play')}
										</button>
									</div>
								</div>
								<div className='details'>
									<div>
										<div>{gameName}</div>
										<div>{resultGameImgDisplayText}</div>
									</div>
									<div
										className={classNames({ active: isFavorite })}
										onClick={() =>
											onFavoritesToggle({
												tpId,
												gameId,
											})
										}
									>
										<div>
											<img
												src={`${
													process.env['NEXT_PUBLIC_BANNER_HOST']
												}/desktop/img/4.0/lobby-slots/star-icon${
													isFavorite ? '-active' : ''
												}.png`}
												alt=''
											/>
										</div>
									</div>
								</div>
							</div>
						)
					}
				)}
				<span ref={gameListRef} />
			</GameListContainer>
		</Suspense>
	) : (
		<div className='nodata'>
			<img
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/nodata-icon.png`}
				alt=''
			/>
			<div>{t('Label_General_NoData')}</div>
		</div>
	)
}

export default GameList
