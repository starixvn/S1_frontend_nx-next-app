/* eslint-disable no-console */
import { ENV_LOCAL_STORAGE_NAMES } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts'

export interface IDepositSavedInfo {
	paymentType?: any
	groupName?: any
	sysId?: any
	channelId?: any
	payName?: any
}

/**
 * 存款頁面 "記住上一次存款狀態" 的狀態管理
 */
const useDepositSavedLocalStorage = () => {
	const {
		userInfo: { userName },
	} = useAuth()

	// * 「是否記住上一次存款狀態」默認值
	const defaultSavedChecked = useReadLocalStorage(
		ENV_LOCAL_STORAGE_NAMES.DepositSavedChecked
	)

	// * 「是否記住上一次存款狀態」狀態管理
	const [
		isDepositLocalStorageSavedChecked,
		setIsDepositLocalStorageSavedChecked,
	] = useLocalStorage<boolean>(
		ENV_LOCAL_STORAGE_NAMES.DepositSavedChecked,
		!!defaultSavedChecked
	)

	// * 「上一次存款狀態」默認值
	const defaultSavedInfo = useReadLocalStorage(
		ENV_LOCAL_STORAGE_NAMES.DepositSavedInfo(userName)
	)

	// * 「上一次存款狀態」狀態管理
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
	}

	return {
		isDepositLocalStorageSavedChecked,
		depositLocalStorageSavedInfo,
		onToggleDepositLocalStorageSavedChecked,
		onSavedDepositLocalStorageSavedInfo,
	}
}

export { useDepositSavedLocalStorage }
