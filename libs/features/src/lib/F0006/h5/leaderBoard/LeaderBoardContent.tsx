import React from 'react'
import { useTranslation } from 'next-i18next'
import { useLeaderBoard } from '@nx-next-app/features/F0006/providers'
import LeaderBoardContentNav from './LeaderBoardContentNav'
import LeaderBoardRankList from './LeaderBoardRanks/LeaderBoardRankList'

const LeaderBoardContent = () => {
	const { t } = useTranslation()
	const {
		rankList,
		activeTab,
		formattedEndTime,
		LeaderBoardTabsEnum,
		LEADER_BOARD_TABS,
		getFormattedUpdateTime,
	} = useLeaderBoard()

	return (
		<div className='rankEvent active'>
			<div className='text-blue'>
				{t(
					LEADER_BOARD_TABS.find(({ id }) => activeTab === id)?.displayKey ?? ''
				)}
			</div>
			<LeaderBoardContentNav />
			<div className='rankModule'>
				{rankList && rankList.length > 0 ? (
					<LeaderBoardRankList rankList={rankList} activeTab={activeTab} />
				) : (
					<div className='icon icon-nodata'>{t('Label_General_NoData')}</div>
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
