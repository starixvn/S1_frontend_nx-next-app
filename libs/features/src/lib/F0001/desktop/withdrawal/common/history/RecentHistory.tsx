import { paths } from '@nx-next-app/constants'
import { useWithdrawal } from '@nx-next-app/features/F0001/providers'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import WithdrawalHistoryTable from '@nx-next-app/components/D0001/table/historyTable/WithdrawalHistoryTable'
import { NoData } from '@nx-next-app/features/F0001/desktop/common/NoData'

const RecentHistory = () => {
	const { t } = useTranslation()
	const {
		withdrawalRecentInfo,
		refetchWithdrawalRecentInfo,
		cancelWithdrawal,
	} = useWithdrawal()

	return (
		<div style={{ marginTop: '1.6rem' }}>
			{withdrawalRecentInfo.length > 0 ? (
				<WithdrawalHistoryTable
					classNames='list'
					dataSource={withdrawalRecentInfo}
					onReload={refetchWithdrawalRecentInfo}
					onCancel={cancelWithdrawal}
				/>
			) : (
				<NoData />
			)}
			<div className='btnGroup withdraw-table'>
				<Link href={paths.history.root}>
					<a className='btn-secondary'>
						<i className='icon icon-book-read-fill' />
						All Transaction
					</a>
				</Link>
			</div>
		</div>
	)
}

export { RecentHistory }
