import { ReactNode, useEffect, useRef, useState } from 'react'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'
import { find, uniqueId } from 'lodash'
import classNames from 'classnames'
import { SelectOptionType } from './type'

export interface ISelectProps {
	defaultValue?: string | number
	options: SelectOptionType[]
	prefixIcon?: ReactNode
	placeholder?: string
	onChange?: (value: SelectOptionType['value']) => void
}

const Select = (props: ISelectProps) => {
	const ref = useRef(null)
	const {
		defaultValue,
		options,
		prefixIcon,
		placeholder = 'select',
		onChange,
	} = props
	const { value: isActive, toggle, setFalse } = useBoolean()
	const [currentOption, setCurrentOption] = useState<SelectOptionType>()

	const handleOptionClick = (newOption: SelectOptionType) => {
		setCurrentOption(newOption)
		setFalse()

		if (onChange) {
			onChange(currentOption?.value)
		}
	}

	useOnClickOutside(ref, () => {
		if (isActive) {
			setFalse()
		}
	})

	useEffect(() => {
		if (defaultValue) {
			setCurrentOption(find(options, { value: defaultValue }))
		}
	}, [defaultValue])

	return (
		<div className='inputBox-blue'>
			<div ref={ref} className='dropdown'>
				{prefixIcon}

				<button type='button' className='btn' onClick={toggle}>
					{currentOption?.prefixOptionIcon}
					{currentOption?.label || placeholder}
				</button>

				<div className={classNames('dropdown-container', { active: isActive })}>
					{options.map(option => (
						<div
							key={uniqueId()}
							className='dropdown-item'
							style={{ pointerEvents: option.disabled ? 'none' : 'auto' }}
							onClick={() => handleOptionClick(option)}
						>
							{option.prefixOptionIcon}
							{option.label || ' '}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Select
