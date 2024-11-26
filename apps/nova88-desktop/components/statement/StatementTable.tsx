// todo:待 eddie 把 useTable 合進 dev 後使用他的
import useTable from '@nx-next-app/components/D0001/table/useTable'
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
