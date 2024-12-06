import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { GameListContainer } from '@nx-next-app/features/F0001/h5/lobby-game/styles'
import SportListItem from '@nx-next-app/features/F0001/h5/sports/SportListItem'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { IDynamicSubMenuItem, MenuKeyEnum } from '@nx-next-app/types'
import { find } from 'lodash-es'
import dynamic from 'next/dynamic'

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

const SportList = () => {
	const { modal } = useGlobalModal()
	const { menuList = [], onMenuOpen } = useMenu()

	const sportSubMenus = find(menuList, {
		category: MenuKeyEnum.Sports,
	})?.subMenu

	const onItemClick = (item: IDynamicSubMenuItem) => {
		onMenuOpen(item, {
			loginCallback: () => modal.open(<LoginModal />),
			messageCallBack: message => modal.error(message),
			liveStreamingCallback: () => modal.open(<LiveStreamingModalDesktop />),
		})
	}

	return (
		<GameListContainer className='sport'>
			{sportSubMenus?.map(subMenuItem => (
				<SportListItem
					key={subMenuItem?.tpGameIdNo}
					subMenuItem={subMenuItem}
					onItemClick={onItemClick}
				/>
			))}
		</GameListContainer>
	)
}

export default SportList
