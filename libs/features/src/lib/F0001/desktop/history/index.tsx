import { Loading } from '@nx-next-app/components/D0001'
import Pagination from '@nx-next-app/components/D0001/pagination'
import HistoryFilter from '@nx-next-app/features/F0001/desktop/history/HistoryFilter'
import HistoryTable from '@nx-next-app/features/F0001/desktop/history/HistoryTable'
import HistoryTabs from '@nx-next-app/features/F0001/desktop/history/HistoryTabs'
import { useHistory } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'

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
