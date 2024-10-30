import { useAuth } from '@nx-next-app/data-access'
import { IFooterData } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'

interface IPaymentMethodProps {
	paymentMethodsByCurrencyId: IFooterData['paymentMethodsByCurrencyId']
}

const PaymentMethod = ({
	paymentMethodsByCurrencyId = [],
}: IPaymentMethodProps) => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { t } = useTranslation()

	const paymentMethods = paymentMethodsByCurrencyId[currencyId]

	if (!paymentMethods || paymentMethods.length === 0) {
		return null
	}
	return (
		<div className='footer-center-item payment'>
			<div className='footer-center-title'>{t('Label_Payment_Method')}</div>
			<div className='footer-icon'>
				{paymentMethods.map(({ name, img }) => (
					<a role='link' aria-hidden key={name}>
						<img src={img} alt={name} />
					</a>
				))}
			</div>
		</div>
	)
}

export default PaymentMethod
