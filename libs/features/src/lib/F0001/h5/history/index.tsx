import React from 'react'
import { useHistory } from '@nx-next-app/features/F0001/providers'
import { useTranslation } from 'next-i18next'
import { BackTop } from '@nx-next-app/components/D0001'
import HistoryHeader from '@nx-next-app/features/F0001/h5/history/header'
import HistoryItem from '@nx-next-app/features/F0001/h5/history/HistoryItem'
import { uniqueId } from 'lodash-es'
import Loading from '@nx-next-app/components/H0001/loading'

const History = () => {
	const { displayColumns, historyListRef, isShowMobileLoading, currentPage } =
		useHistory()
	const { t } = useTranslation()

	return (
		<>
			<HistoryHeader />
			<main className='main history'>
				<div className='recent active'>
					{isShowMobileLoading && <Loading />}
					{displayColumns.length > 0 && (
						<div className='infoList'>
							{displayColumns.map((item, index) => (
								<HistoryItem key={uniqueId()} {...item} />
							))}
							<span ref={historyListRef} />
							{displayColumns.length > 2 ? <BackTop /> : null}
						</div>
					)}
					{currentPage && displayColumns.length === 0 && (
						<div className='nodata icon icon-nodata'>
							<div className='txt-white'>{t('Label_History_NoData')}</div>
						</div>
					)}
				</div>
			</main>
		</>
	)
}

export default History
