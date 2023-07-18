import { useTranslation } from 'next-i18next'
import { HotEventSwiper } from './HotEventSwiper'

const UpComingMatches = () => {
	const { t } = useTranslation()

	return (
		<>
			<div className='moduleTitle'>{t('Label_General_UpcomingMatches')}</div>
			<HotEventSwiper />
		</>
	)
}

export { UpComingMatches }
