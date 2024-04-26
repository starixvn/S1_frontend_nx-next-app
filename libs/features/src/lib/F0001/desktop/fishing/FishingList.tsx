import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import dynamic from 'next/dynamic'
import GameListItem from '@nx-next-app/components/D0001/game-list-item'
import { useTranslation } from 'next-i18next'
import classNames from 'classnames'
import { ISubMenu } from '@nx-next-app/types'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

const FishingList = () => {
	const { modal } = useGlobalModal()
	const { t } = useTranslation()
	const {
		menuData: { Fishing: { subMenu } = {} },
		onMenuOpen,
	} = useMenu()

	const onItemClick = (item: ISubMenu) => {
		onMenuOpen(item, {
			loginCallback: () => modal.open(<LoginModal />),
		})
	}

	return (
		<div className='lobby-content'>
			{subMenu?.map(item => (
				<GameListItem
					key={`${item?.product?.GAME_ID}-${item?.product?.TP_GAME_TYPE}-${item?.product?.TP_ID}`}
					alt={`img-${t(item.displayKey || '') || item.displayText}`}
					className={classNames('lobby-content-item', {
						under: item.isTpMaintain,
					})}
					imgSrc={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/lobby-fishing/${item?.desktop?.lobbyPage?.bgImg}`}
					displayName={
						item.displayKey ? (t(item.displayKey) as string) : item.displayText
					}
					eventIcons={item?.eventIcons}
					onItemClick={() => onItemClick(item)}
					isTpMaintain={item.isTpMaintain}
				/>
			))}
		</div>
	)
}

export default FishingList
