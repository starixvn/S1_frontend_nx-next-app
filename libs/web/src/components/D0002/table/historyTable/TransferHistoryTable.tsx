import dayjs from 'dayjs'
import Table, { ITableColumns } from '@nx-next-app/components/D0001/table/Table'
import SpinButton from '@nx-next-app/components/D0001/button/SpinButton'
import { ITransferHistoryData } from '@nx-next-app/service'
import { CURRENCY_TO_TIMEZONE } from '@nx-next-app/constants'
import { numberFormat, transferDirection } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'

const TransferHistoryTable = ({
	dataSource,
	onReload,
}: {
	dataSource: ITransferHistoryData[]
	onReload: () => void
}) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()

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
			title: t('Label_History_Direction'),
			dataIndex: 'direction',
			key: 'direction',
			render: ({
				item: { direction, isAdjustment, tpName },
			}: {
				item: { direction: number; isAdjustment: boolean; tpName: string }
			}) => {
				const { startWallet, endWallet } = transferDirection({
					direction,
					displayMainWallet: t('Label_History_MainWallet'),
					displayAdjustment: t('Label_Adjustment'),
					isAdjustment,
					tpName,
				})

				return (
					<>
						<span className='txt-blue'>{startWallet}</span>
						{isAdjustment ? (
							<i>&nbsp;&nbsp;</i>
						) : (
							<i className='icon icon-keyboard_arrow_right' />
						)}
						{endWallet}
					</>
				)
			},
		},
		{
			title: t('Label_History_Amount'),
			dataIndex: 'amount',
			key: 'amount',
			render: ({ item: { amount } }: { item: { amount: number } }) =>
				numberFormat(amount, currencyId, 0),
		},
		{
			title: (
				<>
					{t('Label_History_Status')}

					<SpinButton onClick={onReload} />
				</>
			),
			dataIndex: 'status',
			key: 'status',
			// eslint-disable-next-line react/no-unused-prop-types
			render: ({ item: { status } }: { item: { status: number } }) => {
				const statusClassName = status === 0 ? 'approved' : 'cancel'
				const statusText =
					status === 0 ? t('Label_General_Success') : t('Label_General_Fail')

				return <div className={statusClassName}>{statusText}</div>
			},
		},
	]

	return (
		<Table
			dataSource={dataSource}
			columns={columns as ITableColumns<ITransferHistoryData>[]}
			mainClassName='list history'
			headerClassName='listHeader'
			bodyClassName='listBody'
		/>
	)
}

export default TransferHistoryTable
