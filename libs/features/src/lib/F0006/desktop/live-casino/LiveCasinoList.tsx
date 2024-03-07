import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useMenu } from '@nx-next-app/features/F0006/hooks'
import { useTranslation } from 'next-i18next'
import { ISubMenu } from '@nx-next-app/types'
import LiveCasinoListItem from './LiveCasinoListItem'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0006/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

const LiveCasinoList = () => {
	const { modal } = useGlobalModal()
	const { t } = useTranslation()
	const {
		menuData: { Casino: { subMenu } = {} },
		onMenuOpen,
	} = useMenu()

	const onItemClick = (item: ISubMenu) => {
		onMenuOpen(item, {
			loginCallback: () => modal.open(<LoginModal />),
		})
	}

	return (
		<section className='inside'>
			<div className='rightModule'>
				<div className='livecasino newDesign'>
					{subMenu?.map((item: ISubMenu) => (
						<LiveCasinoListItem
							key={item?.product?.GAME_ID}
							alt={item.displayKey as string}
							className={classNames({ active: item.isTpMaintain })}
							style={{ pointerEvents: item.isTpMaintain ? 'none' : 'auto' }}
							imgSrc={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/livecasino/${item?.desktop?.lobbyPage?.npcImg}`}
							hoverImgSrc={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/livecasino/${item?.desktop?.lobbyPage?.hoverBgImg}`}
							displayName={
								item.displayKey
									? (t(item.displayKey) as string)
									: item.displayText
							}
							eventIcons={item?.eventIcons}
							onItemClick={() => onItemClick(item)}
							gameTextClassName='name'
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default LiveCasinoList
