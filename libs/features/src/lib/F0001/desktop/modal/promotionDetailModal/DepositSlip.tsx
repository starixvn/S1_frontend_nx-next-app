import { useAuth } from '@nx-next-app/data-access'
import { numberFormat } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'

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
		<>
			<div className='colorInfo'>
				<div>
					<span />
					{t('Label_General_ID')}
				</div>
				<div>
					<span />
					{t('Label_General_Amount')}
				</div>
			</div>
			<div className='depositSlip'>
				<div className='depositSlipList'>
					{refList.map(item => (
						<div key={item.depositId}>
							<div>{item.depositId}</div>

							<div>{numberFormat(item.amount, currencyId)}</div>
						</div>
					))}
				</div>
				<div className='txt-orange'>
					{t('Label_Promotion_Total')}:{' '}
					{numberFormat(depositAmount, currencyId)}
				</div>
			</div>
		</>
	)
}

export default DepositSlip
