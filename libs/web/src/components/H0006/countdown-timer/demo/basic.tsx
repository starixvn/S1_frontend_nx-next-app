import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { CountdownTimer } from '..'

const SampleCountdownTimer = () => {
	const [timer, setTimer] = useState(false)

	//* 設定倒數時長
	const startUnixTime = dayjs().add(5, 'minute').unix()

	useEffect(() => {
		setTimer(true)
	}, [])

	return (
		<div>
			<CountdownTimer
				timer={timer}
				startUnixTime={startUnixTime}
				setTimer={setTimer}
			/>
		</div>
	)
}

export { SampleCountdownTimer }
