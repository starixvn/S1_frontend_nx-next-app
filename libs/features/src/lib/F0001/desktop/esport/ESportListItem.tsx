import head from 'lodash/head'
import { useTranslation } from 'next-i18next'

interface IListItemProps {
	alt: string
	imgSrc: string
	className: string
	eventIcons?: {
		icon: string
		text: string
	}[]
	displayName?: string
	onItemClick: () => void
	isTpMaintain?: boolean
}

const ESportListItem = ({
	alt,
	imgSrc,
	className,
	eventIcons,
	displayName,
	onItemClick,
	isTpMaintain,
}: IListItemProps) => {
	const { t } = useTranslation()
	return (
		<a className={className} onClick={onItemClick}>
			{isTpMaintain && (
				<div className='under-text'>{t('Label_underMaintenance')}</div>
			)}
			{eventIcons && head(eventIcons)?.icon && (
				<div className={head(eventIcons)?.icon}>{head(eventIcons)?.text}</div>
			)}
			<img src={imgSrc} alt={alt} />
			<div className='lobby-title'>{displayName}</div>
		</a>
	)
}

export default ESportListItem
