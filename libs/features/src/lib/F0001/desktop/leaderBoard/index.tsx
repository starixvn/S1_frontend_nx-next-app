import LeaderBoardTabs from '@nx-next-app/features/F0001/desktop/leaderBoard/LeaderBoardTabs'
import { useLeaderBoard } from '@nx-next-app/features/F0001/providers/leaderBoard-context'
import LeaderBoardContent from './LeaderBoardContent'
import LeaderBoardEventList from './LeaderBoardEvent/LeaderBoardEventList'

const LeaderBoard = () => {
	const { backgroundImg, activeTab, LeaderBoardTabsEnum } = useLeaderBoard()

	return (
		<main
			className='rankingNew'
			style={{
				backgroundImage: `url(${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/${backgroundImg})`,
			}}
		>
			<section>
				<LeaderBoardTabs />
				{activeTab === LeaderBoardTabsEnum.Event ? (
					<LeaderBoardEventList />
				) : (
					<LeaderBoardContent />
				)}
			</section>
		</main>
	)
}

export default LeaderBoard
