import { useTranslation } from 'next-i18next'

interface ILeaderBoardSection1Props {
	sportTurnover: number | null
	slotTurnover: number | null
	liveCasinoTurnover: number | null
}

const baseURL = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/ranking/`

const point = 1

const LeaderBoardSection1 = ({
	sportTurnover,
	slotTurnover,
	liveCasinoTurnover,
}: ILeaderBoardSection1Props) => {
	const { t } = useTranslation()

	const items = [
		{
			img: 'ball.png',
			label: t('Label_General_Sports'),
			displayName: t('Label_General_Sports'),
			turnover: sportTurnover,
		},
		{
			img: 'slot.png',
			label: t('Label_General_Slots'),
			displayName: t('Label_General_Slots'),
			turnover: slotTurnover,
		},
		{
			img: 'casino.png',
			label: t('Label_General_LiveCasino'),
			displayName: t('Label_General_LiveCasino'),
			turnover: liveCasinoTurnover,
		},
	]

	return (
		<>
			{items.map(item => (
				<li key={item.label}>
					<div>
						<img src={baseURL + item.img} alt={item.label} />
						{item.displayName.toUpperCase()}
					</div>
					<div>{item.turnover}</div>
					<div>{point}</div>
				</li>
			))}
		</>
	)
}

export default LeaderBoardSection1
