import classNames from 'classnames'
import React, { InputHTMLAttributes, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { Select } from '@nx-next-app/components/H0001'
import { SelectOptionType } from '@nx-next-app/types'

export interface IInputPhoneProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
	register: UseFormRegisterReturn
	touched: boolean
	error?: boolean
	errorMessage?: string
	icon?: string
	description?: string
	infoMessage?: string
	children?: React.ReactNode
	disabled?: boolean
	showSearch?: boolean
	selectValue?: string | number
	showValue?: boolean
	selectOptions: SelectOptionType[]
	onChangeSelect: (value: SelectOptionType['value']) => void
}

/**
 * ---
 * @param {required} register 必填，傳入 react-hook-form 的 register 綁定元件
 * @param {required} touched 必填，樣式需透過判斷是否觸發過元件，才可做進一步渲染，傳入 touchedFields[pathName] 做判斷。
 * @param {string} className - 現預設有包含 'infoModule' 在其中，可不必傳此 class，傳進 className 即複寫
 * @param {string} infoMessage - 原 infoText , 改由 infoMessage 取代，有傳入 infoMessage 就會自動顯示對應 icon
 * @param {boolean} error - 驗證是否通過 -  !!errors[pathName]
 * @param {string} errorMessage - 錯誤訊息，由 formState.errors[pathName]?.message 傳遞下來
 * @param {string} icon - icon's className
 * @param {React.ReactNode} children - 傳入子元件，若功能完成後無使用到可刪除
 * @param {boolean} showSearch - 是否顯示 select 內的搜尋列
 * @param {string | number} selectValue - select 的 value
 * @param {boolean} showValue - 是否只顯示 value 而不是 label
 * @param {SelectOptionType[]} selectOptions - select 的選項
 * @param {(value: SelectOptionType['value']) => void} onChangeSelect - 改變 select 的 value 時觸發
 * @param {*} prop - other html input props
 * @author Wen
 */

const InputPhone = ({
	register,
	touched,
	error,
	errorMessage,
	icon,
	type,
	title,
	description,
	className,
	infoMessage,
	children,
	disabled,
	showSearch,
	selectValue,
	selectOptions,
	showValue,
	onChangeSelect,
	...props
}: IInputPhoneProps) => {
	const [showInfo, setShowInfo] = useState(false)
	const stateIcon = () => {
		if (error) {
			return <i className='icon icon-errormark' />
		}
		if (touched && !error && error !== undefined) {
			return <i className='icon icon-checkmark' />
		}
		return null
	}

	const inputIcon = () => {
		if (icon) {
			return <i className={classNames('icon', icon)} />
		}
		return null
	}

	return (
		<div className={classNames('infoModule', className)}>
			{!!infoMessage && (
				<div
					className={classNames('inputInfo', {
						active: showInfo,
					})}
				>
					{infoMessage}
				</div>
			)}
			<div className='phone'>
				<Select
					showSearch
					options={selectOptions}
					placeholder=''
					prefixIcon={<i className='icon icon-phone' />}
					onChange={onChangeSelect}
					value={selectValue}
					showValue={showValue}
				    isDropdown={false}
				/>

				<div
					className={classNames('inputBox', {
						error,
					})}
				>
					{inputIcon()}
					<input disabled={disabled} type='tel' {...props} {...register} />
					<div className='icon-module'>
						{stateIcon()}
						{!!infoMessage && (
							<i
								className='icon icon-information'
								onClick={() => setShowInfo(prev => !prev)}
							/>
						)}
					</div>
				</div>
				{children}
			</div>
			<div
				className={classNames('tip', {
					active: error,
				})}
			>
				{errorMessage}
			</div>
		</div>
	)
}

export default InputPhone
