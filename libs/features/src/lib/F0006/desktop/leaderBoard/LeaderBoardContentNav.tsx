import React from 'react'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { find } from 'lodash-es'
import { Select } from '@nx-next-app/components/D0006'
import { useLeaderBoard } from '@nx-next-app/features/F0006/providers/leaderBoard-context'

const LeaderBoardContentNav = () => {
	const { t } = useTranslation()
	const {
		newPeriodList,
		activeTab,
		activeRankTime,
		activeGameType,
		activePeriodId,
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
				<div className='rankTag'>
					<div>{t('Label_LeaderBoard_Tournament')}</div>
					<div className='btnGroup'>
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
				</div>
			)
		case LeaderBoardTabsEnum.GamePoint:
			return (
				<div className='rankTag'>
					<div className='btnGroup'>
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
				</div>
			)
		case LeaderBoardTabsEnum.Result:
			return newPeriodList && newPeriodList.length > 0 ? (
				<div className='rankTag'>
					<div>{t('Label_LeaderBoard_Month')}</div>
					<Select
						value={find(newPeriodList, { value: activePeriodId })?.value ?? ''}
						options={newPeriodList}
						onChange={e => onPeriodIdChange(e as string)}
					/>
				</div>
			) : null
		default:
			return null
	}
}

export default LeaderBoardContentNav
