import { Loading } from '@nx-next-app/components/D0001'
import Pagination from '@nx-next-app/components/D0001/pagination'
import HistoryFilter from '@nx-next-app/features/F0001/desktop/history/HistoryFilter'
import HistoryTable from '@nx-next-app/features/F0001/desktop/history/HistoryTable'
import HistoryTabs from '@nx-next-app/features/F0001/desktop/history/HistoryTabs'
import { WrapperHistory } from '@nx-next-app/features/F0001/desktop/history/styles'
import { useHistory } from '@nx-next-app/features/F0001/providers'
import { useTranslation } from 'next-i18next'

const History = () => {
	const { displayColumns, currentPage, totalPage, isLoading, onPageChange } =
		useHistory()
	const { t } = useTranslation()

	return (
		<div className='rightModule'>
			<WrapperHistory>
				<div className='infoModule'>
					<div className='inside-title'>
						<div className='group-icon-title'>
							<i className='icon icon-chat-history-fill' />
							{t('Label_History')}
						</div>
					</div>
					<div className='inside-body'>
						<HistoryTabs />
						<div className='historyModule active'>
							<HistoryFilter />
							{isLoading ? (
								<Loading />
							) : (
								<div className='table-history'>
									<HistoryTable />
									{displayColumns.length > 0 && (
										<Pagination
											totalPage={totalPage}
											currentPage={currentPage}
											onPageChange={onPageChange}
										/>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</WrapperHistory>
		</div>
	)
}

export default History
