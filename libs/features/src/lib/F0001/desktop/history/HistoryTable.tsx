import React from 'react'
import { useHistory } from '@nx-next-app/features/F0001/providers/history-context'
import useHistoryTable from '@nx-next-app/components/D0001/table/useHistoryTable'
import { HistoryTabsEnum } from 'libs/web/src/app/types/history'
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
	} = useHistoryTable({
		dataSource: displayColumns,
		onSubmit,
		onCancel: onDepositCancel,
		onReload: onReloadSpin,
	})

	if (displayColumns.length === 0) {
		return (
			<div className='nodata icon icon-nodata'>
				<div>{t('Label_General_Nodata')}</div>
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
