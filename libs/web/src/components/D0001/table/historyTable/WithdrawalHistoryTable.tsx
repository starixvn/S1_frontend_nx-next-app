import SpinButton from '@nx-next-app/components/D0001/button/SpinButton'
import Table, { ITableColumns } from '@nx-next-app/components/D0001/table/Table'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { CURRENCY_TO_TIMEZONE } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { IWithdrawalInfoHistoryData } from '@nx-next-app/service'
import { numberFormat } from '@nx-next-app/utils'
import dayjs from 'dayjs'
import {
	WithdrawalStatusClassName,
	WithdrawalStatusClassNameEnum,
	WithdrawalStatusEnum,
} from 'libs/web/src/app/types/history'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'

const HistoryMsgModal = dynamic(
	() =>
		import('@nx-next-app/features/F0001/desktop/history/modal/HistoryMsgModal'),
	{
		ssr: false,
	}
)

const WithdrawalHistoryTable = ({
	dataSource,
	onReload,
	onCancel,
	classNames = 'list history',
}: {
	dataSource: IWithdrawalInfoHistoryData[]
	onReload: () => void
	onCancel: (transId: string) => void
	classNames?: string
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
					<span className='txt-blue'>
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
				item: { status, transId, withdrawalMessageDetail },
			}: {
				item: {
					transId: string
					status: WithdrawalStatusClassNameEnum
					withdrawalMessageDetail: {
						errorTypeName: string
						message: string
						createTime: string
					}[]
				}
			}) => {
				const statusClassName =
					WithdrawalStatusClassName[status as WithdrawalStatusClassNameEnum]
				const statusText = t(`Label_WithdrawalStatus${status}`)
				return (
					<div className={`${statusClassName}`}>
						{statusText}
						{withdrawalMessageDetail && withdrawalMessageDetail.length > 0 && (
							<button
								className='infobtn'
								onClick={() => {
									modal.open(
										<HistoryMsgModal
											transId={transId as string}
											messageDetail={
												withdrawalMessageDetail as {
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
					<SpinButton className='icon icon-refresh-fill' onClick={onReload} />
				</>
			),
			dataIndex: 'action',
			key: 'action',
			render: ({
				item: { canCancel, status, transId },
			}: {
				// eslint-disable-next-line react/no-unused-prop-types
				item: {
					canCancel: boolean
					status: WithdrawalStatusEnum
					transId: string
				}
			}) => {
				const showingCancelBtn =
					canCancel &&
					(status === WithdrawalStatusEnum.pending ||
						status === WithdrawalStatusEnum.toKyc)

				return (
					showingCancelBtn && (
						<div className='btnGroup'>
							<button
								className='btn-secondary'
								onClick={() => {
									modal.confirm(t('Label_History_CancelConfirm'), {
										onOK: () => onCancel(transId),
									})
								}}
							>
								{t('Label_General_Cancel')}
							</button>
						</div>
					)
				)
			},
		},
	]

	return (
		<Table
			dataSource={dataSource}
			columns={columns as ITableColumns<IWithdrawalInfoHistoryData>[]}
			mainClassName={`${classNames} custom-table`}
			headerClassName='listHeader custom-table-thead'
			bodyClassName='listBody custom-table-tbody'
		/>
	)
}

export default WithdrawalHistoryTable
