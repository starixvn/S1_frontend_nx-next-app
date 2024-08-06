/* eslint-disable default-param-last */
import {
	PositionEnum,
	ToastBGColorEnum,
	ToastTypeEnum,
} from '@nx-next-app/components/D0001'
import { DeviceTypeEnum } from '@nx-next-app/types'
import { ToastOptions, Zoom, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export interface IToastOptions {
	message: string
	type?: ToastTypeEnum
	customBGColor?: ToastBGColorEnum | undefined
	customIconClassName?: string | undefined
	isWrapText?: boolean
	isNotification?: boolean
}

/**
 * 發送吐司訊息。
 * @message - 顯示的文字訊息。
 * @type - 吐司訊息的類型 (成功、錯誤、警告等)。
 * @customBGColor - 自定義的背景顏色。
 * @customIconClassName - 自定義 icon 的 className。
 * @isWrapText - 是否允許文字換行，預設為 `true`。
 * @isNotification - 是否為通知類型的吐司訊息，控制寬度樣式。
 * @example
 * 一般吐司訊息，不需要傳入自定義參數：
 * ToastEmitter({
 *   message: "hello world",
 *   type: ToastTypeEnum.Success,
 * })
 * @example
 * 自定義吐司訊息，需要傳入自定義參數：
 * ToastEmitter({
 *   message: "hello world",
 *   type: ToastTypeEnum.Custom,
 *   customBGColor: BGColorEnum.Green,
 *   iconClassName: 'icon-checkmark'
 * }) */
export const ToastEmitter = ({
	message,
	type = ToastTypeEnum.Success,
	customBGColor,
	customIconClassName,
	isWrapText = true,
	isNotification = false,
}: IToastOptions) => {
	/** ====== 常數 ====== */

	const isMobile =
		Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DeviceTypeEnum.Mobile

	// 桌機版的財務訊息需要固定寬度，如果是其他訊息，則讓文字撐滿容器。
	let desktopToastWidth = null
	isNotification
		? (desktopToastWidth = '350px')
		: (desktopToastWidth = 'fit-content')

	/** 吐司訊息 style
	 *  @backgroundColor 自定義背景顏色，會填滿整個吐司訊息。
	 *  @color 文字顏色，如果有自定義背景顏色，則文字顏色會改為白色，否則會影響文字閱讀。
	 *  @borderRadius  react-toastify 手機模式預設沒圓角。但設計稿需要圓角，故僅在手機模式加上。
	 *  @whiteSpace  訊息是否換行，預設過長會換行。
	 *  @fitContent  讓文字撐滿容器。
	 */
	const style: React.CSSProperties = {
		backgroundColor: customBGColor || undefined,
		color: customBGColor ? 'white' : undefined,
		borderRadius: isMobile ? '8px' : undefined,
		width: isMobile ? undefined : desktopToastWidth,
		whiteSpace: isWrapText ? 'normal' : 'nowrap',
	}

	/** 自定義 icon，使用設計提供的 icon className，如果未填寫，則顯示原 icon ( success / error / info / warning )。 */
	const icon = customIconClassName && (
		<i className={`icon ${customIconClassName}`} style={{ color: 'white' }} />
	)

	/** 吐司訊息的其他設定，如果未來有需求可以自行增加參數，從外部傳入。 */
	const toastOptions: ToastOptions = {
		position: PositionEnum.TopCenter,
		style,
		autoClose: 5000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false,
		closeButton: false,
		transition: Zoom,
	}

	// 有自定義 icon 設定時，加入到 toastOptions。
	if (icon) toastOptions.icon = icon

	// 根據訊息種類，顯示相對應通知
	switch (type) {
		case ToastTypeEnum.Success:
			toast.success(message, toastOptions)
			break
		case ToastTypeEnum.Error:
			toast.error(message, toastOptions)
			break
		case ToastTypeEnum.Info:
			toast.info(message, toastOptions)
			break
		case ToastTypeEnum.Warning:
			toast.warning(message, toastOptions)
			break
		default:
			toast(message, toastOptions)
			break
	}
}
