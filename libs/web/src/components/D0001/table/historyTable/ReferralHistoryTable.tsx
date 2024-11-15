import Table, { ITableColumns } from '@nx-next-app/components/D0001/table/Table'
import { CURRENCY_TO_TIMEZONE } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { IReferralData } from '@nx-next-app/service'
import { numberFormat } from '@nx-next-app/utils'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'

const ReferralHistoryTable = ({
	dataSource,
	onReload,
}: {
	dataSource: IReferralData[]
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
			title: t('Label_General_Username'),
			dataIndex: 'userName',
			key: 'userName',
		},
		{
			title: 'Deposit Date',
			dataIndex: 'settledDate',
			key: 'settledDate',
			render: ({
				item: { settledDate },
			}: {
				item: { settledDate: string }
			}) => (
				<>
					{dayjs(settledDate)
						.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
						.format('MM/DD/YYYY')}
				</>
			),
		},
		{
			title: t('Label_History_DepositAmount'),
			dataIndex: 'totalDeposit',
			key: 'totalDeposit',
			render: ({
				item: { totalDeposit },
			}: {
				item: { totalDeposit: number }
			}) => <>{numberFormat(totalDeposit, currencyId, 2)}</>,
		},
		{
			title: t('Label_History_RewardsAmounts'),
			dataIndex: 'rewardAmount',
			key: 'rewardAmount',
			render: ({
				item: { rewardAmount },
			}: {
				item: { rewardAmount: number }
			}) => numberFormat(rewardAmount, currencyId, 2),
		},
	]

	return (
		<Table
			dataSource={dataSource}
			columns={columns as ITableColumns<IReferralData>[]}
			mainClassName='list history'
			headerClassName='listHeader'
			bodyClassName='listBody'
		/>
	)
}

export default ReferralHistoryTable
