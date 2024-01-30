import { find } from 'lodash-es'
import dynamic from 'next/dynamic'
import { MenuKeyEnum } from '@nx-next-app/types'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0001/types'
import ESportListItem from './ESportListItem'

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

const LiveStreamingModalDesktop = dynamic(
	() => import('../modal/LiveStreamingModal'),
	{ ssr: false }
)

const ESportList = () => {
	const { modal } = useGlobalModal()
	const { menuList = [], onMenuOpen } = useMenu()

	const eSportSubMenus = find(menuList, {
		category: MenuKeyEnum.ESports,
	})?.subMenu

	const onItemClick = (item: IDynamicSubMenuItem) => {
		onMenuOpen(item, {
			loginCallback: () => modal.open(<LoginModal />),
			messageCallBack: message => modal.error(message),
			liveStreamingCallback: () => modal.open(<LiveStreamingModalDesktop />),
		})
	}

	return (
		<div className='lobby-content esports'>
			{eSportSubMenus?.map(subMenuItem => (
				<ESportListItem
					key={subMenuItem?.tpGameIdNo}
					subMenuItem={subMenuItem}
					onItemClick={onItemClick}
				/>
			))}
		</div>
	)
}

export default ESportList
