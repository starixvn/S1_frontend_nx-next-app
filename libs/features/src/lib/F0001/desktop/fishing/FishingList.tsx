import { find } from 'lodash-es'
import dynamic from 'next/dynamic'
import { MenuKeyEnum } from '@nx-next-app/types'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0001/types'
import GameListItem from '@nx-next-app/components/D0001/game-list-item'

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

const LiveStreamingModalDesktop = dynamic(
	() => import('../modal/LiveStreamingModal'),
	{ ssr: false }
)

const FishingList = () => {
	const { modal } = useGlobalModal()
	const { menuList = [], onMenuOpen } = useMenu()

	const onItemClick = (item: IDynamicSubMenuItem) => {
		onMenuOpen(item, {
			loginCallback: () => modal.open(<LoginModal />),
			messageCallBack: message => modal.error(message),
			liveStreamingCallback: () => modal.open(<LiveStreamingModalDesktop />),
		})
	}

	const fishingSubMenus = find(menuList, {
		category: MenuKeyEnum.Fishing,
	})?.subMenu

	return (
		<div className='lobby-content'>
			{fishingSubMenus?.map(subMenuItem => (
				<GameListItem
					key={subMenuItem?.tpGameIdNo}
					subMenuItem={subMenuItem}
					onItemClick={onItemClick}
				/>
			))}
		</div>
	)
}

export default FishingList
