import useTable from '@12b-desktop/components/common/table/useTable'
import { HistoryTabsEnum, useHistory } from '@nx-next-app/operations'
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
			<div className='nodata icon icon-nodata'>
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
