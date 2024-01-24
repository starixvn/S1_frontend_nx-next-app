import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import { ISubMenu } from '@nx-next-app/types'
import ESportListItem from './ESportListItem'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

export interface IGameInfoProps {
	langId: string
	TP_ID: number
	GAME_ID: number
	TP_GAME_TYPE: number
	gameInfo?: string
}

const ESportList = () => {
	const { modal } = useGlobalModal()
	const { t } = useTranslation()
	const {
		menuData: { ESports: { subMenu } = {} },
		onMenuOpen,
	} = useMenu()

	const onItemClick = (item: ISubMenu) => {
		onMenuOpen(item, {
			loginCallback: () => modal.open(<LoginModal />),
		})
	}

	return (
		<div className='lobby-content esports'>
			{subMenu?.map(item => (
				<ESportListItem
					key={item?.product?.GAME_ID}
					alt={`img-${t(item.displayKey || '') || item.displayText}`}
					className={classNames('lobby-content-item', {
						under: item.isTpMaintain,
					})}
					imgSrc={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/lobby-esports/${item?.desktop?.lobbyPage?.bgImg}`}
					displayName={t(item.displayKey || '') || item.displayText}
					eventIcons={item?.eventIcons}
					onItemClick={() => onItemClick(item)}
					isTpMaintain={item.isTpMaintain}
				/>
			))}
		</div>
	)
}

export default ESportList
