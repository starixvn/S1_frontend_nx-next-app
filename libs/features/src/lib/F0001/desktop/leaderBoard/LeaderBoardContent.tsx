import { useTranslation } from 'next-i18next'
import { useLeaderBoard } from '@nx-next-app/data-access'
import { Loading } from '@nx-next-app/components/D0001'
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
						<div className='icon icon-nodata'>{t('Label_General_NoData')}</div>
					)
				)}

				{rankList.length > 0 && (
					<LeaderBoardRankList rankList={rankList} activeTab={activeTab} />
				)}

				{!(activeTab === LeaderBoardTabsEnum.Result) && (
					<>
						<div className='lastUpdate'>
							{t(`Label_LeaderBoard_LastUpdTime`, {
								time: getFormattedUpdateTime(),
							})}
						</div>
						<div
							className='lastUpdate'
							style={{ color: '#fab617', fontWeight: 600 }}
						>
							{t(`Label_LeaderBoard_Ranking_EndDate`, {
								time: `${formattedEndTime} GMT+8`,
							})}
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default LeaderBoardContent
