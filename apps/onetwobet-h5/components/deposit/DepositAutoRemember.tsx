import { useDepositSavedLocalStorage } from '@nx-next-app/data-access'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useBoolean } from 'usehooks-ts'

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
					<span>No</span>
					<span>OFF</span>
					<div
						className={classNames({
							active: isDepositLocalStorageSavedChecked,
						})}
					/>
				</button>
				{t('Label_Deposit_RememberLastMode')}
			</div>
			<button className='icon icon-question' onClick={toggleIsInfoActive} />
			<div
				className={classNames('inputInfo', {
					active: isInfoActive,
				})}
			>
				{t('Label_Deposit_RememberLastModeInfo')}
			</div>
		</div>
	)
}

export default DepositAutoRemember
