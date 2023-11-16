import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { paths } from '@nx-next-app/constants'
import { useWithdrawal } from '@nx-next-app/features/F0002/providers'
import WithdrawalHistoryTable from '@nx-next-app/components/D0002/table/historyTable/WithdrawalHistoryTable'

const RecentHistory = () => {
	const { t } = useTranslation()
	const {
		withdrawalRecentInfo,
		refetchWithdrawalRecentInfo,
		cancelWithdrawal,
	} = useWithdrawal()

	return (
		<>
			{withdrawalRecentInfo.length > 0 ? (
				<WithdrawalHistoryTable
					classNames='list'
					dataSource={withdrawalRecentInfo}
					onReload={refetchWithdrawalRecentInfo}
					onCancel={cancelWithdrawal}
				/>
			) : (
				<div className='nodata icon icon-nodata'>
					<div>{t('Label_General_NoData')}</div>
				</div>
			)}
			<Link href={paths.history.root}>
				<a className='icon icon-books' />
			</Link>
		</>
	)
}

export { RecentHistory }
