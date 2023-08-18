import { paths } from '@nx-next-app/constants'
import LeaderBoardTabs from '@nx-next-app/features/F0001/h5/leaderBoard/LeaderBoardTabs'
import LeaderBoardEventList from '@nx-next-app/features/F0001/h5/leaderBoard/LeaderBoardEvent/LeaderBoardEventList'
import LeaderBoardContent from '@nx-next-app/features/F0001/h5/leaderBoard/LeaderBoardContent'
import { useLeaderBoard } from '@nx-next-app/features/F0001/providers/leaderBoard-context'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const LeaderBoard = () => {
	const { activeTab, LeaderBoardTabsEnum } = useLeaderBoard()
	const { t } = useTranslation()
	const { push } = useRouter()

	return (
		<>
			<header className='header' id='header'>
				<div className='title'>
					<a onClick={() => push(paths.home.root)}>
						<i className='icon icon-keyboard_arrow_left' />
					</a>
					{t('Label_General_LeaderBoard')}
				</div>
				<LeaderBoardTabs />
			</header>
			<main className='main rankingNew'>
				{activeTab === LeaderBoardTabsEnum.Event ? (
					<LeaderBoardEventList />
				) : (
					<LeaderBoardContent />
				)}
			</main>
		</>
	)
}

export default LeaderBoard
