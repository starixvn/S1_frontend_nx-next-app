import {
	ToastSoundStateEnum,
	ToastVisibleEnum,
} from '@nx-next-app/components/D0001'
import { useAuth } from '@nx-next-app/data-access'
import { useSetCustSettingMutation } from '@nx-next-app/service'
import React, {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'

interface ISettingContext {
	isToastVisible: string | undefined
	isToastSoundMuted: string | undefined
	isSetCustSettingLoading: boolean
	disableToastSound: boolean
	handleToastVisibility: (isToastHidden: string) => void
	handleToastSound: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SettingContext = createContext<ISettingContext | null>(null)

export const useSetting = () => useContext(SettingContext)

export const SettingProvider = ({ children }: { children: ReactNode }) => {
	// ====== hook ======

	const {
		toastSetting: { financeNotification, soundEffects, isLoadingUserInfo },
	} = useAuth()

	// ====== state ======

	const [isToastVisible, setIsToastVisible] = useState<string | undefined>(
		financeNotification
	)

	const [isToastSoundMuted, setIsToastSoundMuted] = useState<
		string | undefined
	>(soundEffects)

	const [disableToastSound, setDisableToastSound] = useState<boolean>(false)

	// ====== api ======

	const [setCustSetting, { isLoading: isSetCustSettingLoading }] =
		useSetCustSettingMutation()

	// ====== 函數 ======

	/**
	 * 是否要啟用吐司訊息，如果未啟用吐司訊息也要禁用吐司訊息音效
	 * @toastVisibilityStatus 是否啟用吐司訊息 */
	const handleToastVisibility = (toastVisibilityStatus: string) => {
		const isHidden = toastVisibilityStatus === ToastVisibleEnum.Hidden
		setIsToastVisible(
			isHidden ? ToastVisibleEnum.Hidden : ToastVisibleEnum.Visible
		)
		setDisableToastSound(isHidden)
	}

	/**
	 * 是否要啟用吐司訊息的音效
	 * @event 吐司訊息音效的 checkbox event */
	const handleToastSound = (event: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = event.target.checked
		isChecked
			? setIsToastSoundMuted(ToastSoundStateEnum.Enabled)
			: setIsToastSoundMuted(ToastSoundStateEnum.Muted)
	}

	// ====== useEffect ======

	// financeNotification 和 soundEffects 是從 api 取得，如果有更新再更新 state
	useEffect(() => {
		// 資料尚未載入完成，不處理
		if (isLoadingUserInfo) return
		setDisableToastSound(financeNotification === ToastVisibleEnum.Hidden)
		setIsToastVisible(financeNotification)
		setIsToastSoundMuted(soundEffects)
	}, [financeNotification, soundEffects])

	// 設定吐司訊息的 api 呼叫
	useEffect(() => {
		// 資料尚未載入完成，不處理
		if (isLoadingUserInfo) return
		const updateCustSetting = async () => {
			await setCustSetting({
				financeNotification: isToastVisible,
				soundEffects: isToastSoundMuted,
			}).unwrap()
		}
		updateCustSetting()
	}, [isToastVisible, isToastSoundMuted])

	const value: ISettingContext = {
		isToastVisible,
		isToastSoundMuted,
		isSetCustSettingLoading,
		disableToastSound,
		handleToastVisibility,
		handleToastSound,
	}

	return (
		<SettingContext.Provider value={value}>{children}</SettingContext.Provider>
	)
}
