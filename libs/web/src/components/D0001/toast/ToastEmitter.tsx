/* eslint-disable default-param-last */
import {
	PositionEnum,
	ToastBGColorEnum,
	ToastSoundStateEnum,
	ToastTypeEnum,
} from '@nx-next-app/components/D0001'
import { DeviceTypeEnum } from '@nx-next-app/types'
import { ToastOptions, Zoom, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface IToastOptions {
	message: string
	isSoundEnabled: string | undefined
	type?: ToastTypeEnum
	customBGColor?: ToastBGColorEnum | undefined
	customIconClassName?: string | undefined
	isWrapText?: boolean
}

/**
 * 發送吐司訊息。
 * @options - 吐司選項，包括顯示的文字訊息、吐司類型、是否禁音、自定義背景顏色和自定義 icon className。
 * @example
 * 一般吐司訊息，不需要傳入自定義參數：
 * ToastEmitter({
 *   message: "hello world",
 *   type: ToastTypeEnum.Success,
 *   isToastMuted: true,
 * })
 * @example
 * 自定義吐司訊息，需要傳入自定義參數：
 * ToastEmitter({
 *   message: "hello world",
 *   type: ToastTypeEnum.Custom,
 *   isToastMuted: true,
 *   customBGColor: BGColorEnum.Green,
 *   iconClassName: 'icon-checkmark'
 * })
 */
const ToastEmitter = ({
	message,
	isSoundEnabled,
	type = ToastTypeEnum.Success,
	isWrapText = true,
	customBGColor,
	customIconClassName,
}: IToastOptions) => {
	/** ====== 常數 ====== */

	const isMobile =
		Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DeviceTypeEnum.Mobile

	/** 吐司訊息 style
	 *  @backgroundColor 自定義背景顏色，會填滿整個吐司訊息。
	 *  @color 文字顏色，如果有自定義背景顏色，則文字顏色會改為白色，否則會影響文字閱讀。
	 *  @borderRadius  react-toastify 手機模式預設沒圓角。但設計稿需要圓角，故僅在手機模式加上。
	 *  @whiteSpace  訊息是否換行，預設過長會換行。
	 */
	const style: React.CSSProperties = {
		backgroundColor: customBGColor || undefined,
		color: customBGColor ? 'white' : undefined,
		borderRadius: isMobile ? '8px' : undefined,
		whiteSpace: isWrapText ? 'normal' : 'nowrap',
	}

	/** 自定義 icon，使用設計提供的 icon className，如果未填寫，則顯示原 icon ( success / error / info / warning )。 */
	const icon = customIconClassName && (
		<i className={`icon ${customIconClassName}`} style={{ color: 'white' }} />
	)

	/** 是否禁音 */
	const isToastMuted = isSoundEnabled === ToastSoundStateEnum.Muted

	/** ====== 函數 ====== */

	// todo 要請設計改平台路徑，要改 nova
	/** 根據使用者設定，決定是否播放音效 (音效請設計放在 s3) */
	const playSound = () => {
		if (isToastMuted) return
		const audio = new Audio(
			'https://banner.goal123.org/Static/toast/img/toastSound.mp3'
		)
		audio.play()
	}

	/** 吐司訊息的其他設定，如果未來有需求可以自行增加參數，從外部傳入。 */
	const toastOptions: ToastOptions = {
		position: PositionEnum.TopCenter,
		style,
		autoClose: 3000,
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

	playSound()
}

export default ToastEmitter
