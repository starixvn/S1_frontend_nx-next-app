import { paths } from '@nx-next-app/constants'
import LeaderBoardEventList from '@nx-next-app/features/F0006/h5/leaderBoard/LeaderBoardEvent/LeaderBoardEventList'
import LeaderBoardContent from '@nx-next-app/features/F0006/h5/leaderBoard/LeaderBoardContent'
import { useLeaderBoard } from '@nx-next-app/features/F0006/providers/leaderBoard-context'
import { useTranslation } from 'next-i18next'
import { Header, TagOptionType } from '@nx-next-app/components/H0001'

const LeaderBoard = () => {
	const { activeTab, LeaderBoardTabsEnum, onTabsChange, LEADER_BOARD_TABS } =
		useLeaderBoard()
	const { t } = useTranslation()

	const quickSelect: TagOptionType[] = LEADER_BOARD_TABS.map(
		({ id, displayKey }) => ({
			key: id,
			label: t(displayKey),
		})
	)

	return (
		<>
			<Header className='header'>
				<Header.Tag
					title={t('Label_General_LeaderBoard') as string}
					back={paths.home.root}
					quickSelect={quickSelect}
					onQuickSelectChange={key => {
						onTabsChange(key as number)
					}}
				/>
			</Header>

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
