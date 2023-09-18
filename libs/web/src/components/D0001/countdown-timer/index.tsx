import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const CountdownTimer = ({
	timer,
	className,
	startUnixTime,
	setTimer,
}: {
	timer: boolean
	className?: string
	startUnixTime?: number
	setTimer: (state: boolean) => void
}) => {
	let initTime = 0
	if (startUnixTime) {
		initTime = startUnixTime + 300 - dayjs().unix()
	}

	const [remainingTime, setRemainingTime] = useState<number>(initTime)

	if (remainingTime <= 0) {
		setTimer(false)
	}

	useEffect(() => {
		const interval = setInterval(() => {
			if (timer && remainingTime > 0) {
				setRemainingTime(prevTime => prevTime - 1)
			}
		}, 1000)

		return () => {
			clearInterval(interval)
			setTimer(false)
		}
	}, [startUnixTime, timer])

	const formatTime = dayjs.unix(remainingTime).format('mm:ss')

	return <div className={className ?? 'txt-blue2'}>( {formatTime} )</div>
}

export { CountdownTimer }
