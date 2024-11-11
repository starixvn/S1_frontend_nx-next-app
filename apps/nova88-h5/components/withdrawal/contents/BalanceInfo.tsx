import { useAuth } from '@nx-next-app/data-access'
import { useWithdrawal } from '@nx-next-app/operations'
import { numberFormat } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'

const BalanceInfo = () => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { withdrawalBalance } = useWithdrawal()
	const {
		balance = 0,
		deduction = 0,
		availableBalance = 0,
	} = withdrawalBalance ?? {}

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
