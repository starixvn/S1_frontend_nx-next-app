import { useGlobalModal } from "@nx-next-app/components/config-provider";
import { paths } from "@nx-next-app/constants";
import AppearSensor from "@nx-next-app/features/F0001/h5/common/appearSensor";
import { NoData } from "@nx-next-app/features/F0001/h5/common/NoData";
import { LoadingIcon } from "@nx-next-app/features/F0001/h5/home/gameIcon/icons";
import { GameIconContainer, GameListContainer } from "@nx-next-app/features/F0001/h5/lobby-game/styles";
import { useMenu } from "@nx-next-app/features/F0001/hooks";
import { useLobby } from "@nx-next-app/features/F0001/providers";
import { ProviderEnum } from "@nx-next-app/types";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Suspense } from "react";
import { Img } from "react-image";
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
                const resultImgUrl = `${process.env['NEXT_PUBLIC_IMAGE_HOST']}/${tpName}/${imgGameName}-en@1x.webp`

								const lobbyGameItem = {
									tpId,
									betType,
									tpGameType,
									gameId,
									tpName,
								} as IDynamicSubMenuItem

								return (
									<GameIconContainer
										className={classNames({
											'star active': isMaintain,
										})}
									>
										<button
											className='img-wrapper'
											onClick={() => onItemClick(lobbyGameItem)}
										>
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
										</button>

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
												onClick={() =>
													onFavoritesToggle({
														tpId,
														gameId,
													})
												}
												className={classNames(
													'icon icon-star-fill icon-favorite',
													{
														active: isFavorite,
													}
												)}
											/>
										</div>

										{isMaintain && (
											<div className='um-container'>
												<div className='under'>
													{t('Label_General_UnderMaintenance')}
												</div>
											</div>
										)}

										{newGamesArr.includes(gameId) ? (
											<div className='new-icon'>{t('Label_General_New')}</div>
										) : null}
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
