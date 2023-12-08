import { useTranslation } from 'next-i18next'
import { useRef } from 'react'
import { useHover } from 'usehooks-ts'
import head from 'lodash/head'

interface IListItemProps {
	alt: string
	className: string
	displayName?: string
	hoverImgSrc: string
	imgSrc: string
	onItemClick: () => void
	style: React.CSSProperties
	gameTextClassName: string
	eventIcons?: {
		icon: string
	}[]
}

const GameListItem = ({
	alt,
	className,
	displayName,
	hoverImgSrc,
	imgSrc,
	onItemClick,
	style,
	gameTextClassName,
	eventIcons,
}: IListItemProps) => {
	const { t } = useTranslation()
	const hoverRef = useRef(null)
	const isHover = useHover(hoverRef)
	return (
		<div
			ref={hoverRef}
			className={className}
			style={style}
			onClick={onItemClick}
		>
			{/* 舊專案只會顯示一個 new Icon , 先這樣寫未來有需要再擴充 */}
			{eventIcons && head(eventIcons)?.icon && (
				<div className={head(eventIcons)?.icon} />
			)}
			<img src={isHover ? hoverImgSrc : imgSrc} alt={alt} />
			<div className='under'>{t('Label_General_UnderMaintenance')}</div>
			<h2 className={gameTextClassName}>{displayName}</h2>
		</div>
	)
}

export default GameListItem
