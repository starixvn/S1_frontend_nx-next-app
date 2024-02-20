import React from 'react'
import { IReferralData } from '@nx-next-app/service'
import { CURRENCY_TO_TIMEZONE } from '@nx-next-app/constants'
import dayjs from 'dayjs'
import { numberFormat } from '@nx-next-app/utils'
import SpinButton from '@nx-next-app/components/D0006/button/SpinButton'
import Table, { ITableColumns } from '@nx-next-app/components/D0006/table/Table'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'

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
			title: `${t('Label_History_RegisterDate')} (${
				CURRENCY_TO_TIMEZONE[currencyId]
			})`,
			dataIndex: 'registerDate',
			key: 'registerDate',
			render: ({
				item: { registerDate },
			}: {
				item: { registerDate: string }
			}) => (
				<>
					{dayjs(registerDate)
						.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
						.format('MM/DD/YYYY')}
					<span className='txt-blue'>
						{dayjs(registerDate)
							.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
							.format('hh:mm:ss A')}
					</span>
				</>
			),
		},
		{
			title: t('Label_History_Currency'),
			dataIndex: 'currencyId',
			key: 'currencyId',
			render: ({ item: { currencyId } }: { item: { currencyId: number } }) => (
				<div>{t(`Currency_${currencyId}`)}</div>
			),
		},
		{
			title: t('Label_History_TotalDeposit'),
			dataIndex: 'totalDeposit',
			key: 'totalDeposit',
			render: ({
				item: { totalDeposit, depositC },
			}: {
				item: { totalDeposit: number; depositC: number }
			}) => (
				<>
					{numberFormat(totalDeposit, currencyId, 0)} /
					<span>{numberFormat(depositC, currencyId, 0)}</span>
				</>
			),
		},
		{
			title: t('Label_History_TotalBet'),
			dataIndex: 'totalBet',
			key: 'totalBet',
			render: ({
				item: { totalBet, vaildBetC },
			}: {
				// eslint-disable-next-line react/no-unused-prop-types
				item: { totalBet: number; vaildBetC: number }
			}) => (
				<>
					{numberFormat(totalBet, currencyId, 0)} /
					<span>{numberFormat(vaildBetC, currencyId, 0)}</span>
				</>
			),
		},
		{
			title: t('Label_General_BonusAmount'),
			dataIndex: 'bonusAmount',
			key: 'bonusAmount',
			render: ({ item: { bonusAmount } }: { item: { bonusAmount: number } }) =>
				numberFormat(bonusAmount, currencyId, 0),
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
			render: ({ item: { status } }: { item: { status: number } }) =>
				t(`Label_ReferralStatus${status}`),
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
