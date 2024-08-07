import classNames from 'classnames'
import { uniqueId } from 'lodash-es'
import { numFormatToDigits } from '@nx-next-app/utils'

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
				const formatValue = numFormatToDigits(value, 0)

				return (
					<button
						key={uniqueId()}
						style={{
							pointerEvents: disabled ? 'none' : 'auto',
						}}
						disabled={disabled}
						className={classNames({ active: value === shortcut })}
						onClick={() => {
							onChange && onChange(value)
						}}
					>
						{format ? `${formatValue} ('000)` : formatValue}
					</button>
				)
			})}
		</div>
	)
}

export default DepositShortcutList
