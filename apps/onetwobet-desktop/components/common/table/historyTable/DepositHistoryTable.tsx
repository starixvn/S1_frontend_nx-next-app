import SpinButton from '@nx-next-app/components/D0001/button/SpinButton'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	AllowUploadReceiptType,
	CURRENCY_TO_TIMEZONE,
	WithReceiptInfoType,
} from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { IDepositInfoHistoryData } from '@nx-next-app/service'
import { numberFormat } from '@nx-next-app/utils'
import dayjs from 'dayjs'
import {
	DepositStatusClassName,
	DepositStatusClassNameEnum,
	DepositStatusEnum,
} from 'libs/web/src/app/types/history'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import Table, { ITableColumns } from '../Table'

const HistoryMsgModal = dynamic(
	() => import('@12b-desktop/components/history/modal/HistoryMsgModal'),
	{
		ssr: false,
	}
)

const DepositBankSlipModal = dynamic(
	() => import('@12b-desktop/components/history/modal/DepositBankSlipModal'),
	{
		ssr: false,
	}
)

const DepositHistoryTable = ({
	dataSource,
	onReload,
	onSubmit,
	onCancel,
}: {
	dataSource: IDepositInfoHistoryData[]
	onReload: () => void
	onSubmit: ({
		transId,
		receipt,
	}: {
		transId?: string
		receipt: string
	}) => void
	onCancel: (transId: string) => void
}) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()

	const { modal } = useGlobalModal()

	const columns = [
		{
			title: t('Label_General_No'),
			dataIndex: 'no',
			key: 'no',
			render: ({ index }: { index: number }) => index + 1,
		},
		{
			title: `${t('Label_History_Date')} (${CURRENCY_TO_TIMEZONE[currencyId]})`,
			dataIndex: 'createTime',
			key: 'createTime',
			render: ({ item: { createTime } }: { item: { createTime: string } }) => (
				<>
					{dayjs(createTime)
						.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
						.format('MM/DD/YYYY')}
					<span className='txt-gray'>
						{dayjs(createTime)
							.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
							.format('hh:mm:ss A')}
					</span>
				</>
			),
		},
		{
			title: t('Label_History_ID'),
			dataIndex: 'transId',
			key: 'transId',
		},
		{
			title: t('Label_General_Method'),
			dataIndex: 'depositType',
			key: 'depositType',
			render: ({ item: { depositType } }: { item: { depositType: number } }) =>
				t(`Label_DepositType${depositType}`),
		},
		{
			title: t('Label_History_Amount'),
			dataIndex: 'amount',
			key: 'amount',
			render: ({ item: { amount } }: { item: { amount: number } }) =>
				numberFormat(amount, currencyId, 0),
		},
		{
			title: t('Label_History_Status'),
			dataIndex: 'status',
			key: 'status',
			render: ({
				item: { status, transId, depositMessageDetail },
			}: {
				item: {
					status: DepositStatusClassNameEnum
					depositMessageDetail: IDepositInfoHistoryData['depositMessageDetail']
					transId: string
				}
			}) => {
				const statusClassName =
					DepositStatusClassName[status as DepositStatusClassNameEnum]
				const statusText = t(`Label_DepositStatus${status}`)

				return (
					<div className={statusClassName}>
						{statusText}
						{depositMessageDetail && depositMessageDetail.length > 0 && (
							<button
								className='infobtn'
								onClick={() => {
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
								}}
							/>
						)}
					</div>
				)
			},
		},
		{
			title: (
				<>
					{t('Label_History_Action')}
					<SpinButton onClick={onReload} />
				</>
			),
			dataIndex: 'action',
			key: 'action',
			// eslint-disable-next-line react/no-unused-prop-types
			render: ({ item }: { item: IDepositInfoHistoryData }) => {
				const isShowReceiptInfo = includes(
					WithReceiptInfoType,
					item?.depositType
				)
				let result = null
				if (
					// 存款方式
					includes(AllowUploadReceiptType, item.depositType) &&
					// 存款狀態
					(item.status === DepositStatusEnum.Pending ||
						item.status === DepositStatusEnum.OnHold)
				)
					result = (
						<>
							<button
								className='white btn-check icon icon-pencil upload-btn'
								onClick={() =>
									modal.open(
										<DepositBankSlipModal
											bankName={item?.bankInfo?.bankName}
											bankSite={item?.bankInfo?.bankSite}
											accountName={item?.depositRep?.accountName}
											accountNo={item?.depositRep?.accountNo}
											code={item?.depositRep?.code}
											transId={item?.transId}
											depositReceipt={item?.depositReceipt}
											isShowReceiptInfo={isShowReceiptInfo}
											onSubmit={onSubmit}
										/>
									)
								}
							>
								{t('Label_General_SubmitBankSlip')}
							</button>
							<button
								className='ghost dark'
								onClick={() => {
									modal.confirm(t('Label_History_CancelConfirm'), {
										onOK: () => onCancel(item.transId),
									})
								}}
							>
								{t('Label_General_Cancel')}
							</button>
						</>
					)
				return (
					<div className='btnGroup'>
						{result}
						{item?.thirdId}
					</div>
				)
			},
		},
	]

	return (
		<Table
			dataSource={dataSource}
			columns={columns as ITableColumns<IDepositInfoHistoryData>[]}
			mainClassName='list history'
			headerClassName='listHeader'
			bodyClassName='listBody'
		/>
	)
}

export default DepositHistoryTable
