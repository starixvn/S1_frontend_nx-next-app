import { LegacyRef, useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import classNames from 'classnames'
import { timeFormat } from '@nx-next-app/constants'
import { useTranslation } from 'next-i18next'
import { useEuropeCup } from '../../hooks/useEuropeCup'
import Team from './components/Team'

const today = new Date().toDateString()

const Schedule = () => {
	const { t } = useTranslation()
	const {
		schedule: { matches },
	} = useEuropeCup()

	const [selectedDate, setSelectedDate] = useState(
		matches.find(({ time }) => time >= new Date(today))?.time?.toDateString() ??
			today
	)

	const uniqueDates = [
		...new Set(matches.map(({ time }) => time?.toDateString())),
	]

	// Scroll to active date
	const ref: LegacyRef<HTMLDivElement> = useRef(null)
	useEffect(() => {
		const activeButton = ref.current?.querySelector('button.active')
		activeButton?.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
			inline: 'center',
		})
	}, [selectedDate])

	return (
		<div className='euro-fixture active'>
			<div ref={ref} className='euro-match-bar'>
				{uniqueDates.map(date => {
					const dateObj = new Date(date)

					return (
						<button
							key={date}
							className={classNames('euro-match-date', {
								active: date === selectedDate,
							})}
							onClick={() => setSelectedDate(date)}
						>
							<div>{t(`Label_Profile_Month${dateObj.getMonth() + 1}`)}</div>
							<div className='date'>{dayjs(date).format('DD')}</div>
							<div>{t(`Label_General_Weekday${dateObj.getDay()}`)}</div>
						</button>
					)
				})}
			</div>
			<div className='euro-match-list'>
				{matches.map(({ name, time, teams: [host, guest] }) =>
					time.toDateString() === selectedDate ? (
						<div key={name} className='euro-match-item'>
							<div className='euro-match-order'>{name}</div>
							<div>
								<Team {...host} />
								<div className='time'>
									<span>{dayjs(time).tz('Etc/GMT+8').format(timeFormat)}</span>
									(GMT+8)
								</div>
								<Team {...guest} />
							</div>
						</div>
					) : null
				)}
			</div>
		</div>
	)
}

export default Schedule
