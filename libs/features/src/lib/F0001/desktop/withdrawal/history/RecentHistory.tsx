import { useWithdrawal } from '@nx-next-app/features/F0001/providers'
import WithdrawalHistoryTable from '@nx-next-app/components/D0001/table/historyTable/WithdrawalHistoryTable'

const RecentHistory = () => {
	const {
		withdrawalRecentInfo,
		refetchWithdrawalRecentInfo,
		cancelWithdrawal,
	} = useWithdrawal()

	return (
		<WithdrawalHistoryTable
			dataSource={withdrawalRecentInfo}
			onReload={refetchWithdrawalRecentInfo}
			onCancel={cancelWithdrawal}
		/>
	)
}

export { RecentHistory }
