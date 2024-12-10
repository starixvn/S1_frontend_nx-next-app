import { Header, TagOptionType } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { useLeaderBoard } from '@nx-next-app/data-access'
import { WrapperCustomTitleBack } from '@nx-next-app/features/F0001/h5/common/CommonStyles'
import LeaderBoardContent from '@nx-next-app/features/F0001/h5/leaderBoard/LeaderBoardContent'
import LeaderBoardEventList from '@nx-next-app/features/F0001/h5/leaderBoard/LeaderBoardEvent/LeaderBoardEventList'
import { WrapperLeaderBoard } from '@nx-next-app/features/F0001/h5/leaderBoard/styles'
import { useTranslation } from 'next-i18next'

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
				<WrapperCustomTitleBack>
					<Header.Tag
						title={t('Label_General_LeaderBoard') as string}
						back={paths.home.root}
						quickSelect={quickSelect}
						onQuickSelectChange={key => {
							onTabsChange(key as number)
						}}
					/>
				</WrapperCustomTitleBack>
			</Header>
			<WrapperLeaderBoard>
				<main className='main rankingNew'>
					{activeTab === LeaderBoardTabsEnum.Event ? (
						<LeaderBoardEventList />
					) : (
						<LeaderBoardContent />
					)}
				</main>
			</WrapperLeaderBoard>
		</>
	)
}

export default LeaderBoard
