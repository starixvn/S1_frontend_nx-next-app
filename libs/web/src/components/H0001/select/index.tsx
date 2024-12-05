import { SelectOptionType } from '@nx-next-app/types'
import classNames from 'classnames'
import { filter, find, includes, uniqueId } from 'lodash'
import { useTranslation } from 'next-i18next'
import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'

export interface ISelectProps {
	value?: string | number
	defaultValue?: string | number
	options: SelectOptionType[]
	prefixIcon?: ReactNode
	placeholder?: string
	showSearch?: boolean
	isTranslation?: boolean
	errorMessage?: string
	infoMessage?: string
	onChange?: (value: SelectOptionType['value']) => void
	showValue?: boolean
	btnClassName?: string
	isDropdown?: boolean
}

const Select = (props: ISelectProps) => {
	const { t } = useTranslation()
	const ref = useRef(null)
	const {
		value,
		defaultValue,
		options,
		prefixIcon,
		placeholder = t('Label_General_None'),
		showSearch,
		isTranslation,
		infoMessage,
		errorMessage,
		showValue,
		btnClassName,
		onChange,
		isDropdown = true,
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
			String(item.value).toLowerCase() === filterValue ||
			includes(t(String(item.label)).toLowerCase(), filterValue)
	)

	let label = currentOption?.label ?? placeholder
	if (isTranslation) {
		label = t(currentOption?.label as string) || t(placeholder || '')
	} else if (showValue) {
		label = currentOption?.value as string
	}

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

				<button
					type='button'
					className={classNames('dropdown btn', btnClassName)}
				>
					{/* 如 prefixOptionIcon 為 Image 會造成跑版，所以使用 style 調整 */}
					<div style={{ display: 'flex', alignItems: 'center' }}>
						{currentOption?.prefixOptionIcon}
						<span className='text'>{label}</span>
					</div>
					<i className='icon icon-keyboard_arrow_down' />
				</button>

				{!!infoMessage && (
					<i className='icon icon-information' onClick={handleInfoClick} />
				)}

				<div
					className={classNames('dropdown-container', {
						active: isActive && isDropdown,
					})}
				>
					{showSearch && (
						<div className='inputBox' onClick={e => e.stopPropagation()}>
							<input
								type='text'
								className='search'
								placeholder='Search'
								onChange={e => setFilterValue(e.target.value.toLowerCase())}
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
							<span className='text'>
								{isTranslation
									? t(option.label as string)
									: option.label || ' '}
							</span>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default Select
