import { ReactNode, useEffect, useRef, useState, MouseEvent } from 'react'
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
	errorMessage?: string
	infoMessage?: string
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
		infoMessage,
		errorMessage,
		onChange,
	} = props
	const { value: isActive, toggle, setFalse } = useBoolean()
	const [currentOption, setCurrentOption] = useState<SelectOptionType>()
	const [filterValue, setFilterValue] = useState('')
	const [showInfo, setShowInfo] = useState(false)

	const handleOptionClick = (newOption: SelectOptionType) => {
		setCurrentOption(newOption)

		if (onChange) {
			onChange(newOption.value)
		}
	}

	useOnClickOutside(ref, () => {
		if (isActive) {
			setFalse()
		}
	})

	const handleInfoClick = (e: MouseEvent) => {
		e.stopPropagation()
		setShowInfo(prev => !prev)
	}

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
		<>
			{!!infoMessage && (
				<div
					className={classNames('inputInfo', {
						active: showInfo,
					})}
				>
					{infoMessage}
				</div>
			)}
			<div
				className={classNames('inputBox', { error: errorMessage })}
				onClick={toggle}
				ref={ref}
			>
				{prefixIcon}
				<button type='button' className='dropdown btn'>
					<div>
						{currentOption?.prefixOptionIcon}
						<span className='text'>{currentOption?.label || placeholder}</span>
					</div>
					<i className='icon icon-keyboard_arrow_down' />
				</button>

				{!!infoMessage && (
					<i className='icon icon-information' onClick={handleInfoClick} />
				)}

				<div className={classNames('dropdown-container', { active: isActive })}>
					{showSearch && (
						<div className='inputBox' onClick={e => e.stopPropagation()}>
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
		</>
	)
}

export default Select
