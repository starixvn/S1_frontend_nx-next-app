import React, { ReactNode } from 'react'
import {
	DepositStatusEnum,
	DepositTypeEnum,
	HistoryTabsEnum,
} from 'libs/web/src/app/types/history'
import { useTranslation } from 'next-i18next'
import { useHistory } from '@nx-next-app/features/F0001/providers'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { BankSlipModal } from '@nx-next-app/features/F0001/h5/history/modal'
import classNames from 'classnames'

export interface IHistoryItemProps {
	children: ReactNode
	transId?: string
	depositType?: number
	amount?: number
	status?: number
	thirdId?: string | number
	bankInfo?: {
		bankName?: string
		bankSite?: string
		status?: number
	}
	depositRep?: {
		accountName?: string
		accountNo?: string
	}
	depositReceipt?: {
		receiptNo?: number
		depositPic?: null
	}[]
}

const HistoryItems = ({
	children,
	transId,
	depositType,
	amount,
	status,
	thirdId,
	bankInfo,
	depositRep,
	depositReceipt,
}: IHistoryItemProps) => {
	const { activeTab, onDepositCancel, onSubmit } = useHistory()
	const { t } = useTranslation()
	const { modal } = useGlobalModal()

	return (
		<div
			className={classNames('info', {
				infoBlack: activeTab === HistoryTabsEnum.Referral,
				transfer: activeTab === HistoryTabsEnum.Transfer,
			})}
		>
			{children}

			{thirdId && (
				<div>
					<div className='title'>{t('Label_History_Action')}</div>
					<div>{thirdId}</div>
				</div>
			)}

			{depositType === DepositTypeEnum.BankTransfer &&
				(status === DepositStatusEnum.Pending ||
					status === DepositStatusEnum.OnHold) && (
					<div className='btn-group'>
						<button
							className='white'
							onClick={() => {
								modal.confirm(t('Label_History_CancelConfirm'), {
									onOK: () => {
										onDepositCancel(transId as string)
									},
								})
							}}
						>
							{t('Label_General_Cancel')}
						</button>
						<button
							className='orange openPopup'
							onClick={() =>
								modal.open(
									<BankSlipModal
										bankSlipInfo={
											{
												bankInfo,
												depositRep,
												amount,
												transId,
												depositReceipt,
											} as {
												bankInfo: {
													bankName: string
													bankSite: string
												}
												depositRep: {
													accountName: string
													accountNo: string
												}
												amount: number
												transId: string
												depositReceipt: {
													receiptNo: number
													depositPic: null
												}[]
											}
										}
										onSubmit={onSubmit}
									/>,
									{ className: 'statuspop' }
								)
							}
						>
							{t('Label_History_SubmitProof')}
						</button>
					</div>
				)}
		</div>
	)
}

export default HistoryItems
