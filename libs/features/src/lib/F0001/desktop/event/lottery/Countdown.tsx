import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

dayjs.extend(duration)

const Countdown = ({ to }: { to: number }) => {
	const { t } = useTranslation()
	const [count, setCount] = useState(0)

	useEffect(() => {
		const millisecondsLeft = dayjs(to).diff(dayjs())
		if (millisecondsLeft >= 0) {
			const timer = setTimeout(() => setCount(millisecondsLeft), 1000)
			return () => clearTimeout(timer)
		}

		return undefined
	}, [count])

	const formatted = dayjs.duration(count).format('DDHHmmss')

	return count ? (
		<div className='time'>
			<div className='number-group'>
				<div className='number'>
					<div>{formatted[0]}</div>
					<div>{formatted[1]}</div>
				</div>
				<div className='unit' style={{ textTransform: 'uppercase' }}>
					{t('Label_General_Days')}
				</div>
			</div>
			<div className='icon time-dots' />
			<div className='number-group'>
				<div className='number'>
					<div>{formatted[2]}</div>
					<div>{formatted[3]}</div>
				</div>
				<div className='unit' style={{ textTransform: 'uppercase' }}>
					{t('Label_General_Hrs')}
				</div>
			</div>
			<div className='icon time-dots' />
			<div className='number-group'>
				<div className='number'>
					<div>{formatted[4]}</div>
					<div>{formatted[5]}</div>
				</div>
				<div className='unit' style={{ textTransform: 'uppercase' }}>
					{t('Label_General_Mins')}
				</div>
			</div>
			<div className='icon time-dots' />
			<div className='number-group'>
				<div className='number'>
					<div>{formatted[6]}</div>
					<div>{formatted[7]}</div>
				</div>
				<div className='unit' style={{ textTransform: 'uppercase' }}>
					{t('Label_General_Secs')}
				</div>
			</div>
		</div>
	) : null
}

export default Countdown
