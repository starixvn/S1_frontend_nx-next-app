import { useGlobalModal } from '@nx-next-app/components/config-provider'
import ESportListItem from '@nx-next-app/features/F0001/desktop/esport/ESportListItem'
import { ESportContainer } from '@nx-next-app/features/F0001/desktop/esport/styles'
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
		<ESportContainer className='content-container'>
			{eSportSubMenus?.map(subMenuItem => (
				<ESportListItem
					key={subMenuItem?.tpGameIdNo}
					subMenuItem={subMenuItem}
					onItemClick={onItemClick}
				/>
			))}
		</ESportContainer>
	)
}

export default ESportList
