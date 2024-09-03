import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	useGetWithdrawalRecentInfoQuery,
	useSetWithdrawalCancelMutation,
} from '@nx-next-app/service'

const useWithdrawalHistory = () => {
	const { modal } = useGlobalModal()
	const {
		data: { data: withdrawalRecentInfo = [] } = {},
		isLoading: isGetWithdrawalRecentInfoLoading,
		refetch: refetchWithdrawalRecentInfo,
	} = useGetWithdrawalRecentInfoQuery(null, { refetchOnMountOrArgChange: true })
	const [setWithdrawalCancel] = useSetWithdrawalCancelMutation()

	// 取消 withdrawal
	const cancelWithdrawal = async (transId: string) => {
		try {
			await setWithdrawalCancel({ transId }).unwrap()
		} catch (error) {
			modal.error((error as Error).message)
		}
	}
	return {
		withdrawalRecentInfo,
		isGetWithdrawalRecentInfoLoading,
		refetchWithdrawalRecentInfo,
		cancelWithdrawal,
	}
}

export { useWithdrawalHistory }
