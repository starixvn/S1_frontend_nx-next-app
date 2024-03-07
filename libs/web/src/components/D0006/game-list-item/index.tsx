import { ReactNode, useRef } from 'react'
import classNames from 'classnames'
import Image from 'next/future/image'
import { useHover } from 'usehooks-ts'
import { Translation } from 'react-i18next'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { isEventPeriod } from '@nx-next-app/utils'
import { MenuIconTypeEnum } from '@nx-next-app/types'
import type { IDynamicSubMenuItem } from '@nx-next-app/features/F0006/types'

interface IListItemProps {
	subMenuItemClassName?: string
	imageCategory: string
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
	imageCategory,
	gameTextClassName = 'name',
	subMenuItem,
	onItemClick,
}: IListItemProps) => {
	const hoverRef = useRef(null)
	const isHover = useHover(hoverRef)

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

			{isHover ? (
				<Image
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/${imageCategory}/${lobbyPage?.hoverBgImg}`}
					alt={subMenuItem?.productName}
					width={300}
					height={375}
				/>
			) : (
				<Image
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/${imageCategory}/${lobbyPage?.npcImg}`}
					alt={subMenuItem?.productName}
					width={300}
					height={375}
				/>
			)}
			{/* // TODO: 等 yashbet 有資料後需更換  */}
			{/* <Image */}
			{/*   src={suBMenuLobbyImage} */}
			{/*   width={250} */}
			{/*   height={344} */}
			{/*   alt={subMenuItem?.productName} */}
			{/* /> */}
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
