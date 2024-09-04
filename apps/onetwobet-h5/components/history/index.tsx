import {
	DepositItem,
	FinancialItem,
	ReferralItem,
	TransferItem,
	WithdrawalItem,
} from '@12b-h5/components/history/historyItems'
import { BackTop } from '@nx-next-app/components/D0001'
import Loading from '@nx-next-app/components/H0001/loading'
import { useHistory } from '@nx-next-app/operations'
import {
	IDepositInfoHistoryData,
	IReferralData,
	IStatementData,
	ITransferHistoryData,
	IWithdrawalInfoHistoryData,
} from '@nx-next-app/service'
import { HistoryTabsEnum } from 'libs/web/src/app/types/history'
import { uniqueId } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import React from 'react'
import HistoryHeader from './header'

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
					{currentPage !== 0 && displayColumns.length === 0 && (
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
