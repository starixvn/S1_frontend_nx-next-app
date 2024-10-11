/* eslint-disable react/self-closing-comp */
import { Select, ToastVisibleEnum } from '@nx-next-app/components/D0001'
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
			<div className='setting-subtitle'>
				{t('Label_General_DepositWithdrawlNotification')}
			</div>
			<div className='setting-group'>
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

				<div className='setting-checkbox'>
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
		</div>
	)
}

export { NotificationSetting }
