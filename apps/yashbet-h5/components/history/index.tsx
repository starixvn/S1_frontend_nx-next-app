import HistoryHeader from '@apps/yashbet-h5/components/history/header'
import DepositItem from '@apps/yashbet-h5/components/history/historyItems/DepositItem'
import FinancialItem from '@apps/yashbet-h5/components/history/historyItems/FinancialItem'
import ReferralItem from '@apps/yashbet-h5/components/history/historyItems/ReferralItem'
import TransferItem from '@apps/yashbet-h5/components/history/historyItems/TransferItem'
import WithdrawalItem from '@apps/yashbet-h5/components/history/historyItems/WithdrawalItem'
import { BackTop } from '@nx-next-app/components/D0006'
import Loading from '@nx-next-app/components/H0006/loading'
import { HistoryTabsEnum, useHistory } from '@nx-next-app/operations'
import {
	IDepositInfoHistoryData,
	IReferralData,
	IStatementData,
	ITransferHistoryData,
	IWithdrawalInfoHistoryData,
} from '@nx-next-app/service'
import { uniqueId } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import React from 'react'

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
							<div className='txt-white'>{t('Label_General_NoData')}</div>
						</div>
					)}
				</div>
			</main>
		</>
	)
}

export default History
