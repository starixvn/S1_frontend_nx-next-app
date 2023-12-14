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
		menuData: {
			Fishing: { subMenu },
		},
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
				<div className='fishingList'>
					{subMenu?.map((item: ISubMenu) => (
						<GameListItem
							className={classNames({ active: item.isTpMaintain })}
							style={{ pointerEvents: item.isTpMaintain ? 'none' : 'auto' }}
							alt={item.displayKey as string}
							key={item?.product?.GAME_ID}
							hoverImgSrc={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/fishing/${item?.desktop?.lobbyPage?.hoverBgImg}`}
							imgSrc={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/fishing/${item?.desktop?.lobbyPage?.bgImg}`}
							displayName={
								item.displayKey
									? (t(item.displayKey) as string)
									: item.displayText
							}
							onItemClick={() => onItemClick(item)}
							gameTextClassName='name'
							eventIcons={item?.eventIcons}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default FishingList
