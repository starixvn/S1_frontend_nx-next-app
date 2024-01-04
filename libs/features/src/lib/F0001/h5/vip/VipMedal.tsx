import classNames from 'classnames'
import type { IImageData } from '@nx-next-app/types'
import { useStaticData } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'

interface IVipMedalProps {
	activeTab: number
	onChange: (tab: number) => void
}

const VipMedal = ({ activeTab, onChange }: IVipMedalProps) => {
	const { t } = useTranslation()
	const { VIP_CLUB_IMAGES } = useStaticData()
	return (
		<div className='medal'>
			{VIP_CLUB_IMAGES.map(
				({ url, displayKey, levelTabsName, level }: IImageData) => (
					<div
						className={classNames('medal-item', {
							[`${levelTabsName}`]: level === activeTab,
						})}
						key={`VIPLevelList-${displayKey}`}
						onClick={() => onChange(level as number)}
					>
						<img src={url} alt={displayKey} />
						<div>
							{t(displayKey as string)}
							<span>{t('Label_Vip_Club')}</span>
						</div>
					</div>
				)
			)}
		</div>
	)
}

export default VipMedal
