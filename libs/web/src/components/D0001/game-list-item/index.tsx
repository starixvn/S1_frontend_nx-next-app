import { useTranslation } from 'next-i18next'
import { useRef } from 'react'
import { useHover } from 'usehooks-ts'

interface IListItemProps {
	alt: string
	className: string
	displayName?: string
	hoverImgSrc: string
	imgSrc: string
	onItemClick: () => void
	style: React.CSSProperties
}

const GameListItem = ({
	alt,
	className,
	displayName,
	hoverImgSrc,
	imgSrc,
	onItemClick,
	style,
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
			<img src={isHover ? hoverImgSrc : imgSrc} alt={alt} />
			<div className='under'>{t('Label_General_UnderMaintenance')}</div>
			<h2 className='name'>{displayName}</h2>
		</div>
	)
}

export default GameListItem
