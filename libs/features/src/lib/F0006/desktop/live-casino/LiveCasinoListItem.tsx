import head from 'lodash/head'
import { useTranslation } from 'next-i18next'
import { useRef } from 'react'

interface IListItemProps {
	alt: string
	style: React.CSSProperties
	imgSrc: string
	className: string
	eventIcons?: {
		icon: string
	}[]
	displayName?: string
	hoverImgSrc: string
	gameTextClassName: string
	onItemClick: () => void
}

const LiveCasinoListItem = ({
	alt,
	style,
	imgSrc,
	className,
	eventIcons,
	displayName,
	hoverImgSrc,
	gameTextClassName,
	onItemClick,
}: IListItemProps) => {
	const { t } = useTranslation()
	const hoverRef = useRef(null)
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
			<div className='animationImg'>
				<img src={hoverImgSrc} alt='animation-img' />
			</div>
			<img src={imgSrc} alt={alt} />
			<div className='under'>{t('Label_General_UnderMaintenance')}</div>
			<h2 className={gameTextClassName}>{displayName}</h2>
		</div>
	)
}

export default LiveCasinoListItem
