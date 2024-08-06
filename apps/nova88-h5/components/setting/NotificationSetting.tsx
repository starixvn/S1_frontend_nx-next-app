/* eslint-disable react/self-closing-comp */
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
			<div className='setting-title'>Deposit & Withdrawl Notification</div>
			<div className='setting-checkbox'>
				<label className='checkbox-content'>
					<input type='checkbox' />
					<div className='checkbox-icon'></div>
					Use prompt pop-ups
				</label>
				<label className='checkbox-content'>
					<input type='checkbox' />
					<div className='checkbox-icon'></div>
					Use prompt pop-ups
				</label>
			</div>
		</div>
	)
}

export { NotificationSetting }
