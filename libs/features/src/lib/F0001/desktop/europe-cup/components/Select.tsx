import classNames from 'classnames'
import { find, uniqueId } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'

export type SelectOptionType = {
	value: string | number | undefined
	label: string | number | null | ReactNode
	img?: string
	prefixOptionIcon?: ReactNode
}

export interface ISelectProps {
	value?: string | number
	defaultValue?: string | number
	options: SelectOptionType[]
	placeholder?: string
	disabled?: boolean
	onChange?: (value: SelectOptionType['value']) => void
}

const Select = (props: ISelectProps) => {
	const { t } = useTranslation()
	const ref = useRef(null)
	const {
		value,
		defaultValue,
		options,
		placeholder = t('Label_General_None'),
		disabled = false,
		onChange,
	} = props
	const { value: isActive, toggle, setFalse } = useBoolean()
	const [currentOption, setCurrentOption] = useState<SelectOptionType>()

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

	return (
		<div className={classNames('inputBox-event', { active: isActive })}>
			<div
				ref={ref}
				className='dropdown'
				onClick={e => {
					if (!(e?.target as HTMLInputElement)?.className.includes('search'))
						if (!disabled) {
							// 加在 button 會破壞樣式，所以加在這
							toggle()
						}
				}}
			>
				<button type='button' className='btn'>
					{currentOption?.label ?? placeholder}
				</button>

				<div className={classNames('dropdown-container', { active: isActive })}>
					{options.map(option => (
						<div
							key={uniqueId()}
							className='dropdown-item'
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
