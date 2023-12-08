import { useTranslation } from 'next-i18next'
import { numberFormat } from '@nx-next-app/utils'
import { useAuth } from '@nx-next-app/data-access'
import { useWithdrawal } from '@nx-next-app/features/F0002/providers'

const BalanceInfo = () => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { withdrawalBalance } = useWithdrawal()
	const { balance, deduction, availableBalance } = withdrawalBalance

	return (
		<div className='formula'>
			<div>
				<div />
				<div>
					<div>{t('Label_Withdrawal_Balance')}</div>
					<div>
						{t(`Label_General_Currency_${currencyId}`)}
						<span>{numberFormat(balance, currencyId)}</span>
					</div>
				</div>
			</div>
			<div>
				<div>-</div>
				<div>
					<div>{t('Label_Withdrawal_H5Deduction')}</div>
					<div>
						{t(`Label_General_Currency_${currencyId}`)}
						<span>{numberFormat(deduction, currencyId)}</span>
					</div>
				</div>
			</div>
			<div>
				<div>=</div>
				<div>
					<div>{t('Label_Withdrawal_EligibleWithdrawalAmount')}</div>
					<div>
						{t(`Label_General_Currency_${currencyId}`)}
						<span>{numberFormat(availableBalance, currencyId)}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export { BalanceInfo }
