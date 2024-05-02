import { useState } from 'react'
import dayjs from 'dayjs'
import classNames from 'classnames'
import { CURRENCY_TO_TIMEZONE, timeFormat } from '@nx-next-app/constants'
import { ITeamData } from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { UseEuropeCupProps } from '../../hooks/useEuropeCup'
import Team from './components/Team'

interface IScheduleProps {
	europeCupProps: UseEuropeCupProps
}

const Schedule = ({ europeCupProps }: IScheduleProps) => {
	const { t } = useTranslation()

	const {
		schedule: { matches },
	} = europeCupProps

	const {
		userInfo: { currencyId },
	} = useAuth()

	const today = dayjs().utcOffset(CURRENCY_TO_TIMEZONE[currencyId]).format('L')

	const [selectedDate, setSelectedDate] = useState(() => {
		const nearestMatch = matches.find(
			({ time }) => dayjs(time).unix() >= dayjs(today).unix()
		)
		return nearestMatch
			? dayjs(nearestMatch.time)
					.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
					.format('L')
			: today
	})

	const matchDates = matches.reduce(
		(acc, { name, time, teams }) => {
			const date = dayjs(time)
				.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
				.format('L')
			if (!acc[date]) {
				acc[date] = []
			}
			acc[date].push({ name, time, teams })
			return acc
		},
		{} as Record<
			string,
			{
				name: string
				time: string
				teams: ITeamData[]
			}[]
		>
	)

	return (
		<div className='euro-fixture active'>
			<div className='euro-match-bar'>
				{Object.keys(matchDates)?.map(date => (
					<button
						key={date}
						ref={node => {
							if (node && date === selectedDate) {
								node.scrollIntoView({
									behavior: 'smooth',
									block: 'nearest',
									inline: 'center',
								})
							}
						}}
						className={classNames('euro-match-date', {
							active: date === selectedDate,
						})}
						onClick={() => setSelectedDate(date)}
					>
						<div>{t(`Label_Profile_Month${dayjs(date).format('M')}`)}</div>
						<div className='date'>{dayjs(date).format('DD')}</div>
						<div>{t(`Label_General_Weekday${dayjs(date).format('d')}`)}</div>
					</button>
				))}
			</div>
			<div className='euro-match-list'>
				{matchDates[selectedDate]?.map(
					({ name, time, teams: [host, guest] }) => (
						<div key={name} className='euro-match-item'>
							<div className='euro-match-order'>{name}</div>
							<div>
								<Team {...host} />
								<div className='time'>
									<span>
										{dayjs(time)
											.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
											.format(timeFormat)}
									</span>
									(GMT
									{dayjs(time)
										.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
										.format('Z')}
									)
								</div>
								<Team {...guest} />
							</div>
						</div>
					)
				)}
			</div>
		</div>
	)
}

export default Schedule
