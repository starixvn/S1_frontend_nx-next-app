import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts'
import { ENV_LOCAL_STORAGE_NAMES } from '@nx-next-app/constants'
import { useAuth } from '../auth-context'

export interface IDepositSavedInfo {
	paymentType?: any
	groupName?: any
	sysId?: any
	channelId?: any
	payName?: any
}

const useDepositSavedLocalStorage = () => {
	const {
		userInfo: { userName },
	} = useAuth()

	const defaultSavedChecked = useReadLocalStorage(
		ENV_LOCAL_STORAGE_NAMES.DepositSavedChecked
	)

	const [
		isDepositLocalStorageSavedChecked,
		setIsDepositLocalStorageSavedChecked,
	] = useLocalStorage<boolean>(
		ENV_LOCAL_STORAGE_NAMES.DepositSavedChecked,
		defaultSavedChecked || ({} as any)
	)

	const defaultSavedInfo = useReadLocalStorage(
		ENV_LOCAL_STORAGE_NAMES.DepositSavedInfo(userName)
	)

	const [depositLocalStorageSavedInfo, setDepositLocalStorageSavedInfo] =
		useLocalStorage<IDepositSavedInfo>(
			ENV_LOCAL_STORAGE_NAMES.DepositSavedInfo(userName),
			defaultSavedInfo || ({} as any)
		)

	const onToggleDepositLocalStorageSavedChecked = () => {
		setIsDepositLocalStorageSavedChecked(prev => !prev)
	}

	const onSavedDepositLocalStorageSavedInfo = (info: IDepositSavedInfo) => {
		setDepositLocalStorageSavedInfo(info)
		console.log('update deposit info localStorage', info)
	}

	return {
		isDepositLocalStorageSavedChecked,
		depositLocalStorageSavedInfo,
		onToggleDepositLocalStorageSavedChecked,
		onSavedDepositLocalStorageSavedInfo,
	}
}

export { useDepositSavedLocalStorage }
