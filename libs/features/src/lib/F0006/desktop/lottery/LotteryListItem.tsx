import head from 'lodash/head'
import { useHover } from 'usehooks-ts'
import { useRef } from 'react'
import { useTranslation } from 'next-i18next'

interface IListItemProps {
	alt: string
	imgSrc: string
	className: string
	hoverImgSrc: string
	displayName?: string
	style: React.CSSProperties
	eventIcons?: {
		icon: string
	}[]
	onItemClick: () => void
}

const LotteryListItem = ({
	alt,
	style,
	imgSrc,
	className,
	eventIcons,
	displayName,
	hoverImgSrc,
	onItemClick,
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
			{eventIcons && head(eventIcons)?.icon && (
				<div className={head(eventIcons)?.icon} />
			)}

			<div className='name' style={{ marginTop: '30px' }}>
				{displayName}
			</div>
			<img src={isHover ? hoverImgSrc : imgSrc} alt={alt} />
			<div className='under'>{t('Label_General_UnderMaintenance')}</div>
			<div>{t('Label_PlayNow')}</div>
		</div>
	)
}

export default LotteryListItem
