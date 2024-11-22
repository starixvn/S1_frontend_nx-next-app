import { useTranslation } from 'next-i18next'
import classNames from 'classnames'
import { useAuth } from '@nx-next-app/data-access'
import { isEventPeriod } from '@nx-next-app/utils'
import { switchLobbyIcon } from '@nx-next-app/components/D0001/game-list-item'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0001/types'

interface IListItemProps {
	subMenuItem: IDynamicSubMenuItem
	onItemClick: (item: IDynamicSubMenuItem) => void
}

const ESportListItem = ({ subMenuItem, onItemClick }: IListItemProps) => {
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

	const eSportLobbyIcon =
		(isEventPeriod({ start: iconStartTime, end: iconEndTime }) &&
			switchLobbyIcon(iconType)) ||
		null

	return (
		<div
			className={classNames('lobby-content-item', {
				under: isTpMaintain,
			})}
			onClick={() => onItemClick(subMenuItem)}
		>
			{isTpMaintain && (
				<div className='under-text'>{t('Label_General_UnderMaintenance')}</div>
			)}

			{eSportLobbyIcon}

			<img src={suBMenuLobbyImage} alt={subMenuItem?.gameName} />
			<div className='lobby-title'>
				{displayName || subMenuItem?.gameName}
			</div>
		</div>
	)
}

export default ESportListItem
