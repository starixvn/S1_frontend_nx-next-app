import { ReactNode, useEffect, useRef, useState } from 'react'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'
import { filter, find, includes, uniqueId } from 'lodash'
import classNames from 'classnames'
import { SelectOptionType } from './type'

export interface ISelectProps {
	value?: string | number
	defaultValue?: string | number
	options: SelectOptionType[]
	prefixIcon?: ReactNode
	placeholder?: string
	showSearch?: boolean
	onChange?: (value: SelectOptionType['value']) => void
}

const Select = (props: ISelectProps) => {
	const ref = useRef(null)
	const {
		value,
		defaultValue,
		options,
		prefixIcon,
		placeholder = 'select',
		showSearch,
		onChange,
	} = props
	const { value: isActive, toggle, setFalse } = useBoolean()
	const [currentOption, setCurrentOption] = useState<SelectOptionType>()
	const [filterValue, setFilterValue] = useState('')

	const handleOptionClick = (newOption: SelectOptionType) => {
		setCurrentOption(newOption)
		setFalse()

		if (onChange) {
			onChange(newOption.value)
		}
	}

	useOnClickOutside(ref, () => {
		if (isActive) {
			setFalse()
		}
	})

	// * 當傳入 value 將元件轉變為 control component
	useEffect(() => {
		setCurrentOption(find(options, { value }))
	}, [value])

	// * 當沒有 value 且有 defaultValue 即初始 default value
	useEffect(() => {
		if (value === undefined && String(defaultValue)) {
			setCurrentOption(find(options, { value: defaultValue }))
		}
	}, [defaultValue])

	//* 絕對搜尋 value 與 模糊搜尋 label
	const filterOptions = filter(
		options,
		item =>
			String(item.value) === filterValue ||
			includes(String(item.label), filterValue)
	)

	return (
		<div className='inputBox-blue'>
			<div ref={ref} className='dropdown'>
				{prefixIcon}

				<button type='button' className='btn' onClick={toggle}>
					{currentOption?.prefixOptionIcon}
					{currentOption?.label || placeholder}
				</button>

				<div className={classNames('dropdown-container', { active: isActive })}>
					{showSearch && (
						<div className='inputBox-blue'>
							<input
								type='text'
								className='search'
								placeholder='Search'
								onChange={e => setFilterValue(e.target.value)}
							/>
						</div>
					)}

					{(showSearch ? filterOptions : options).map(option => (
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
