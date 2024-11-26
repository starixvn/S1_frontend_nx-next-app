import { paths } from '@nx-next-app/constants'
import { useWithdrawal } from '@nx-next-app/features/F0001/providers'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import WithdrawalHistoryTable from '@nx-next-app/components/D0001/table/historyTable/WithdrawalHistoryTable'

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
				<div className='custom-nodata'>
					<i className='icon icon-file-damage-fill' />
					<div>{t('Label_General_NoData')}</div>
				</div>
			)}
			<Link href={paths.history.root}>
				<a className='icon icon-books' />
			</Link>
		</div>
	)
}

export { RecentHistory }
