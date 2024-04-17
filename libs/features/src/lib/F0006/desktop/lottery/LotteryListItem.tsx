import { useRef } from 'react'
import { useHover } from 'usehooks-ts'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { isEventPeriod } from '@nx-next-app/utils'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0006/types'
import { switchLobbyIcon } from '@nx-next-app/components/D0006/game-list-item'

interface IListItemProps {
	subMenuItemClassName: string
	subMenuItem: IDynamicSubMenuItem
	onItemClick: (item: IDynamicSubMenuItem) => void
}

const LotteryListItem = ({
	subMenuItemClassName,
	subMenuItem,
	onItemClick,
}: IListItemProps) => {
	const { t } = useTranslation()
	const hoverRef = useRef(null)
	const {
		userInfo: { langId },
	} = useAuth()
	const isHover = useHover(hoverRef)

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
			className={subMenuItemClassName}
			onClick={() => onItemClick(subMenuItem)}
		>
			{lobbyIcon}

			<div className='name' style={{ marginTop: '30px' }}>
				{displayName || subMenuItem?.productName}
			</div>

			{/* <Image */}
			{/* 	src={suBMenuLobbyImage} */}
			{/* 	width={250} */}
			{/* 	height={344} */}
			{/* 	alt={subMenuItem?.productName} */}
			{/* /> */}

			{isHover ? (
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/lottery/${lobbyPage?.hoverBgImg}`}
					alt={subMenuItem?.productName}
				/>
			) : (
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/lottery/${lobbyPage?.npcImg}`}
					alt={subMenuItem?.productName}
				/>
			)}

			{isTpMaintain && (
				<div className='under'>{t('Label_General_UnderMaintenance')}</div>
			)}
			<div>{t('Label_PlayNow')}</div>
		</div>
	)
}

export default LotteryListItem
