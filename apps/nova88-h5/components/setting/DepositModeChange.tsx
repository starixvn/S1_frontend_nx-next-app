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
			<div className='setting-title'>{t('Label_Deposit_RememberLastMode')}</div>
			<div className='setting-radiobox'>
				<div className='radio'>
					<input id='radio-1' name='radio' type='radio' />
					<label htmlFor='radio-1' className='radio-label'>
						Yes
					</label>
				</div>
				<div className='radio'>
					<input id='radio-2' name='radio' type='radio' />
					<label htmlFor='radio-2' className='radio-label'>
						No
					</label>
				</div>
			</div>
		</div>
	)
}

export { DepositModeChange }
