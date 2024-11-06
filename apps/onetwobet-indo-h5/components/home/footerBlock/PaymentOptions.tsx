import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { paymentOptions } from '@nx-next-app/site/onetwobet-indo'
import { useTranslation } from 'next-i18next'

const PaymentOptions = () => {
	const { t } = useTranslation()
	const { getBannerUrl } = useGlobalData()
	const {
		userInfo: { currencyId },
	} = useAuth()

	const paymentData = paymentOptions[currencyId]

	return (
		<div className='payment'>
			<div className='title'>{t('Label_Payment_Options').toUpperCase()}</div>
			<div className='content'>
				{paymentData.map(url => (
					<div className='payment-options' key={url}>
						<img src={getBannerUrl(url)} alt='' />
					</div>
				))}
			</div>
		</div>
	)
}

export default PaymentOptions
