import { ReactNode, useRef } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { isEventPeriod } from '@nx-next-app/utils'
import { MenuIconTypeEnum } from '@nx-next-app/types'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0006/types'

interface IListItemProps {
	subMenuItemClassName?: string
	gameTextClassName?: string
	subMenuItem: IDynamicSubMenuItem
	onItemClick: (item: IDynamicSubMenuItem) => void
}

// * Lobby Icon 共用樣式
export const lobbyIconEnum: { [p: number]: ReactNode | null } = {
	[MenuIconTypeEnum.NO_ICON]: null,
	[MenuIconTypeEnum.New]: <div className='icon icon-new'>New</div>,
}

// * Get Lobby Icon 共用涵式
export const switchLobbyIcon = (iconType: MenuIconTypeEnum) => {
	return lobbyIconEnum[iconType] || null
}

const GameListItem = ({
	subMenuItemClassName,
	gameTextClassName = 'name',
	subMenuItem,
	onItemClick,
}: IListItemProps) => {
	const hoverRef = useRef(null)

	const { t } = useTranslation()
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

	const { iconType, iconStartTime, iconEndTime, isTpMaintain } =
		subMenuItem || {}

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
			<img src={suBMenuLobbyImage} alt={subMenuItem?.productName} />
			{isTpMaintain && (
				<div className='under'>{t('Label_underMaintenance')}</div>
			)}

			<h2 className={gameTextClassName}>
				{displayName || subMenuItem?.productName}
			</h2>
		</div>
	)
}

export default GameListItem
