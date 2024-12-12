import { Loading } from '@nx-next-app/components/D0001'
import { useLeaderBoard } from '@nx-next-app/data-access'
import { NoData } from '@nx-next-app/features/F0001/desktop/common/NoData'
import { useTranslation } from 'next-i18next'
import LeaderBoardContentNav from './LeaderBoardContentNav'
import LeaderBoardRankList from './LeaderBoardRanks/LeaderBoardRankList'

const LeaderBoardContent = () => {
	const { t } = useTranslation()
	const {
		loading,
		activeTab,
		rankList,
		getFormattedUpdateTime,
		formattedEndTime,
		LeaderBoardTabsEnum,
	} = useLeaderBoard()

	return (
		<div
			className={
				activeTab === LeaderBoardTabsEnum.GamePoint
					? 'champion active'
					: 'lastevent active'
			}
		>
			<LeaderBoardContentNav />
			<div className='rankModule'>
				{loading ? (
					<Loading />
				) : (
					rankList.length === 0 && (
						<div style={{ marginTop: '1.6rem' }}>
							<NoData />
						</div>
					)
				)}

				{rankList.length > 0 && (
					<LeaderBoardRankList rankList={rankList} activeTab={activeTab} />
				)}

				{!(activeTab === LeaderBoardTabsEnum.Result) && (
					<div className='lastUpdate'>
						<div>
							{t(`Label_LeaderBoard_LastUpdTime`, {
								time: getFormattedUpdateTime(),
							})}
						</div>
						<div>
							{t(`Label_LeaderBoard_Ranking_EndDate`, {
								time: `${formattedEndTime} GMT+8`,
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default LeaderBoardContent
