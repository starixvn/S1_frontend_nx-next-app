import { useTranslation } from 'next-i18next'

interface ILeaderBoardSection2Props {
	rank: string
	point: string
	bonus: string
	index: number
}
const LeaderBoardSection2 = ({
	rank,
	point,
	bonus,
	index,
}: ILeaderBoardSection2Props) => {
	const { t } = useTranslation()
	const getRankName = () => {
		if (Number(index) === 0) {
			return t('Label_LeaderBoard_RankChampion')
		}
		if (Number(index) === 8) {
			return t('Label_LeaderBoard_Rank9_30')
		}
		return t(`Label_LeaderBoard_Rank${index}`)
	}

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
				{getRankName()}
			</div>
			<div>{point}</div>
			<div>{bonus}</div>
		</li>
	)
}

export default LeaderBoardSection2
