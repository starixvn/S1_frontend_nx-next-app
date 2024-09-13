import { Loading } from '@nx-next-app/components/D0001'
import { useDepositRecentHistory } from '@nx-next-app/data-access'
import DepositHistoryTable from '../common/table/historyTable/DepositHistoryTable'

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
