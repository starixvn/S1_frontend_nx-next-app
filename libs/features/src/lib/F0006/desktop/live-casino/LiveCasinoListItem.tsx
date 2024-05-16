import { useRef } from 'react'
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
				<div className='under'>{t('Label_General_UnderMaintenance')}</div>
			)}

			<h2 className='name'>{displayName || subMenuItem?.productName}</h2>
		</div>
	)
}

export default LiveCasinoListItem
