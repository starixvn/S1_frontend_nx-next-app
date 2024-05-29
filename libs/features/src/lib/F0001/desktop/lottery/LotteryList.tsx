import dynamic from 'next/dynamic'
import { GameListItem } from '@nx-next-app/components/D0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { MenuKeyEnum } from '@nx-next-app/types'
import { find } from 'lodash-es'
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

const LotteryList = () => {
	const { modal } = useGlobalModal()
	const { menuList = [], onMenuOpen } = useMenu()

	const eSportSubMenus = find(menuList, {
		category: MenuKeyEnum.Lottery,
	})?.subMenu

	const onItemClick = (item: IDynamicSubMenuItem) => {
		onMenuOpen(item, {
			loginCallback: () => modal.open(<LoginModal />),
			messageCallBack: message => modal.error(message),
			liveStreamingCallback: () => modal.open(<LiveStreamingModalDesktop />),
		})
	}

	return (
		<div className='lobby-content'>
			{eSportSubMenus?.map(subMenuItem => (
				<GameListItem
					key={subMenuItem?.tpGameIdNo}
					subMenuItem={subMenuItem}
					onItemClick={onItemClick}
				/>
			))}
		</div>
	)
}

export default LotteryList
