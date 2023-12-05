import React from 'react'
import classNames from 'classnames'
import { numberFormat } from '@nx-next-app/utils'
import { useAuth } from '@nx-next-app/data-access'
import { useLeaderBoard } from '@nx-next-app/features/F0002/providers/leaderBoard-context'

interface ILeaderBoardRankItemProps {
	item: any
	index: number
	activeTab: number
}

const LeaderBoardRankItem = ({
	item: { custId, wTurnover, rank, userName, status },
	index,
	activeTab,
}: ILeaderBoardRankItemProps) => {
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { LeaderBoardTabsEnum } = useLeaderBoard()

	const getDisplayStatus = (status: number) => {
		if (activeTab === LeaderBoardTabsEnum.Result) {
			return null
		}
		// 日排名隱藏status欄位，等ＰＭ通知再修正回顯示
		return <div>{` `}</div>

		let iconClass = 'icon icon-minus'
		if (status > 0) {
			iconClass = 'icon icon-arrow_drop_up'
		} else if (status < 0) {
			iconClass = 'icon icon-arrow_drop_down'
		}
		return <div className={iconClass} />
	}

	return (
		<li
			key={`leaderboard_item_${custId}_${wTurnover}`}
			className={classNames({ userRank: Boolean(rank) })}
		>
			<div>
				{index < 3 ? (
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/ranking/no${
							index + 1
						}.png`}
						alt='ranking_top_three'
					/>
				) : (
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/ranking/gold.png`}
						alt='ranking_gold'
					/>
				)}
				{`TOP ${rank || index + 1}`}
			</div>
			<div>{userName}</div>
			{getDisplayStatus(status as number)}
			<div>{numberFormat(wTurnover as number, currencyId)}</div>
		</li>
	)
}

export default LeaderBoardRankItem
