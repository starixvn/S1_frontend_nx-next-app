/* eslint-disable no-console */
import { ENV_LOCAL_STORAGE_NAMES } from '@nx-next-app/constants'
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts'
import { useAuth } from '../auth-context'

export interface IDepositSavedInfo {
	paymentType?: any
	groupName?: any
	groupId?: any
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

	/**
	 *  點擊 button ，更新 setIsDepositLocalStorageSavedChecked 狀態。
	 *  用於 deposit 頁的 “Remember my last used mode” 的 button 。 */
	const onToggleDepositLocalStorageSavedChecked = () => {
		setIsDepositLocalStorageSavedChecked(prev => !prev)
	}

	/**
	 *  切換 select 根據值，更新 setIsDepositLocalStorageSavedChecked 狀態。
	 *  用於 setting 頁的 “Remember my last used mode” 的 select 組件。
	 *  @param value 頁面切換時，select 選項值 */
	const onSelectDepositLocalStorageSavedChecked = (value: string) => {
		setIsDepositLocalStorageSavedChecked(value === 'true')
	}

	const onSavedDepositLocalStorageSavedInfo = (info: IDepositSavedInfo) => {
		setDepositLocalStorageSavedInfo(info)
	}

	return {
		isDepositLocalStorageSavedChecked,
		depositLocalStorageSavedInfo,
		onSelectDepositLocalStorageSavedChecked,
		onToggleDepositLocalStorageSavedChecked,
		onSavedDepositLocalStorageSavedInfo,
	}
}

export { useDepositSavedLocalStorage }
