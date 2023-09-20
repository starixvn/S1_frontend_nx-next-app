import React from 'react'
import HistoryFilter from '@nx-next-app/features/F0001/h5/history/header/HistoryFilter'
import HistoryTags from '@nx-next-app/features/F0001/h5/history/header/HistoryTags'
import HistoryTabs from '@nx-next-app/features/F0001/h5/history/header/HistoryTabs'

const HistoryHeader = () => {
	return (
		<header className='header'>
			<HistoryTags />
			<HistoryTabs />
			<HistoryFilter />
		</header>
	)
}

export default HistoryHeader
