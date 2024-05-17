import { ReactNode } from 'react'
import { useTranslation } from 'next-i18next'
import classNames from 'classnames'
import Image from 'next/future/image'
import { useAuth } from '@nx-next-app/data-access'
import { isEventPeriod } from '@nx-next-app/utils'
import { MenuIconTypeEnum } from '@nx-next-app/types'
import { Translation } from 'react-i18next'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0001/types'

interface IListItemProps {
	subMenuItem: IDynamicSubMenuItem
	onItemClick: (item: IDynamicSubMenuItem) => void
}

// * Lobby Icon 共用樣式
export const lobbyIconEnum: { [p: number]: ReactNode | null } = {
	[MenuIconTypeEnum.NO_ICON]: null,
	[MenuIconTypeEnum.New]: (
		<Translation>
			{t => <div className='new-icon'>{t('Label_General_New')}</div>}
		</Translation>
	),
}

// * Get Lobby Icon 共用涵式
export const switchLobbyIcon = (iconType: MenuIconTypeEnum) => {
	return lobbyIconEnum[iconType] || null
}

const GameListItem = ({ subMenuItem, onItemClick }: IListItemProps) => {
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
			className={classNames('lobby-content-item', {
				under: isTpMaintain,
			})}
			onClick={() => onItemClick(subMenuItem)}
		>
			{isTpMaintain && (
				<div className='under-text'>{t('Label_underMaintenance')}</div>
			)}

			{lobbyIcon}

			<div className='img-wrapper'>
				<Image
					src={suBMenuLobbyImage}
					width={260}
					height={260}
					alt={subMenuItem?.productName}
				/>
				<div className='btn-container'>
					<button>{t('Label_PlayNow')}</button>
				</div>
			</div>
			<div className='lobby-title'>
				{displayName || subMenuItem?.productName}
			</div>
		</div>
	)
}

export default GameListItem
