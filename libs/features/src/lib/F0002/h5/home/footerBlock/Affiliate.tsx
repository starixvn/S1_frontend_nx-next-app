import { useTranslation } from 'next-i18next'
import { useHome } from '@nx-next-app/features/F0002/providers'
import { useAuth } from '@nx-next-app/data-access'

const Affiliate = () => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	const {
		affiliateData: { allowCurrencies, link },
	} = useHome()

	return (
		<div className='aff'>
			<a
				className='title'
				style={
					allowCurrencies.includes(currencyId) ? {} : { pointerEvents: 'none' }
				}
				href={link}
				target='_blank'
				rel='noreferrer noopener'
			>
				{t('Label_Affiliate_Program')}
			</a>
			<p>{t('Label_Cookie_Reminder')}</p>
		</div>
	)
}

export { Affiliate }
