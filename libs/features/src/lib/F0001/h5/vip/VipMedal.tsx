import { useStaticData } from '@nx-next-app/data-access'
import { VipLevelEnum, type IImageData } from '@nx-next-app/types'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'

interface IVipMedalProps {
	activeTab: number
	onChange: (tab: number) => void
}

const VipMedal = ({ activeTab, onChange }: IVipMedalProps) => {
	const { t } = useTranslation()
	const { VIP_CLUB_IMAGES } = useStaticData()

	const filteredVipClubImages = VIP_CLUB_IMAGES.filter(
		item => item.level !== VipLevelEnum.Highest
	)

	return (
		<div className='medal'>
			{filteredVipClubImages.map(
				({ url, displayKey, levelTabsName, level }: IImageData) => (
					<div
						className={classNames('medal-item', {
							[`${levelTabsName}`]: level === activeTab,
						})}
						key={`VIPLevelList-${displayKey}`}
						onClick={() => onChange(level as number)}
					>
						<img src={url} alt={displayKey} />
						<div>{t(displayKey as string)}</div>
					</div>
				)
			)}
		</div>
	)
}

export default VipMedal
