import { useTranslation } from 'next-i18next'

export const UpComingMatches = () => {
	const { t } = useTranslation()
	return (
		<div>
			<div className='moduleTitle'>{t('Label_General_UpcomingMatches')}</div>
		</div>
	)
}
