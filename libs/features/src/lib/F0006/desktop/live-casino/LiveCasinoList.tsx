import { find } from 'lodash-es'
import dynamic from 'next/dynamic'
import { MenuKeyEnum } from '@nx-next-app/types'
import { useMenu } from '@nx-next-app/features/F0006/hooks'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0006/types'
import LiveCasinoListItem from './LiveCasinoListItem'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

const LiveCasinoList = () => {
	const { modal } = useGlobalModal()
	const { menuList = [], onMenuOpen } = useMenu()

	const liveCasinoSubMenus = find(menuList, {
		category: MenuKeyEnum.Casino,
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
				<div className='livecasino newDesign'>
					{liveCasinoSubMenus?.map(subMenuItem => (
						<LiveCasinoListItem
							subMenuItemClassName='esport-item'
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

export default LiveCasinoList
