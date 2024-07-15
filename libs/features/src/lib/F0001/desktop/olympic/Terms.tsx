import { useAuth } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'

const Terms = () => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()

	return (
		<>
			<div className='olympic-bottom-title'>{t('Label_Olympic_Terms')}</div>
			<div className='olympic-bottom-tnc'>
				<ul>
					<li>{t('Label_Olympic_Terms_1')}</li>
					<li>{t('Label_Olympic_Terms_2')}</li>
					<li>{t('Label_Olympic_Terms_3')}</li>
					<li>{t(`Label_Olympic_Terms_4_${currencyId}`)}</li>
					<li>{t('Label_Olympic_Terms_5')}</li>
					<li>{t('Label_Olympic_Terms_6')}</li>
					<li>{t('Label_Olympic_Terms_7')}</li>
					<li>{t('Label_Olympic_Terms_8')}</li>
				</ul>
			</div>
		</>
	)
}

export default Terms
