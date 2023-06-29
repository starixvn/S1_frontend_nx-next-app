import React, { InputHTMLAttributes, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import classNames from 'classnames'

export interface IInputBoxProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
	register: UseFormRegisterReturn
	touched: boolean
	error?: boolean
	password?: boolean
	errorMessage?: string
	icon?: string
	description?: string
	areaCode?: string
	infoMessage?: string
	children?: React.ReactNode
	subtitle?: string
	requiredIcon?: boolean
	disabled?: boolean
}

/**
 * ---
 * @param {required} register 必填，傳入 react-hook-form 的 register 綁定元件
 * @param {required} touched 必填，樣式需透過判斷是否觸發過元件，才可做進一步渲染，傳入 touchedFields[pathName] 做判斷。
 * @param {boolean} password - 切換 input 至 password input
 * @param {string} className - 現預設有包含 'infoModule' 在其中，可不必傳此 class，傳進 className 即複寫
 * @param {string} infoMessage - 原 infoText , 改由 infoMessage 取代，有傳入 infoMessage 就會自動顯示對應 icon
 * @param {string} areaCode - 有傳入 areaCode 的話則會在 icon 欄位塞入 areaCode
 * @param {boolean} requiredIcon - 原 showDot , 是否顯示必填 icon , 現改為 requiredIcon 以符合情境
 * @param {boolean} error - 驗證是否通過 -  !!errors[pathName]
 * @param {string} errorMessage - 錯誤訊息，由 formState.errors[pathName]?.message 傳遞下來
 * @param {string} icon - icon's className
 * @param {string} type - HTMLInputTypeAttribute , 可自定義 type , 沒填的話預設 "text", password 模式下此功能無用。
 * @param {React.ReactNode} children - 傳入子元件，若功能完成後無使用到可刪除
 * @param {string} subtitle - subtitle's text
 * @param {*} prop - other html input props
 * @author Wen
 */

const InputBox = ({
	register,
	touched,
	password,
	error,
	errorMessage,
	icon,
	type,
	title,
	description,
	areaCode,
	className,
	infoMessage,
	children,
	subtitle,
	requiredIcon,
	disabled,
	...props
}: IInputBoxProps) => {
	const [showPassword, setShowPassword] = useState(false)
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
		if (areaCode) {
			return <i className={classNames('icon', icon)}>{areaCode}</i>
		}
		if (icon) {
			return <i className={classNames('icon', icon)} />
		}
		return null
	}

	const inputType = () => {
		if (password) {
			return showPassword ? 'text' : 'password'
		}
		return type ?? 'text'
	}

	return (
		<div
			className={classNames(className, {
				infoModule: !className,
			})}
		>
			{!!infoMessage && (
				<div
					className={classNames('inputInfo', {
						active: showInfo,
					})}
				>
					{infoMessage}
				</div>
			)}
			{!!subtitle && <div className='subtitle'>{subtitle}</div>}
			<div
				className={classNames('inputBox', {
					error,
				})}
			>
				{requiredIcon && <span className='text-red'>*</span>}
				{inputIcon()}
				<input
					disabled={disabled}
					type={inputType()}
					{...props}
					{...register}
					className={classNames({
						textRight: !password,
					})}
				/>
				<div className='icon-module'>
					{stateIcon()}
					{password && (
						<i
							className={classNames('icon', {
								'icon-eye-blocked': !showPassword,
								'icon-eye': showPassword,
							})}
							style={{ cursor: 'pointer' }}
							onClick={() => setShowPassword(prev => !prev)}
						/>
					)}
					{!!infoMessage && (
						<i
							className='icon icon-information'
							onClick={() => setShowInfo(prev => !prev)}
						/>
					)}
				</div>
			</div>
			{children}
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

export default InputBox
