import React from 'react'
import useTable from '@nx-next-app/components/D0006/table/useTable'
import { useStatement } from '@nx-next-app/features/F0006/providers/statement-context'

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
