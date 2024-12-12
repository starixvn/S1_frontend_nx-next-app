import { useAuth } from '@nx-next-app/data-access'
import { numberFormat } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import React from 'react'

interface IDepositSlipProps {
	depositAmount: number
	refList: {
		depositId: number
		amount: number
	}[]
}

const DepositSlip = ({ depositAmount, refList = [] }: IDepositSlipProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()

	if (!refList || refList.length === 0) return null

	return (
		<div className='custom-table amount-pop' style={{ marginBottom: '1.6rem' }}>
			<div className='custom-table-thead'>
				<div className='custom-th'>{t('Label_General_ID')}</div>
				<div className='custom-th'>{t('Label_General_Amount')}</div>
				<div className='custom-th'>{t('Label_Promotion_Total')}</div>
			</div>
			<div className='custom-table-tbody'>
				<div className='custom-td'>
					{refList.map(item => (
						<React.Fragment key={item.depositId}>
							<div className='td'>{item.depositId}</div>
							<div className='td'>{numberFormat(item.amount, currencyId)}</div>
						</React.Fragment>
					))}
					<div className='td'>
						{t('Label_Promotion_Total')}:{' '}
						{numberFormat(depositAmount, currencyId)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default DepositSlip
