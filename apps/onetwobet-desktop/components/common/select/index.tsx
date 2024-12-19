import { SelectOptionType } from '@nx-next-app/types'
import classNames from 'classnames'
import { filter, find, includes, uniqueId } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'

export interface ISelectProps {
	value?: string | number
	defaultValue?: string | number
	options: SelectOptionType[]
	prefixIcon?: ReactNode
	placeholder?: string
	showSearch?: boolean
	isTranslation?: boolean
	prefixText?: string
	onChange?: (value: SelectOptionType['value']) => void
	errorMessage?: string
	showValue?: boolean
	requiredIcon?: boolean
	error?: boolean
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
		prefixText,
		errorMessage,
		showValue,
		onChange,
		requiredIcon,
		error,
	} = props
	const { value: isActive, toggle, setFalse } = useBoolean()
	const [currentOption, setCurrentOption] = useState<SelectOptionType>()
	const [filterValue, setFilterValue] = useState('')

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
	const filterOptions = filter(options, item => {
		return (
			String(item.value).toLowerCase() === filterValue ||
			includes(t(String(item.label)).toLowerCase(), filterValue)
		)
	})

	let label = currentOption?.label ?? placeholder
	if (isTranslation) {
		label = t(currentOption?.label as string) || t(placeholder || '')
	} else if (showValue) {
		label = currentOption?.value as string
	}

	return (
		<div
			className={classNames('inputBox-blue', { error: error || errorMessage })}
		>
			{requiredIcon && <span className='required-tip'>*</span>}
			{prefixText && <i className='txt-gray'>{prefixText}</i>}
			<div
				ref={ref}
				className='dropdown'
				onClick={e => {
					if (!(e?.target as HTMLInputElement)?.className.includes('search'))
						toggle()
				}}
			>
				{prefixIcon}

				<button type='button' className='btn'>
					{currentOption?.prefixOptionIcon}
					{label}
				</button>

				<div className={classNames('dropdown-container', { active: isActive })}>
					{showSearch && (
						<div className='inputBox-blue'>
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
							{isTranslation ? t(option.label as string) : option.label || ' '}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Select
