import type { InputHTMLAttributes } from 'react'
import { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import classNames from 'classnames'

export interface IInputBoxProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
	register: UseFormRegisterReturn
	touched: boolean
	loading?: boolean
	error?: boolean
	password?: boolean
	isMessagesHide?: boolean
	warning?: boolean
	successMessage?: string
	errorMessage?: string
	icon?: string
	description?: string
	areaCode?: string
	infoMessage?: string | null
	format?: boolean
	formatStr?: string
	showIconModule?: boolean
	onInfoClick?: () => void
}

/**
 * 原 InputBox 元件，現將 InputBox.PSW 合併至單一 Input 元件，傳入 `password` 將會轉換成 password Input。
 *
 * 搭配 react-hook-form 做使用，必須傳入 register 與 useForm() 綁定，register 所提供的 options 請閱 react-hook-form 官方文件。
 *
 * props 異動紀錄說明：
 * 1. format 因與 isConvert 重複，故移除僅保留 isConvert
 * 2. register options 包含大部分 react Input method，故 onBlur , onChange 等均移除，需綁定在 register 內確保元件正常運作。
 * 3. toolTip 更名為 description 以符合設計命名
 * 4. 其餘未出現在 interface 的 props 均為 HTML 原生參數，已移除
 * 5. 移除 tip 與 checked , 改由 errorMessage、successMessage、error (boolean)、loading (boolean) 取代
 * 6. 增加 touched (boolean) , 並且為必填，判斷元件是否觸發過，傳入 touchedFields[pathName] 判斷
 * 7. 目前 InfoIcon 顯示邏輯：需將要觸發的 Info 文字傳入 infoMessage , 若該欄圍無驗證需要 ( 未傳入 error prop )，則 InfoIcon 恆現 ; 若有驗證需求 ( 有傳入 error prop )，則僅在首次驗證前出現 ( touched 前 )。
 * 其餘可至元件庫內閱讀完整 docs
 *
 * ---
 * @param {required} register 必填，傳入 react-hook-form 的 register 綁定元件
 * @param {required} touched 必填，樣式需透過判斷是否觸發過元件，才可做進一步渲染，傳入 touchedFields[pathName] 做判斷。
 * @param {boolean} password - 傳遞 password props 控制是否為 pwd input
 * @param {string} className - 現預設有包含 'inputBox-blue' 在其中，可不必傳此 class，傳進 className 即覆蓋
 * @param {string} errorMessage - 錯誤訊息，由 formState.errors[pathName]?.message 傳遞下來
 * @param {boolean} error - 驗證是否通過
 * @param {boolean} loading - 控制 loading state
 * @param {string} icon - icon's className
 * @param {string} title - Input 開頭 , Icon 右側
 * @param {string} description - 原名 toolTip ,位置在 input 結尾 , Checked Icon 左側，更動為 description 符合 css ClassName
 * @param {boolean} isMessagesHide - 啟用後將會隱藏所有 msg ( 包含 error , success )
 * @param {string} areaCode - 與 title 同位置，但為淺灰字樣
 * @param {string} infoMessage - 有給予此 function 時會出現 info icon , 細節請閱說明第七點。
 * @param {boolean} format - 控制是否加入 formatStr
 * @param {string} formatStr - 用於複寫預設的 formatStr
 * @param {boolean} warning - 檢視舊專案無使用到,true 則顯示警告 icon
 * @param {string} type - HTMLInputTypeAttribute
 * @param {boolean} showIconModule - Whether show showIconModule
 * @param {boolean} onInfoClick - 顯示 info icon 並觸發外部點擊事件
 * @param {*} prop - other html input props
 * @author Wen
 */
const InputBox = ({
	register,
	touched,
	password,
	loading,
	error,
	isMessagesHide,
	format,
	warning,
	successMessage,
	errorMessage,
	icon,
	type,
	title,
	description,
	areaCode,
	className,
	infoMessage,
	formatStr = "('000)",
	showIconModule = true,
	onInfoClick,
	...props
}: IInputBoxProps) => {
	const [showPassword, setShowPassword] = useState(false)
	const [showInfo, setShowInfo] = useState(false)

	// 狀態管理 Icon , password 不會有此 icon
	const stateIcon = () => {
		// 此處透過權重管理要顯示的 Icon

		if (error) {
			return <i className='icon icon-cross' />
		}

		if (loading) {
			return <i className='icon icon-spinner11' />
		}

		// 有傳入 successMessage 或有驗證過的話該 icon 會在驗證無錯誤之後出現
		if (touched && !error && (!!successMessage || error !== undefined)) {
			// 成功 icon 應在輸入資料驗證後才會顯示
			return <i className='icon icon-checkmark' />
		}

		if (infoMessage || onInfoClick) {
			return (
				// 為消除綁定 onClick 在 非 button 元件上的錯
				// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/control-has-associated-label,jsx-a11y/no-static-element-interactions
				<i
					className='icon icon-information'
					onClick={() => {
						setShowInfo(prev => !prev)
						onInfoClick && onInfoClick()
					}}
					style={{ cursor: 'pointer' }}
				/>
			)
		}

		return null
	}

	const renderInfoMessage = () => {
		// 隱藏就全部不顯示
		if (isMessagesHide) return null

		// error 權重最高
		if (type !== 'date' && !!errorMessage) {
			return <div className={classNames('tip', 'active')}>{errorMessage}</div>
		}
		// successMessage 權重次之
		if (touched && !loading && !!successMessage) {
			// 成功 message 應在輸入資料驗證後才會顯示
			return <div className={classNames('tip', 'active')}>{successMessage}</div>
		}

		// infoMessage 權重最低，沒驗證 or 尚未驗證過才會觸發
		if (infoMessage && showInfo && (error === undefined || !touched)) {
			return <div className={classNames('tip', 'active')}>{infoMessage}</div>
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
		<>
			<div
				className={classNames(className, {
					'inputBox-blue': !className,
					error,
				})}
			>
				{!!icon && <i className={classNames('icon', icon)} />}
				{!!title && <i className='txt-blue'>{title}</i>}
				{!!areaCode && <div className='txt-lightgray'>{areaCode}</div>}

				<input type={inputType()} {...register} {...props} />

				{!!description && <div className='description'>{description}</div>}

				{showIconModule && (
					<div className='iconModule'>
						{format && <i>{formatStr}</i>}

						{password ? (
							// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
							<i
								className={classNames('icon', {
									'icon-eye-blocked': !showPassword,
									'icon-eye': showPassword,
								})}
								style={{ cursor: 'pointer' }}
								onClick={() => setShowPassword(prev => !prev)}
							/>
						) : (
							stateIcon()
						)}

						{/* 檢查舊專案無使用到，怕有功能需要用，暫不移除 */}
						{warning && <i className='icon icon-warning' />}
					</div>
				)}
			</div>
			{renderInfoMessage()}
		</>
	)
}

export default InputBox
