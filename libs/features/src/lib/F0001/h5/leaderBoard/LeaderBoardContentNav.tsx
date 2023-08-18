import React from 'react'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useLeaderBoard } from '@nx-next-app/features/F0001/providers/leaderBoard-context'
import LeaderBoardSelect from '@nx-next-app/features/F0001/h5/leaderBoard/LeaderBoardSelect'

const LeaderBoardContentNav = () => {
	const { t } = useTranslation()
	const {
		newPeriodList,
		activeTab,
		activeRankTime,
		activeGameType,
		onRankTimeChange,
		onGameTypeChange,
		onPeriodIdChange,
		LEADER_BOARD_GAME_POINT_NAV,
		LEADER_BOARD_RANK_NAV,
		LeaderBoardTabsEnum,
	} = useLeaderBoard()

	switch (activeTab) {
		case LeaderBoardTabsEnum.Ranking:
			return (
				<div className='filterBtn'>
					{LEADER_BOARD_RANK_NAV.map(({ id, displayKey }) => {
						return (
							<button
								key={`ranking-nav-${id}`}
								className={classNames({ active: activeRankTime === id })}
								onClick={() => onRankTimeChange(id)}
							>
								{t(displayKey)}
							</button>
						)
					})}
				</div>
			)
		case LeaderBoardTabsEnum.GamePoint:
			return (
				<div className='filterBtn'>
					{LEADER_BOARD_GAME_POINT_NAV.map(({ id, displayKey }) => {
						return (
							<button
								key={`ranking-nav-${id}`}
								className={classNames({ active: activeGameType === id })}
								onClick={() => {
									onGameTypeChange(id)
								}}
							>
								{t(displayKey)}
							</button>
						)
					})}
				</div>
			)
		case LeaderBoardTabsEnum.Result:
			return newPeriodList && newPeriodList.length > 0 ? (
				<LeaderBoardSelect
					options={newPeriodList}
					onChange={onPeriodIdChange}
				/>
			) : null
		default:
			return null
	}
}

export default LeaderBoardContentNav
