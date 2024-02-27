import React from 'react'
import {
	ICustTpBetRecordDetailListbyGameTypeData,
	ICustTpBetRecordListbyCategoryIdData,
	ICustTpBetRecordListDateRangeData,
	ICustTpBetRecordListOneDayData,
	IDepositInfoHistoryData,
	IReferralData,
	IStatementData,
	ITransferHistoryData,
	IWithdrawalInfoHistoryData,
} from '@nx-next-app/service'
import DepositHistoryTable from '@nx-next-app/components/D0006/table/historyTable/DepositHistoryTable'
import WithdrawalHistoryTable from '@nx-next-app/components/D0006/table/historyTable/WithdrawalHistoryTable'
import TransferHistoryTable from '@nx-next-app/components/D0006/table/historyTable/TransferHistoryTable'
import FinancialHistoryTable from '@nx-next-app/components/D0006/table/historyTable/FinancialHistoryTable'
import ReferralHistoryTable from '@nx-next-app/components/D0006/table/historyTable/ReferralHistoryTable'
import DateRangeStatementTable from '@nx-next-app/components/D0006/table/statementTable/DateRangeStatementTable'
import ByDayStatementTable from '@nx-next-app/components/D0006/table/statementTable/ByDayStatementTable'
import ByCategoryStatementTable from '@nx-next-app/components/D0006/table/statementTable/ByCategoryStatementTable'
import ByDetailStatementTable from '@nx-next-app/components/D0006/table/statementTable/ByDetailStatementTable'

const useTable = <T,>({
	dataSource,
	onReload,
	onSubmit,
	onCancel,
	onDetails,
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
	onDetails?: ({
		targetTab,
		selDate,
		categoryId,
		gameTypeId,
		pageNumber,
	}: {
		targetTab: string
		selDate: string
		categoryId?: number
		gameTypeId?: number
		pageNumber?: number
	}) => void
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
						transId?: string
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

		DateRangeStatementTable: () => (
			<DateRangeStatementTable
				dataSource={
					dataSource as unknown as ICustTpBetRecordListDateRangeData[]
				}
				targetTab='byDay'
				onDetails={
					onDetails as ({
						targetTab,
						selDate,
						categoryId,
						gameTypeId,
						pageNumber,
					}: {
						targetTab: string
						selDate: string
						categoryId?: number
						gameTypeId?: number
						pageNumber?: number
					}) => void
				}
			/>
		),

		ByDayStatementTable: () => (
			<ByDayStatementTable
				dataSource={dataSource as unknown as ICustTpBetRecordListOneDayData[]}
				targetTab='byCategory'
				onDetails={
					onDetails as ({
						targetTab,
						selDate,
						categoryId,
						gameTypeId,
						pageNumber,
					}: {
						targetTab: string
						selDate: string
						categoryId?: number
						gameTypeId?: number
						pageNumber?: number
					}) => void
				}
			/>
		),

		ByCategoryStatementTable: () => (
			<ByCategoryStatementTable
				dataSource={
					dataSource as unknown as ICustTpBetRecordListbyCategoryIdData[]
				}
				targetTab='byDetail'
				onDetails={
					onDetails as ({
						targetTab,
						selDate,
						categoryId,
						gameTypeId,
						pageNumber,
					}: {
						targetTab: string
						selDate: string
						categoryId?: number
						gameTypeId?: number
						pageNumber?: number
					}) => void
				}
			/>
		),

		ByDetailStatementTable: () => (
			<ByDetailStatementTable
				dataSource={
					dataSource as unknown as ICustTpBetRecordDetailListbyGameTypeData[]
				}
			/>
		),
	}
}

export default useTable
