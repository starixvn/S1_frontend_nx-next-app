import classNames from 'classnames'
import React, { ButtonHTMLAttributes } from 'react'
import { useBoolean } from 'usehooks-ts'

interface ISpinButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean
}

const SpinButton = ({ className, ...props }: ISpinButtonProps) => {
	const { value: isSpinning, setTrue, setFalse } = useBoolean(false)

	const handleSpin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation()
		setTrue()
		if (!isSpinning) {
			props.onClick && props.onClick(e)
		}
		setTimeout(() => {
			setFalse()
		}, 1500)
	}

	return (
		<button
			{...props}
			onClick={e => {
				handleSpin(e)
			}}
			className={classNames(className, 'icon icon-spinner11', {
				active: isSpinning,
			})}
		/>
	)
}

export default SpinButton
