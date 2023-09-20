import React from 'react'
import { CURRENCY_TO_TIMEZONE } from '@nx-next-app/constants'
import dayjs from 'dayjs'
import { numberFormat } from '@nx-next-app/utils'
import {
	DepositStatusClassName,
	DepositStatusClassNameEnum,
	DepositStatusEnum,
	DepositTypeEnum,
} from 'libs/web/src/app/types/history'
import HistoryMsgModal from 'libs/features/src/lib/F0001/h5/history/modal/HistoryMsgModal'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { BankSlipModal } from '@nx-next-app/features/F0001/h5/history/modal'
import {
	IDepositInfoHistoryData,
	useSetDepositCancelMutation,
	useUploadReceiptMutation,
} from '@nx-next-app/service'

const DepositItem = ({
	createTime,
	transId,
	depositType,
	amount,
	status,
	thirdId,
	depositMessageDetail,
	bankInfo,
	depositRep,
	depositReceipt,
}: IDepositInfoHistoryData) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()

	const { modal } = useGlobalModal()

	const [uploadReceipt] = useUploadReceiptMutation()

	const [setDepositCancel] = useSetDepositCancelMutation()

	const onDepositCancel = async (transId: string) => {
		await setDepositCancel({ transId }).unwrap()
	}

	const onUploadReceipt = async ({
		transId,
		receipt,
	}: {
		transId: string
		receipt: string
	}) => {
		try {
			await uploadReceipt({ transId, receipt }).unwrap()
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	return (
		<div className='info'>
			<ul>
				<li>
					<span className='title'>
						{t('Label_History_Date')} ({CURRENCY_TO_TIMEZONE[currencyId]})
					</span>
					<span>
						{dayjs(createTime, 'YYYY-MM-DDThh:mm:ssZ')
							.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
							.format('DD/MM/YYYY')}
					</span>
				</li>
				<li>
					<span className='title'>
						{t('Label_History_Time')} ({CURRENCY_TO_TIMEZONE[currencyId]})
					</span>
					<span>
						{dayjs(createTime, 'YYYY-MM-DDThh:mm:ssZ')
							.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
							.format('HH:mm:ss')}
					</span>
				</li>
				<li>
					<span className='title'>{t('Label_History_ID')}</span>
					<span>{transId}</span>
				</li>
				<li>
					<span className='title'>{t('Label_History_Method')}</span>
					<span>{t(`Label_DepositType${depositType}`)}</span>
				</li>
				<li>
					<span className='title'>{t('Label_History_Amount')}</span>
					<span>{numberFormat(amount as number, currencyId, 0)}</span>
				</li>
				<li>
					<span className='title'>{t('Label_History_Status')}</span>
					<span
						className={
							DepositStatusClassName[status as DepositStatusClassNameEnum]
						}
					>
						{t(`Label_DepositStatus${status}`)}
						{depositMessageDetail && depositMessageDetail.length > 0 && (
							<button
								className='infobtn'
								onClick={() =>
									modal.open(
										<HistoryMsgModal
											transId={transId as string}
											messageDetail={
												depositMessageDetail as {
													errorTypeName: string
													message: string
													createTime: string
												}[]
											}
										/>,
										{ className: 'statuspop' }
									)
								}
							/>
						)}
					</span>
				</li>
			</ul>

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
										onSubmit={onUploadReceipt}
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

export default DepositItem
