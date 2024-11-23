import classNames from 'classnames'
import React, { ButtonHTMLAttributes, ReactNode, useEffect } from 'react'
import { useBoolean } from 'usehooks-ts'

interface ISpinButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode
	timeout?: number
	onSpinChange?: (isSpinning: boolean) => void
}

const SpinButton = ({
	children,
	className = 'icon icon-refresh-fill',
	timeout = 1500,
	onSpinChange,
	...props
}: ISpinButtonProps) => {
	const { value: isSpinning, setTrue, setFalse } = useBoolean(false)

	const handleSpin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation()

		if (isSpinning) return

		setTrue()

		setTimeout(() => {
			setFalse()
		}, timeout)

		props.onClick && props.onClick(e)
	}

	useEffect(() => {
		onSpinChange && onSpinChange(isSpinning)
	}, [isSpinning])
	return (
		<button
			{...props}
			onClick={e => handleSpin(e)}
			className={classNames(className, {
				active: isSpinning,
			})}
		>
			{children}
		</button>
	)
}

export default SpinButton
