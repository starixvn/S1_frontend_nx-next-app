import useTable from '@n88-desktop/components/common/table/useTable'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useHistory } from '@nx-next-app/operations'
import { HistoryTabsEnum } from 'libs/web/src/app/types/history'
import { useTranslation } from 'next-i18next'

const HistoryTable = () => {
	const {
		activeTab,
		displayColumns,
		onSubmit: onHistorySubmit,
		onReloadSpin,
		onDepositCancel,
	} = useHistory()
	const { t } = useTranslation()
	const { modal, closeModal } = useGlobalModal()

	const {
		TransferHistoryTable,
		DepositHistoryTable,
		WithdrawalHistoryTable,
		FinancialHistoryTable,
		ReferralHistoryTable,
	} = useTable({
		dataSource: displayColumns,
		onSubmit: ({ transId, receipt }) => {
			onHistorySubmit({
				transId,
				receipt,
				errorCallback: modal.error,
				successCallback: () => closeModal(),
			})
		},
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
