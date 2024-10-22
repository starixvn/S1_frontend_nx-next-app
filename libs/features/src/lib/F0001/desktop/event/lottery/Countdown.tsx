import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useMemo, useState } from 'react'
import { useInterval } from 'usehooks-ts'

dayjs.extend(duration)

const Countdown = ({ to }: { to: number }) => {
	const diff = useMemo(() => dayjs(to).diff(dayjs()), [to])
	const [count, setCount] = useState(diff)

	useInterval(() => setCount(prev => prev - 1000), count > 0 ? 1000 : null)

	const formatted = dayjs.duration(count).format('DDHHmmss')
	return (
		<div className='time'>
			<div className='number-group'>
				<div className='number'>
					<div>{formatted[0]}</div>
					<div>{formatted[1]}</div>
				</div>
				<div className='unit'>DAYS</div>
			</div>
			<div className='icon time-dots' />
			<div className='number-group'>
				<div className='number'>
					<div>{formatted[2]}</div>
					<div>{formatted[3]}</div>
				</div>
				<div className='unit'>HRS</div>
			</div>
			<div className='icon time-dots' />
			<div className='number-group'>
				<div className='number'>
					<div>{formatted[4]}</div>
					<div>{formatted[5]}</div>
				</div>
				<div className='unit'>MINS</div>
			</div>
			<div className='icon time-dots' />
			<div className='number-group'>
				<div className='number'>
					<div>{formatted[6]}</div>
					<div>{formatted[7]}</div>
				</div>
				<div className='unit'>SECS</div>
			</div>
		</div>
	)
}

export default Countdown
