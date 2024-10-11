/* eslint-disable react/self-closing-comp */
import { ToastVisibleEnum } from '@nx-next-app/components/D0001'
import { Select } from '@nx-next-app/components/H0001'
import { useSetting } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'

const NotificationSetting = () => {
	const { t } = useTranslation()
	const {
		handleToastSound,
		handleToastVisibility,
		disableToastSound,
		isSetCustSettingLoading,
		isToastVisible,
	} = useSetting()

	return (
		<div className='setting-content'>
			<div className='setting-title'>
				{t('Label_General_DepositWithdrawlNotification')}
			</div>
			<div className='setting-checkbox'>
				<Select
					value={isToastVisible}
					options={[
						{
							value: ToastVisibleEnum.Visible,
							label: 'Label_General_Yes',
						},
						{
							value: ToastVisibleEnum.Hidden,
							label: 'Label_General_Yes',
						},
					]}
					isTranslation
					onChange={handleToastVisibility}
				/>
				<label className='checkbox-content'>
					<input
						type='checkbox'
						disabled={disableToastSound || isSetCustSettingLoading}
						// 是否禁用吐司訊息音效
						onChange={handleToastSound}
					/>
					<div className='checkbox-icon'></div>
					{t('Label_General_SoundEffects')}
				</label>
			</div>
		</div>
	)
}

export { NotificationSetting }
