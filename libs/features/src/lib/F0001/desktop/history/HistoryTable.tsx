import { useHistory } from '@nx-next-app/features/F0001/providers/history-context'
import { HistoryTabsEnum } from 'libs/web/src/app/types/history'
import useTable from 'libs/web/src/components/D0001/table/useTable'
import { useTranslation } from 'next-i18next'

const HistoryTable = () => {
	const { activeTab, displayColumns, onSubmit, onReloadSpin, onDepositCancel } =
		useHistory()
	const { t } = useTranslation()
	const {
		TransferHistoryTable,
		DepositHistoryTable,
		WithdrawalHistoryTable,
		FinancialHistoryTable,
		ReferralHistoryTable,
	} = useTable({
		dataSource: displayColumns,
		onSubmit,
		onCancel: onDepositCancel,
		onReload: onReloadSpin,
	})

	if (displayColumns.length === 0) {
		return (
			<div className='custom-nodata'>
				<i className='icon icon-file-damage-fill' />
				<div>{t('Label_General_NoData')}</div>
			</div>
		)
	}

	switch (activeTab) {
		case HistoryTabsEnum.Transfer:
			return <TransferHistoryTable />
		case HistoryTabsEnum.Deposit:
			return <DepositHistoryTable />
		case HistoryTabsEnum.Withdrawal:
			return <WithdrawalHistoryTable />
		case HistoryTabsEnum.Financial:
			return <FinancialHistoryTable />
		case HistoryTabsEnum.Referral:
			return <ReferralHistoryTable />
		default:
			return null
	}
}

export default HistoryTable
