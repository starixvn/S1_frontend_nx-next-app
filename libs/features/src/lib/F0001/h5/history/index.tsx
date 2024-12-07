import { BackTop } from '@nx-next-app/components/D0001'
import Loading from '@nx-next-app/components/H0001/loading'
import { WrapperInfoList } from '@nx-next-app/features/F0001/h5/common/CommonStyles'
import { NoData } from '@nx-next-app/features/F0001/h5/deposit/common/NoData'
import HistoryHeader from '@nx-next-app/features/F0001/h5/history/header'
import DepositItem from '@nx-next-app/features/F0001/h5/history/historyItems/DepositItem'
import FinancialItem from '@nx-next-app/features/F0001/h5/history/historyItems/FinancialItem'
import ReferralItem from '@nx-next-app/features/F0001/h5/history/historyItems/ReferralItem'
import TransferItem from '@nx-next-app/features/F0001/h5/history/historyItems/TransferItem'
import WithdrawalItem from '@nx-next-app/features/F0001/h5/history/historyItems/WithdrawalItem'
import { WrapperDepositPageHistoryH5 } from '@nx-next-app/features/F0001/h5/history/styles'
import { useHistory } from '@nx-next-app/features/F0001/providers'
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
		<WrapperDepositPageHistoryH5>
			<HistoryHeader />
			<main className='main history'>
				<WrapperInfoList>
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
											<WithdrawalItem
												{...(item as IWithdrawalInfoHistoryData)}
											/>
										)}
										{activeTab === HistoryTabsEnum.Financial && (
											<FinancialItem {...(item as IStatementData)} />
										)}
										{activeTab === HistoryTabsEnum.Referral && (
											<ReferralItem {...(item as IReferralData)} />
										)}
									</React.Fragment>
								))}

								{displayColumns.length > 2 ? <BackTop /> : null}
							</div>
						)}
						<span ref={historyListRef} />
					</div>
					{currentPage && displayColumns.length === 0 && (
						<NoData customClass='no-border' />
					)}
				</WrapperInfoList>
			</main>
		</WrapperDepositPageHistoryH5>
	)
}

export default History
