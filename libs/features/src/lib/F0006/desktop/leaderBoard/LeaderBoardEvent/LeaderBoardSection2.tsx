import React from 'react'
import { useTranslation } from 'next-i18next'

interface ILeaderBoardSection2Props {
	item: { rank: string; point: string; bonus: string }
	index: number
}

const LeaderBoardSection2 = ({
	item: { rank, point, bonus },
	index,
}: ILeaderBoardSection2Props) => {
	const { t } = useTranslation()

	return (
		<li key={`leaderBoard-event-${rank}`}>
			<div>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/ranking/${
						// 前三名樣式不同
						index + 1 < 4 ? `no${index + 1}` : 'gold'
					}.png`}
					alt='top_ranking'
				/>
				{t(rank)}
			</div>
			<div>{point}</div>
			<div>{bonus}</div>
		</li>
	)
}

export default LeaderBoardSection2
