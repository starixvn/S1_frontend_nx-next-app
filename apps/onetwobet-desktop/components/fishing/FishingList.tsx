import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useMenu } from '@nx-next-app/operations'
import { IDynamicSubMenuItem, MenuKeyEnum } from '@nx-next-app/types'
import { find } from 'lodash-es'
import dynamic from 'next/dynamic'
import { GameListItem } from '../common'

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

const LiveStreamingModal = dynamic(
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
			liveStreamingCallback: () => modal.open(<LiveStreamingModal />),
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
