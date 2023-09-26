import classNames from 'classnames'

interface IDepositShortcutListProps {
	minAmount: number
	maxAmount: number
	shortcut: number
	shortcutList: number[]
	format?: boolean
	onChange?: (value: number) => void
}

const DepositShortcutList = ({
	minAmount,
	maxAmount,
	shortcut,
	shortcutList,
	format = false,
	onChange,
}: IDepositShortcutListProps) => {
	if (shortcutList.length === 0) return null

	// * 當前選項小於最小金額或大於最大金額則禁用
	const isDisabled = (amount: number) =>
		amount < minAmount || amount > maxAmount

	return (
		<div className='btnGroup shortcut'>
			{shortcutList.map(value => {
				const disabled = isDisabled(value)

				return (
					<button
						style={{
							pointerEvents: disabled ? 'none' : 'auto',
						}}
						disabled={disabled}
						className={classNames({ active: value === shortcut })}
						onClick={() => {
							onChange && onChange(value)
						}}
					>
						{format ? `${value} ('000)` : value}
					</button>
				)
			})}
		</div>
	)
}

export default DepositShortcutList
