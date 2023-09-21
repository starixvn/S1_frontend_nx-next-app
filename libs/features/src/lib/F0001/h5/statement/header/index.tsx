import React from 'react'
import StatementTags from '@nx-next-app/features/F0001/h5/statement/header/StatementTags'
import StatementTabs from '@nx-next-app/features/F0001/h5/statement/header/StatementTabs'
import Breadcrumb from '@nx-next-app/components/H0001/breadcrumb'
import { useStatement } from '@nx-next-app/features/F0001/providers/statement-context'

const StatementHeader = () => {
	const { activeTab, breadcrumbs, onTabChange } = useStatement()

	return (
		<header className='header'>
			<StatementTags />
			<StatementTabs />
			<Breadcrumb
				items={breadcrumbs}
				activeItem={activeTab}
				onClick={onTabChange as (value: string | number | null) => void}
			/>
		</header>
	)
}

export default StatementHeader
