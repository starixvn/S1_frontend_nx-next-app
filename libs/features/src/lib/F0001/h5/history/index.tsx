import React from 'react'
import { useHistory } from '@nx-next-app/features/F0001/providers'
import { useTranslation } from 'next-i18next'
import { BackTop } from '@nx-next-app/components/D0001'
import { uniqueId } from 'lodash-es'
import { HistoryTabsEnum } from 'libs/web/src/app/types/history'
import {
	IDepositInfoHistoryData,
	IReferralData,
	IStatementData,
	ITransferHistoryData,
	IWithdrawalInfoHistoryData,
} from '@nx-next-app/service'
import Loading from '@nx-next-app/components/H0001/loading'
import HistoryHeader from '@nx-next-app/features/F0001/h5/history/header'
import TransferItem from '@nx-next-app/features/F0001/h5/history/historyItems/TransferItem'
import DepositItem from '@nx-next-app/features/F0001/h5/history/historyItems/DepositItem'
import WithdrawalItem from '@nx-next-app/features/F0001/h5/history/historyItems/WithdrawalItem'
import FinancialItem from '@nx-next-app/features/F0001/h5/history/historyItems/FinancialItem'
import ReferralItem from '@nx-next-app/features/F0001/h5/history/historyItems/ReferralItem'

const History = () => {
	const {
		activeTab,
		displayColumns,
		historyListRef,
		isShowMobileLoading,
		currentPage,
	} = useHistory()
	const { t } = useTranslation()

	return (
		<>
			<HistoryHeader />
			<main className='main history'>
				<div className='recent active'>
					{isShowMobileLoading && <Loading />}

					{displayColumns.length > 0 && (
						<div className='infoList'>
							{displayColumns.map(item => (
								<React.Fragment key={uniqueId()}>
									{activeTab === HistoryTabsEnum.Transfer && (
										<TransferItem {...(item as ITransferHistoryData)} />
									)}
									{activeTab === HistoryTabsEnum.Deposit && (
										<DepositItem {...(item as IDepositInfoHistoryData)} />
									)}
									{activeTab === HistoryTabsEnum.Withdrawal && (
										<WithdrawalItem {...(item as IWithdrawalInfoHistoryData)} />
									)}
									{activeTab === HistoryTabsEnum.Financial && (
										<FinancialItem {...(item as IStatementData)} />
									)}
									{activeTab === HistoryTabsEnum.Referral && (
										<ReferralItem {...(item as IReferralData)} />
									)}
								</React.Fragment>
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
