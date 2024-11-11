import { SpinButton } from '@nx-next-app/components/D0001'
import { useAuth } from '@nx-next-app/data-access'
import { useWithdrawal } from '@nx-next-app/operations'
import { numberFormat } from '@nx-next-app/utils'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useBoolean } from 'usehooks-ts'

const WalletInfo = () => {
	const { t } = useTranslation()
	const {
		userInfo: { accountName, currencyId },
	} = useAuth()
	const { withdrawalBalance, refetchWithdrawalBalance } = useWithdrawal()

	const { availableBalance = 0 } = withdrawalBalance ?? {}

	const { value: showTips, toggle: toggleTips } = useBoolean(false)

	return (
		<div className='walletModule'>
			<div className='walletBalanceModule'>
				<span className='icon icon-balance'>
					{t('Label_Withdrawal_BankAccountName')}
				</span>
				<span>{accountName ?? ''}</span>
				<button className='icon icon-information' onClick={toggleTips} />
				<div className={classNames('tip', { active: showTips })}>
					{/* 如果沒這樣寫，active 動畫互動時會跑版 */}
					{showTips && t('Label_Withdrawal_BankAccountHint')}
				</div>
			</div>
			<div className='walletBalanceModule'>
				<span className='icon icon-balance'>
					{t('Label_Withdrawal_EligibleWithdrawalAmount')}
				</span>
				<span>{numberFormat(availableBalance, currencyId)}</span>
				<SpinButton onClick={refetchWithdrawalBalance} />
			</div>
		</div>
	)
}

export { WalletInfo }
