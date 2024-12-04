import { useGlobalModal } from "@nx-next-app/components/config-provider";
import AppearSensor from "@nx-next-app/features/F0001/desktop/common/appearSensor";
import { NoData } from "@nx-next-app/features/F0001/desktop/common/NoData";
import { LoadingIcon } from "@nx-next-app/features/F0001/desktop/home/gameIcon/icons";
import { GameIconContainer, GameListContainer } from "@nx-next-app/features/F0001/desktop/lobby-game/styles";
import { useMenu } from "@nx-next-app/features/F0001/hooks";
import { useLobby } from "@nx-next-app/features/F0001/providers";
import { ProviderEnum } from "@nx-next-app/types";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Img } from "react-image";
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
	const { lobbyGameList, gameListRef, onFavoritesToggle, isNewGame } =
		useLobby()

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
				<AppearSensor>
					{({ hasBeenVisible }: { hasBeenVisible: boolean }) => {
						return lobbyGameList.map(
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
								displayText,
								...rest
							}) => {
								const resultImgUrl = `${process.env['NEXT_PUBLIC_IMAGE_HOST']}/${tpName}/${imgGameName}-en@2x.webp`

								const lobbyGameItem = {
									tpId,
									betType,
									tpGameType,
									gameId,
									tpName,
								} as IDynamicSubMenuItem
								return (
									<GameIconContainer
										style={{
											pointerEvents: isMaintain ? 'none' : 'auto',
										}}
									>
										<div className='img-wrapper'>
											{hasBeenVisible && (
												<Img
													className='img'
													src={resultImgUrl}
													loader={<LoadingIcon />}
													// unloader={<NoGameIcon />}
													unloader={<p>{gameName}</p>}
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
												className={classNames(
													'icon icon-star-fill icon-favorite',
													{
														active: isFavorite,
													}
												)}
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
												<div className='under'>
													{t('Label_General_UnderMaintenance')}
												</div>
											</div>
										)}

										{newGamesArr.includes(gameId) && (
											<div className='new-icon'>{t('Label_General_New')}</div>
										)}
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
