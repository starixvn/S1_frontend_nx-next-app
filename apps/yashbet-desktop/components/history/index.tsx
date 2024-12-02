import { Loading } from '@nx-next-app/components/D0006'
import Pagination from '@nx-next-app/components/D0006/pagination'
import { useHistory } from '@nx-next-app/operations'
import HistoryFilter from '@yashbet-desktop/components/history/HistoryFilter'
import HistoryTable from '@yashbet-desktop/components/history/HistoryTable'
import HistoryTabs from '@yashbet-desktop/components/history/HistoryTabs'
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
