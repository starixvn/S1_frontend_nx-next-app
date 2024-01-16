import React from 'react'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { useLeaderBoard } from '@nx-next-app/data-access'

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

const LeaderBoardTabs = () => {
	const { t } = useTranslation()
	const { activeTab, onTabsChange, LEADER_BOARD_TABS } = useLeaderBoard()

	return (
		<div className='btnGroup'>
			{LEADER_BOARD_TABS?.map(({ id, displayKey }) => (
				<button
					key={`leaderBoard-${id}`}
					className={classNames({ active: id === activeTab })}
					onClick={() => onTabsChange(id, <LoginModal />)}
				>
					{t(displayKey)}
				</button>
			))}
		</div>
	)
}

export default LeaderBoardTabs
