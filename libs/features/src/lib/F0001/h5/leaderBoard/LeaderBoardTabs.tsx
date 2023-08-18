import React from 'react'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useLeaderBoard } from '@nx-next-app/features/F0001/providers/leaderBoard-context'

const LeaderBoardTabs = () => {
	const { t } = useTranslation()
	const { activeTab, onTabsChange, LEADER_BOARD_TABS } = useLeaderBoard()

	return (
		<div className='quickSelect'>
			{LEADER_BOARD_TABS?.map(({ id, displayKey }) => (
				<button
					key={`leaderBoard-${id}`}
					className={classNames({ active: id === activeTab })}
					onClick={() => onTabsChange(id)}
				>
					{t(displayKey)}
				</button>
			))}
		</div>
	)
}

export default LeaderBoardTabs
