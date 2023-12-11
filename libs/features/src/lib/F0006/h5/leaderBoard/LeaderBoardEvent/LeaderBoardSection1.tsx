import React from 'react'
import { useTranslation } from 'next-i18next'

interface ILeaderBoardSection1Props {
	item: {
		turnover: string
		point: string
		displayName: string
		img: string
	}
}

const LeaderBoardSection1 = ({
	item: { turnover, point, displayName, img },
}: ILeaderBoardSection1Props) => {
	const { t } = useTranslation()

	return (
		<li key={`leaderBoard-event-${img}`}>
			<div>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/ranking/${img}.png`}
					alt={img}
				/>
				{t(displayName).toUpperCase()}
			</div>
			<div>{turnover}</div>
			<div>{point}</div>
		</li>
	)
}

export default LeaderBoardSection1
