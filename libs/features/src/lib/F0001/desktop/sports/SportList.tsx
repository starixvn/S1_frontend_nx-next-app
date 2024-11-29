import { useGlobalModal } from '@nx-next-app/components/config-provider'
import SportListItem from '@nx-next-app/features/F0001/desktop/sports/SportListItem'
import { SportContainer } from '@nx-next-app/features/F0001/desktop/sports/styles'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { IDynamicSubMenuItem, MenuKeyEnum } from '@nx-next-app/types'
import { find } from 'lodash-es'
import dynamic from 'next/dynamic'

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

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
		<SportContainer className='content-container'>
			{sportSubMenus?.map(subMenuItem => (
				<SportListItem
					key={subMenuItem?.tpGameIdNo}
					subMenuItem={subMenuItem}
					onItemClick={onItemClick}
				/>
			))}
		</SportContainer>
	)
}

export default SportList
