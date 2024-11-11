import DepositHistoryTable from '@n88-desktop/components/common/table/historyTable/DepositHistoryTable'
import FinancialHistoryTable from '@n88-desktop/components/common/table/historyTable/FinancialHistoryTable'
import ReferralHistoryTable from '@n88-desktop/components/common/table/historyTable/ReferralHistoryTable'
import TransferHistoryTable from '@n88-desktop/components/common/table/historyTable/TransferHistoryTable'
import ByCategoryStatementTable from '@n88-desktop/components/common/table/statementTable/ByCategoryStatementTable'
import ByDayStatementTable from '@n88-desktop/components/common/table/statementTable/ByDayStatementTable'
import ByDetailStatementTable from '@n88-desktop/components/common/table/statementTable/ByDetailStatementTable'
import DateRangeStatementTable from '@n88-desktop/components/common/table/statementTable/DateRangeStatementTable'
import WithdrawalHistoryTable from '@nx-next-app/components/D0001/table/historyTable/WithdrawalHistoryTable'
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

export interface IUseTableProps<T> {
	dataSource: T[]
	onReload?: () => void
	onSubmit?: ({
		transId,
		receipt,
	}: {
		transId?: string
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
}

const useTable = <T,>({
	dataSource,
	onReload,
	onSubmit,
	onCancel,
	onDetails,
}: IUseTableProps<T>) => {
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
				onSubmit={onSubmit}
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
