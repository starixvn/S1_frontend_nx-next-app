import { useTranslation } from 'next-i18next'
import head from 'lodash/head'

interface IListItemProps {
	alt: string
	className: string
	displayName?: string
	imgSrc: string
	onItemClick: () => void
	eventIcons?: {
		icon: string
		text: string
	}[]
	isTpMaintain?: boolean
}

const GameListItem = ({
	alt,
	className,
	displayName,
	imgSrc,
	onItemClick,
	eventIcons,
	isTpMaintain,
}: IListItemProps) => {
	const { t } = useTranslation()
	return (
		<div className={className} onClick={onItemClick}>
			{isTpMaintain && (
				<div className='under-text'>{t('Label_underMaintenance')}</div>
			)}
			<div className='img-wrapper'>
				{eventIcons && head(eventIcons)?.icon && (
					<div className={head(eventIcons)?.icon}>{head(eventIcons)?.text}</div>
				)}
				<img src={imgSrc} alt={alt} />
				<div className='btn-container'>
					<button>{t('Label_PlayNow')}</button>
				</div>
			</div>
			<h2 className='lobby-title'>{displayName}</h2>
		</div>
	)
}

export default GameListItem
