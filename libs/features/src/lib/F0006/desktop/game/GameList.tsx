import { find } from 'lodash-es'
import dynamic from 'next/dynamic'
import { MenuKeyEnum } from '@nx-next-app/types'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useMenu } from '@nx-next-app/features/F0006/hooks'
import GameListItem from '@nx-next-app/components/D0006/game-list-item'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0006/types'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

const GameList = () => {
	const { modal } = useGlobalModal()
	const { menuList = [], onMenuOpen } = useMenu()

	const gamesSubMenus = find(menuList, {
		category: MenuKeyEnum.Game,
	})?.subMenu

	const onItemClick = (item: IDynamicSubMenuItem) => {
		onMenuOpen(item, {
			loginCallback: () => modal.open(<LoginModal />),
			messageCallBack: message => modal.error(message),
		})
	}

	return (
		<section className='inside'>
			<div className='rightModule'>
				{gamesSubMenus?.map(subMenuItem => (
					<GameListItem
						key={subMenuItem?.tpGameIdNo}
						subMenuItemClassName='gameItem'
						subMenuItem={subMenuItem}
						onItemClick={onItemClick}
					/>
				))}
			</div>
		</section>
	)
}

export default GameList
