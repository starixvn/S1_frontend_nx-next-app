import { Loading } from '@12b-desktop/components/common'
import Pagination from '@nx-next-app/components/D0001/pagination'
import { useHistory } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import HistoryFilter from './HistoryFilter'
import HistoryTable from './HistoryTable'
import HistoryTabs from './HistoryTabs'

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
