import { Select } from '@nx-next-app/components/D0001'
import {
	NotificationSoundStateEnum,
	NotificationStateEnum,
	useSetting,
} from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'

const NotificationSetting = () => {
	const { t } = useTranslation()
	const {
		notificationEnabledArg,
		notificationMutedArg,
		isSetCustSettingLoading,
		disableNotificationSoundCheckbox,
		handleNotificationMuted,
		handleNotificationEnabled,
	} = useSetting()

	return (
		<div className='setting-content'>
			<div className='setting-subtitle'>
				{t('Label_General_DepositWithdrawlNotification')}
			</div>
			<div className='setting-group'>
				<Select
					value={notificationEnabledArg}
					options={[
						{
							value: NotificationStateEnum.Enabled,
							label: 'Label_General_On',
						},
						{
							value: NotificationStateEnum.Disable,
							label: 'Label_General_Off',
						},
					]}
					isTranslation
					onChange={handleNotificationEnabled}
				/>

				<div className='setting-checkbox'>
					<label className='checkbox-content'>
						<input
							type='checkbox'
							checked={
								notificationMutedArg === NotificationSoundStateEnum.Enabled
							}
							// 是否禁用通知音效
							disabled={
								disableNotificationSoundCheckbox || isSetCustSettingLoading
							}
							onChange={handleNotificationMuted}
						/>
						<div className='checkbox-icon' />
						{t('Label_General_SoundEffects')}
					</label>
				</div>
			</div>
		</div>
	)
}

export { NotificationSetting }
