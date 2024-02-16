import { useStaticData } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'

const VipMedal = () => {
	const { t } = useTranslation()
	const { VIP_CLUB_IMAGES } = useStaticData()
	return (
		<div className='medal'>
			{VIP_CLUB_IMAGES.map(item => (
				<div key={`${item.displayKey}-${item.alt}`}>
					<img src={item.url} alt={item.alt} />
					{t(item.displayKey || '')}
				</div>
			))}
		</div>
	)
}

export default VipMedal
