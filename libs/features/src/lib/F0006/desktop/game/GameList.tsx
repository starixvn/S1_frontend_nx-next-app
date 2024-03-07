import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useMenu } from '@nx-next-app/features/F0006/hooks'
import dynamic from 'next/dynamic'
import GameListItem from '@nx-next-app/components/D0006/game-list-item'
import { useTranslation } from 'next-i18next'
import classNames from 'classnames'
import { ISubMenu } from '@nx-next-app/types'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0006/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

const GameList = () => {
	const { modal } = useGlobalModal()
	const { t } = useTranslation()
	const {
		menuData: {
			Game: { subMenu },
		},
		onMenuOpen,
	} = useMenu()

	const onItemClick = (item: ISubMenu) => {
		onMenuOpen(item, {
			loginCallback: () => modal.open(<LoginModal />),
		})
	}

	return (
		<section className='inside'>
			<div className='rightModule'>
				{subMenu?.map((item: ISubMenu) => (
					<GameListItem
						className={classNames('gameItem', { active: item.isTpMaintain })}
						style={{ pointerEvents: item.isTpMaintain ? 'none' : 'auto' }}
						alt={item.displayKey as string}
						key={item?.product?.GAME_ID}
						hoverImgSrc={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/game/${item?.desktop?.lobbyPage?.hoverBgImg}`}
						imgSrc={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/game/${item?.desktop?.lobbyPage?.bgImg}`}
						displayName={
							item.displayKey
								? (t(item.displayKey) as string)
								: item.displayText
						}
						onItemClick={() => onItemClick(item)}
						gameTextClassName='name'
						eventIcons={item?.eventIcons}
					/>
				))}
			</div>
		</section>
	)
}

export default GameList
