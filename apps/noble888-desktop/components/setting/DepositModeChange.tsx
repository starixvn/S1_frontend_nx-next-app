import { Select } from '@nx-next-app/components/D0001'
import { useDepositSavedLocalStorage } from '@nx-next-app/data-access'
import { useTranslation } from 'next-i18next'

const DepositModeChange = () => {
	const { t } = useTranslation()
	const {
		isDepositLocalStorageSavedChecked,
		onSelectDepositLocalStorageSavedChecked,
	} = useDepositSavedLocalStorage()

	return (
		<div className='setting-content'>
			<div className='setting-subtitle'>
				{t('Label_Deposit_RememberLastMode')}
			</div>
			<Select
				// 預設顯示的 value 只接收 string 型態
				value={String(isDepositLocalStorageSavedChecked)}
				options={[
					{
						value: 'true',
						label: t('Label_General_Yes'),
					},
					{
						value: 'false',
						label: t('Label_General_No'),
					},
				]}
				onChange={onSelectDepositLocalStorageSavedChecked}
			/>
		</div>
	)
}

export { DepositModeChange }
