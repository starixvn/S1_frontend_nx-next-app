import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { CURRENCY_TO_TIMEZONE } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import {
	IDepositInfoHistoryData,
	useSetDepositCancelMutation,
	useUploadReceiptMutation,
} from '@nx-next-app/service'
import { numberFormat } from '@nx-next-app/utils'
import {
	DepositBankSlipModal,
	HistoryMsgModal,
} from '@yashbet-h5/components/history/modal'
import dayjs from 'dayjs'
import {
	DepositStatusClassName,
	DepositStatusClassNameEnum,
	DepositStatusEnum,
	DepositTypeEnum,
} from 'libs/web/src/app/types/history'
import { useTranslation } from 'next-i18next'

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
		transId?: string
		receipt: string
	}) => {
		try {
			if (transId) {
				await uploadReceipt({ transId, receipt }).unwrap()
			}
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
						{t('Label_General_Time')} ({CURRENCY_TO_TIMEZONE[currencyId]})
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
					<span className='title'>{t('Label_General_Method')}</span>
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
									<DepositBankSlipModal
										bankName={bankInfo?.bankName}
										bankSite={bankInfo?.bankSite}
										accountName={depositRep?.accountName}
										accountNo={depositRep?.accountNo}
										code={depositRep?.code}
										amount={amount}
										transId={transId}
										depositReceipt={depositReceipt}
										onSubmit={onUploadReceipt}
									/>,
									{ className: 'statuspop' }
								)
							}
						>
							{t('Label_Deposit_SubmitProof')}
						</button>
					</div>
				)}
		</div>
	)
}

export default DepositItem
