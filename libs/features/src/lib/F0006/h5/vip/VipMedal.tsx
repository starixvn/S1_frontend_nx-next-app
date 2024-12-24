import { useStaticData } from '@nx-next-app/data-access'
import { IF0001VipProgram } from '@nx-next-app/features/F0001/types'
import { find } from 'lodash-es'
import { useTranslation } from 'next-i18next'

interface IVipMedalProps {
	settings: IF0001VipProgram[]
}

const VipMedal = ({ settings }: IVipMedalProps) => {
	const { t } = useTranslation()
	const { VIP_CLUB_IMAGES } = useStaticData()
	return (
		<div className='medal'>
			{VIP_CLUB_IMAGES.filter(x =>
				find(settings, o => o.level === x.level)
			).map(item => (
				<div key={`${item.displayKey}-${item.alt}`}>
					<img src={item.url} alt={item.alt} />
					{t(item.displayKey || '')}
				</div>
			))}
		</div>
	)
}

export default VipMedal
