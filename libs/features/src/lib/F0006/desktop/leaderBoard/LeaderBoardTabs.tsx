import { useLeaderBoard } from '@nx-next-app/data-access'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

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
					{t(displayKey).toUpperCase()}
				</button>
			))}
		</div>
	)
}

export default LeaderBoardTabs
