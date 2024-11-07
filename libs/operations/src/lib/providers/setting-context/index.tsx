import { useAuth } from '@nx-next-app/data-access'
import {
	NotificationSoundStateEnum,
	NotificationStateEnum,
} from '@nx-next-app/operations'
import { useSetCustSettingMutation } from '@nx-next-app/service'
import React, {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'

interface ISettingContext {
	notificationEnabledArg: string | undefined
	notificationMutedArg: string | undefined
	isSetCustSettingLoading: boolean
	disableNotificationSoundCheckbox: boolean
	handleNotificationEnabled: (isNotificationDisable: string) => void
	handleNotificationMuted: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SettingContext = createContext<ISettingContext | null>(null)

export const useSetting = () => useContext(SettingContext)

export const SettingProvider = ({ children }: { children: ReactNode }) => {
	// ====== hook ======

	const {
		notificationSetting: {
			financeNotification,
			soundEffects,
			isLoadingUserInfo,
		},
	} = useAuth()

	// ====== state ======

	const [notificationEnabledArg, setNotificationEnabledArg] = useState<
		string | undefined
	>(financeNotification)

	const [notificationMutedArg, setNotificationMutedArg] = useState<
		string | undefined
	>(soundEffects)

	const [
		disableNotificationSoundCheckbox,
		setDisableNotificationSoundCheckbox,
	] = useState<boolean>(false)

	// ====== api ======

	const [setCustSetting, { isLoading: isSetCustSettingLoading }] =
		useSetCustSettingMutation()

	// ====== 函數 ======

	/**
	 * 是否要啟用通知訊息，如果未啟用通知訊息也要禁用通知訊息音效
	 * @isNotificationDisable 是否啟用通知訊息 */
	const handleNotificationEnabled = (isNotificationDisable: string) => {
		const isDisable = isNotificationDisable === NotificationStateEnum.Disable
		setNotificationEnabledArg(
			isDisable ? NotificationStateEnum.Disable : NotificationStateEnum.Enabled
		)
		setDisableNotificationSoundCheckbox(isDisable)
	}

	/**
	 * 是否要啟用通知訊息的音效
	 * @event 訊息通知音效的 checkbox event */
	const handleNotificationMuted = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const isChecked = event.target.checked
		setNotificationMutedArg(
			isChecked
				? NotificationSoundStateEnum.Enabled
				: NotificationSoundStateEnum.Muted
		)
	}

	// ====== useEffect ======

	// financeNotification 和 soundEffects 是從 api 取得，如果有更新再更新 state
	useEffect(() => {
		// 資料尚未載入完成，不處理
		if (isLoadingUserInfo) return
		setDisableNotificationSoundCheckbox(
			financeNotification === NotificationStateEnum.Disable
		)
		setNotificationEnabledArg(financeNotification)
		setNotificationMutedArg(soundEffects)
	}, [financeNotification, soundEffects])

	// 設定訊息通知的 api 呼叫
	useEffect(() => {
		// 資料尚未載入完成，不處理
		if (isLoadingUserInfo) return
		const updateCustSetting = async () => {
			await setCustSetting({
				financeNotification: notificationEnabledArg,
				soundEffects: notificationMutedArg,
			}).unwrap()
		}
		updateCustSetting()
	}, [notificationEnabledArg, notificationMutedArg])

	const value: ISettingContext = {
		notificationEnabledArg,
		notificationMutedArg,
		isSetCustSettingLoading,
		disableNotificationSoundCheckbox,
		handleNotificationMuted,
		handleNotificationEnabled,
	}

	return (
		<SettingContext.Provider value={value}>{children}</SettingContext.Provider>
	)
}
