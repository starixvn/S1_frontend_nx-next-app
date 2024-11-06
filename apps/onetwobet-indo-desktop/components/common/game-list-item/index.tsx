import { useAuth } from '@nx-next-app/data-access'
import {
	IDynamicSubMenuItem,
	MenuIconTypeEnum,
	MenuKeyEnum,
} from '@nx-next-app/types'
import { isEventPeriod } from '@nx-next-app/utils'
import classNames from 'classnames'
import { Translation, useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

interface IGameListItemProps {
	subMenuItem: IDynamicSubMenuItem
	onItemClick: (item: IDynamicSubMenuItem) => void
}

const GameListItem = ({ subMenuItem, onItemClick }: IGameListItemProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { langId },
	} = useAuth()

	const displayName =
		subMenuItem?.currencyGameName &&
		subMenuItem?.currencyGameName[langId] &&
		subMenuItem?.currencyGameName[langId]

	const lobbyIconEnum: { [p: number]: ReactNode | null } = {
		[MenuIconTypeEnum.NO_ICON]: null,
		[MenuIconTypeEnum.New]: (
			<Translation>
				{t => <div className='new-icon'>{t('Label_General_New')}</div>}
			</Translation>
		),
	}

	// 後端這裡是字串格式 需做處理
	const subMenuLobbyImageUrl =
		subMenuItem?.pcLobbyPicUrl && JSON.parse(subMenuItem?.pcLobbyPicUrl)[0]

	const { iconType, iconStartTime, iconEndTime, isTpMaintain } =
		subMenuItem || {}

	const lobbyIcon =
		(isEventPeriod({ start: iconStartTime, end: iconEndTime }) &&
			lobbyIconEnum[iconType]) ||
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

			{subMenuItem.lobbyCategory === MenuKeyEnum.ESports.toLowerCase() ? (
				<img src={subMenuLobbyImageUrl} alt={subMenuItem?.productName} />
			) : (
				<div className='img-wrapper'>
					<img src={subMenuLobbyImageUrl} alt={subMenuItem?.productName} />
					<div className='btn-container'>
						<button>{t('Label_PlayNow')}</button>
					</div>
				</div>
			)}

			<div className='lobby-title'>
				{displayName || subMenuItem?.productName}
			</div>
		</div>
	)
}

export default GameListItem
