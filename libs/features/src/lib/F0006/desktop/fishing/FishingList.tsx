import dynamic from 'next/dynamic'
import { find } from 'lodash-es'
import { MenuKeyEnum } from '@nx-next-app/types'
import { useMenu } from '@nx-next-app/features/F0006/hooks'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0006/types'
import GameListItem from '@nx-next-app/components/D0006/game-list-item'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

const FishingList = () => {
	const { modal } = useGlobalModal()
	const { menuList = [], onMenuOpen } = useMenu()

	const fishingSubMenus = find(menuList, {
		category: MenuKeyEnum.Fishing,
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
				<div className='fishingList'>
					{fishingSubMenus?.map(subMenuItem => (
						<GameListItem
							key={subMenuItem?.tpGameIdNo}
							subMenuItem={subMenuItem}
							onItemClick={onItemClick}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default FishingList
