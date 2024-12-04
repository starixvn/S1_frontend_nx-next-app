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
		<div className='rememberMode'>
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
				{t('Label_Deposit_RememberLastMode')}
			</div>
			<div className='group-tool-tip'>
				<button
					className='icon icon-help-circle'
					onClick={toggleIsInfoActive}
				/>
				<div
					className={classNames('inputInfo', {
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
