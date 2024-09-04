import useTable from '@12b-desktop/components/common/table/useTable'
import { useStatement } from '@nx-next-app/operations'

const StatementTable = () => {
	const { activeTab, displayColumns, onDetails } = useStatement()
	const {
		DateRangeStatementTable,
		ByDayStatementTable,
		ByCategoryStatementTable,
		ByDetailStatementTable,
	} = useTable({
		dataSource: displayColumns,
		onDetails,
	})

	switch (activeTab) {
		case '':
			return <DateRangeStatementTable />

		case 'byDay':
			return <ByDayStatementTable />

		case 'byCategory':
			return <ByCategoryStatementTable />

		case 'byDetail':
			return <ByDetailStatementTable />

		default:
			return null
	}
}

export default StatementTable
