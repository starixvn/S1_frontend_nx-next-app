import { useLeaderBoard } from '@nx-next-app/data-access'
import LeaderBoardTabs from '@nx-next-app/features/F0001/desktop/leaderBoard/LeaderBoardTabs'
import { WrapperLeaderBoardPage } from '@nx-next-app/features/F0001/desktop/leaderBoard/styles'
import LeaderBoardContent from './LeaderBoardContent'
import LeaderBoardEventList from './LeaderBoardEvent/LeaderBoardEventList'

const LeaderBoard = () => {
	const { backgroundImg, activeTab, LeaderBoardTabsEnum } = useLeaderBoard()

	return (
		<WrapperLeaderBoardPage>
			<main className='rankingNew'>
				<section>
					<LeaderBoardTabs />
					{activeTab === LeaderBoardTabsEnum.Event ? (
						<LeaderBoardEventList />
					) : (
						<LeaderBoardContent />
					)}
				</section>
			</main>
		</WrapperLeaderBoardPage>
	)
}

export default LeaderBoard
