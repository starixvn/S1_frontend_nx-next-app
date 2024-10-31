import { useAuth } from '@nx-next-app/data-access'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { useTranslation } from 'next-i18next'

const Affiliate = () => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	const {
		affiliateData: { allowCurrencies, link },
	} = useHome()

	return (
		<div className='home-bottom-aff' style={{ padding: '1vw 0 3vw' }}>
			{/* <a
				className='title'
				style={
					allowCurrencies.includes(currencyId) ? {} : { pointerEvents: 'none' }
				}
				href={link}
				target='_blank'
				rel='noreferrer noopener'
			>
				{t('Label_Affiliate_Program')}
			</a> */}
			<p style={{ margin: '4vw 0 1vw' }}>{t('Label_Cookie_Reminder')}</p>
		</div>
	)
}

export { Affiliate }
