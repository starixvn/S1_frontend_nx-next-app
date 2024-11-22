import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useBoolean } from 'usehooks-ts'

import { useDepositSavedLocalStorage } from '@nx-next-app/data-access'

const DepositAutoRemember = () => {
	const { t } = useTranslation()
	const { value: isInfoActive, toggle: toggleIsInfoActive } = useBoolean(false)

	const {
		isDepositLocalStorageSavedChecked,
		onToggleDepositLocalStorageSavedChecked,
	} = useDepositSavedLocalStorage()

	return (
		<div className='checkbox autotransfer'>
			<div className='swithModule'>
				<button
					className={classNames('switchBtn', {
						active: isDepositLocalStorageSavedChecked,
					})}
					onClick={onToggleDepositLocalStorageSavedChecked}
				>
					<div
						className={classNames({
							active: isDepositLocalStorageSavedChecked,
						})}
					/>
				</button>
			</div>
			{t('Label_Deposit_RememberLastMode')}
			<div className='custom-tooltip'>
				<button
					className='icon icon-help-circle'
					onClick={toggleIsInfoActive}
				/>
				<div
					className={classNames('custom-tooltip-click-body', {
						active: isInfoActive,
					})}
				>
					{t('Label_Deposit_RememberLastModeInfo')}
				</div>
			</div>
		</div>
	)
}

export default DepositAutoRemember
