import { useStatement } from '@nx-next-app/operations'
import useTable from '@yashbet-desktop/components/common/table/useTable'

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
