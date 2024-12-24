import { useStaticData } from '@nx-next-app/data-access'
import { IF0001VipProgram } from '@nx-next-app/features/F0001/types'
import type { IImageData } from '@nx-next-app/types'
import classNames from 'classnames'
import { find } from 'lodash-es'
import { useTranslation } from 'next-i18next'

interface IVipMedalProps {
	settings: IF0001VipProgram[]
	activeTab: number
	onChange: (tab: number) => void
}

const VipMedal = ({ settings, activeTab, onChange }: IVipMedalProps) => {
	const { t } = useTranslation()
	const { VIP_CLUB_IMAGES } = useStaticData()
	return (
		<div className='medal'>
			{VIP_CLUB_IMAGES.filter(x =>
				find(settings, o => o.level === x.level)
			).map(({ url, displayKey, levelTabsName, level }: IImageData) => (
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
			))}
		</div>
	)
}

export default VipMedal
