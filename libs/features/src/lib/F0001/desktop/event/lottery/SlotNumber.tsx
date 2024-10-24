/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react'

interface AnimatedSlotNumberProps {
	numberString: string
	onNumberChange?: (ticketNumber: string) => void
	onFinish?: (ticketNumber: string) => void
	interval?: number
}

const AnimatedSlotNumber = ({
	numberString,
	onNumberChange,
	onFinish,
	interval = 2000,
}: AnimatedSlotNumberProps) => {
	const [numberOfDigitsDisplayed, setNumberOfDigitsDisplayed] = useState(0)
	const digits = numberString.split('')
	const [randomNumber, setRandomNumber] = useState('0'.repeat(digits.length))

	useEffect(() => {
		if (numberOfDigitsDisplayed >= digits.length) {
			return
		}
		const timer = setTimeout(
			() =>
				setRandomNumber(
					Math.floor(Math.random() * 10 ** digits.length)
						.toString()
						.padStart(digits.length, '0')
				),
			100
		)
		return () => clearTimeout(timer)
	}, [randomNumber])

	useEffect(() => {
		if (numberOfDigitsDisplayed >= digits.length) {
			onFinish?.(numberString)
			return
		}
		const timer = setTimeout(() => {
			setNumberOfDigitsDisplayed(prev => prev + 1)
			onNumberChange?.(
				numberString.slice(digits.length - 1 - numberOfDigitsDisplayed)
			)
		}, interval)
		return () => clearTimeout(timer)
	}, [numberOfDigitsDisplayed])

	return (
		<>
			{digits.map((digit, i) =>
				i > digits.length - 1 - numberOfDigitsDisplayed ? (
					<span key={i} className='announced'>
						{digit}
					</span>
				) : (
					<span key={i} className='default'>
						{randomNumber[i]}
					</span>
				)
			)}
		</>
	)
}

interface SlotNumberProps extends AnimatedSlotNumberProps {
	isAnimated?: boolean
	isRevealed?: boolean
	isWinning?: boolean
}

const SlotNumber = ({
	numberString,
	onNumberChange,
	onFinish,
	isWinning = false,
	isAnimated = false,
	isRevealed = false,
	interval,
}: SlotNumberProps) => {
	if (isAnimated) {
		return (
			<AnimatedSlotNumber
				numberString={numberString}
				onNumberChange={onNumberChange}
				onFinish={onFinish}
				interval={interval}
			/>
		)
	}

	if (isRevealed) {
		if (isWinning) {
			return <span className='winning'>{numberString}</span>
		}
		return <span className='announced'>{numberString}</span>
	}

	return <span className='default'>{'0'.repeat(numberString.length)}</span>
}

export default SlotNumber
