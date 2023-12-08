import { Loading } from '@nx-next-app/components/D0002'
import DepositHistoryTable from '@nx-next-app/components/D0002/table/historyTable/DepositHistoryTable'
import { useDepositRecentHistory } from '@nx-next-app/data-access'

const DepositRecentHistory = () => {
	const {
		loading,
		depositInfoRecentList,
		refetchDepositInfoRecentList,
		onUploadReceipt,
		onCancelDepositSlip,
	} = useDepositRecentHistory()

	return (
		<>
			{loading && <Loading />}
			<DepositHistoryTable
				dataSource={depositInfoRecentList}
				onReload={refetchDepositInfoRecentList}
				onSubmit={onUploadReceipt}
				onCancel={onCancelDepositSlip}
			/>

			<a className='icon icon-books' href='/en/history?kind=deposit' />
		</>
	)
}

export default DepositRecentHistory
