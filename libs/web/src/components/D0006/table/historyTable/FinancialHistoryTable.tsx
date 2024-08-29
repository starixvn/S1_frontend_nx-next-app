import React from 'react'
import { IStatementData } from '@nx-next-app/service'
import { CURRENCY_TO_TIMEZONE } from '@nx-next-app/constants'
import dayjs from 'dayjs'
import { numberFormat } from '@nx-next-app/utils'
import SpinButton from '@nx-next-app/components/D0006/button/SpinButton'
import Table, { ITableColumns } from '@nx-next-app/components/D0006/table/Table'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'

const FinancialHistoryTable = ({
	dataSource,
	onReload,
}: {
	dataSource: IStatementData[]
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
			// eslint-disable-next-line react/no-unused-prop-types
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
			title: t('Label_History_RefTransId'),
			dataIndex: 'refTransId',
			key: 'refTransId',
		},
		{
			title: t('Label_History_TypeName'),
			dataIndex: 'typeName',
			key: 'typeName',
		},
		{
			title: t('Label_History_ChangeAmount'),
			dataIndex: 'changeAmount',
			key: 'changeAmount',
			render: ({
				item: { changeAmount },
			}: {
				item: { changeAmount: number }
			}) => numberFormat(changeAmount, currencyId, 2),
		},
		{
			title: t('Label_History_BeforeAmount'),
			dataIndex: 'beforeAmount',
			key: 'beforeAmount',
			render: ({
				item: { beforeAmount },
			}: {
				item: { beforeAmount: number }
			}) => numberFormat(beforeAmount, currencyId, 2),
		},
		{
			title: (
				<>
					{t('Label_History_AfterAmount')}
					<SpinButton onClick={onReload} />
				</>
			),
			dataIndex: 'afterAmount',
			key: 'afterAmount',
			render: ({ item: { afterAmount } }: { item: { afterAmount: number } }) =>
				numberFormat(afterAmount, currencyId, 2),
		},
	]

	return (
		<Table
			dataSource={dataSource}
			columns={columns as ITableColumns<IStatementData>[]}
			mainClassName='list history'
			headerClassName='listHeader'
			bodyClassName='listBody'
		/>
	)
}

export default FinancialHistoryTable
