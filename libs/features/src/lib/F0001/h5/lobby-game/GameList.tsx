import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { useLobby } from '@nx-next-app/features/F0001/providers'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0001/types'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useRouter } from 'next/router'


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
      liveStreamingCallback: () =>
        modal.open(<LiveStreamingModalH5 />),
		})
	}
	return lobbyGameList && lobbyGameList.length > 0 ? (
		<Suspense>
			<div className='slotList'>
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

            const resultImgUrl = `${process.env['NEXT_PUBLIC_IMAGE_HOST']}/${tpName.toLowerCase()}/${gameName.toLowerCase().split(" ").join("-")}.png`;

            const lobbyGameItem = {
              tpId ,
              betType,
              tpGameType,
              gameId,
              tpName
            } as IDynamicSubMenuItem;

						return (
							<div
								className={classNames('info', { 'star active': isMaintain })}
							>
								{newGamesArr.includes(gameId) ? (
									<i className='icon  icon-new' />
								) : null}

								<button
									onClick={() =>
                    onItemClick(lobbyGameItem)
									}
								>
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
							</div>
						)
					}
				)}
				<span ref={gameListRef} />
			</div>
		</Suspense>
	) : (
		<div className='nodata icon icon-nodata'>
			<div className='txt-white'>{t('Label_General_NoData')}</div>
		</div>
	)
}

export default GameList
