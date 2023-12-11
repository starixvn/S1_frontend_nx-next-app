import React from 'react'
import { useTranslation } from 'next-i18next'
import HistoryTabs from '@nx-next-app/features/F0006/desktop/history/HistoryTabs'
import HistoryFilter from '@nx-next-app/features/F0006/desktop/history/HistoryFilter'
import HistoryTable from '@nx-next-app/features/F0006/desktop/history/HistoryTable'
import Pagination from '@nx-next-app/components/D0002/pagination'
import { useHistory } from '@nx-next-app/features/F0006/providers/history-context'
import { Loading } from '@nx-next-app/components/D0002'

const History = () => {
	const { displayColumns, currentPage, totalPage, isLoading, onPageChange } =
		useHistory()
	const { t } = useTranslation()

	return (
		<div className='rightModule'>
			<div className='infoModule'>
				<div className='inside-title'>
					<span className='icon icon-icon32px_History'>
						{t('Label_History')}
					</span>
				</div>
				<HistoryTabs />
				<div className='historyModule active'>
					<HistoryFilter />
					{isLoading ? (
						<Loading />
					) : (
						<>
							<HistoryTable />
							{displayColumns.length > 0 && (
								<Pagination
									totalPage={totalPage}
									currentPage={currentPage}
									onPageChange={onPageChange}
								/>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default History
