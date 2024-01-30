import { useRef } from 'react'
import Image from 'next/future/image'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { isEventPeriod } from '@nx-next-app/utils'
import { switchLobbyIcon } from '@nx-next-app/components/D0006/game-list-item'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0006/types'
import classNames from 'classnames'

interface IListItemProps {
	subMenuItemClassName: string
	subMenuItem: IDynamicSubMenuItem
	onItemClick: (item: IDynamicSubMenuItem) => void
}

const LiveCasinoListItem = ({
	subMenuItemClassName,
	subMenuItem,
	onItemClick,
}: IListItemProps) => {
	const { t } = useTranslation()
	const hoverRef = useRef(null)

	const {
		userInfo: { langId },
	} = useAuth()

	const displayName =
		subMenuItem?.currencyGameName &&
		subMenuItem?.currencyGameName[langId] &&
		subMenuItem?.currencyGameName[langId]

	// * 後端這裡是字串格式 需做處理
	const suBMenuLobbyImage =
		subMenuItem?.pcLobbyPicUrl && JSON.parse(subMenuItem?.pcLobbyPicUrl)[0]

	const { iconType, iconStartTime, iconEndTime, isTpMaintain, desktop } =
		subMenuItem || {}
	const { lobbyPage } = desktop || {}

	const lobbyIcon =
		(isEventPeriod({ start: iconStartTime, end: iconEndTime }) &&
			switchLobbyIcon(iconType)) ||
		null

	return (
		<div
			ref={hoverRef}
			className={classNames(subMenuItemClassName, {
				active: isTpMaintain,
			})}
			onClick={() => onItemClick(subMenuItem)}
		>
			{lobbyIcon}

			<div className='animationImg'>
				{/* // TODO: 等 yashbet 有資料後需更換  */}
				<Image
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/livecasino/${lobbyPage?.hoverBgImg}`}
					alt='animation-img'
					width={260}
					height={330}
				/>
			</div>
			{/* // TODO: 等 yashbet 有資料後需更換  */}
			{/* <Image */}
			{/* 	src={suBMenuLobbyImage} */}
			{/* 	width={260} */}
			{/* 	height={330} */}
			{/* 	alt={subMenuItem?.productName} */}
			{/* /> */}
			<Image
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/livecasino/${lobbyPage?.npcImg}`}
				width={260}
				height={330}
				alt={subMenuItem?.productName}
			/>
			{isTpMaintain && (
				<div className='under'>{t('Label_General_UnderMaintenance')}</div>
			)}

			<h2 className='name'>{displayName || subMenuItem?.productName}</h2>
		</div>
	)
}

export default LiveCasinoListItem
