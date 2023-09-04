import React from 'react'
import {
	IDepositInfoHistoryData,
	IReferralData,
	IStatementData,
	ITransferHistoryData,
	IWithdrawalInfoHistoryData,
} from '@nx-next-app/service'
import DepositHistoryTable from '@nx-next-app/components/D0001/table/historyTable/DepositHistoryTable'
import WithdrawalHistoryTable from '@nx-next-app/components/D0001/table/historyTable/WithdrawalHistoryTable'
import TransferHistoryTable from '@nx-next-app/components/D0001/table/historyTable/TransferHistoryTable'
import FinancialHistoryTable from '@nx-next-app/components/D0001/table/historyTable/FinancialHistoryTable'
import ReferralHistoryTable from '@nx-next-app/components/D0001/table/historyTable/ReferralHistoryTable'

const useHistoryTable = <T,>({
	dataSource,
	onReload,
	onSubmit,
	onCancel,
}: {
	dataSource: T[]
	onReload?: () => void
	onSubmit?: ({
		transId,
		receipt,
	}: {
		transId: string
		receipt: string
	}) => void
	onCancel?: (transId: string) => void
}) => {
	return {
		TransferHistoryTable: () => (
			<TransferHistoryTable
				dataSource={dataSource as unknown as ITransferHistoryData[]}
				onReload={onReload as () => void}
			/>
		),

		DepositHistoryTable: () => (
			<DepositHistoryTable
				dataSource={dataSource as unknown as IDepositInfoHistoryData[]}
				onReload={onReload as () => void}
				onSubmit={
					onSubmit as ({
						transId,
						receipt,
					}: {
						transId: string
						receipt: string
					}) => void
				}
				onCancel={onCancel as (transId: string) => void}
			/>
		),

		WithdrawalHistoryTable: () => (
			<WithdrawalHistoryTable
				dataSource={dataSource as unknown as IWithdrawalInfoHistoryData[]}
				onReload={onReload as () => void}
				onCancel={onCancel as (transId: string) => void}
			/>
		),

		FinancialHistoryTable: () => (
			<FinancialHistoryTable
				dataSource={dataSource as unknown as IStatementData[]}
				onReload={onReload as () => void}
			/>
		),

		ReferralHistoryTable: () => (
			<ReferralHistoryTable
				dataSource={dataSource as unknown as IReferralData[]}
				onReload={onReload as () => void}
			/>
		),
	}
}

export default useHistoryTable
