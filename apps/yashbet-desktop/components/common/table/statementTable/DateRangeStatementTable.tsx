import { CURRENCY_TO_TIMEZONE } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { ICustTpBetRecordListDateRangeData } from '@nx-next-app/service'
import { numberFormat, revertTimeZone } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import Table, { ITableColumns } from '../Table'

const DateRangeStatementTable = ({
	dataSource,
	targetTab,
	onDetails,
}: {
	dataSource: ICustTpBetRecordListDateRangeData[]
	targetTab: string
	onDetails: ({
		targetTab,
		selDate,
		categoryId,
		gameTypeId,
		pageNumber,
	}: {
		targetTab: string
		selDate: string
		categoryId?: number
		gameTypeId?: number
		pageNumber?: number
	}) => void
}) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()

	const columns = [
		{
			title: `${t('Label_General_SettledDate')} (${
				CURRENCY_TO_TIMEZONE[currencyId]
			})`,
			dataIndex: 'settledDate',
			key: 'settledDate',
			render: ({
				item: { settledDate },
			}: {
				item: { settledDate: string }
			}) => {
				return revertTimeZone(settledDate).format('YYYY-MM-DD')
			},
		},
		{
			title: t('Label_General_Turnover'),
			dataIndex: 'turnOver',
			key: 'turnOver',
			render: ({ item: { turnOver } }: { item: { turnOver: number } }) =>
				numberFormat(turnOver, currencyId, 2),
		},
		{
			title: t('Label_General_ValidBet'),
			dataIndex: 'validBet',
			key: 'validBet',
			render: ({ item: { validBet } }: { item: { validBet: number } }) =>
				numberFormat(validBet, currencyId, 2),
		},
		{
			title: t('Label_General_WinlostAmount'),
			dataIndex: 'winlostAmount',
			key: 'winlostAmount',
			render: ({
				item: { winlostAmount },
			}: {
				item: { winlostAmount: number }
			}) => numberFormat(winlostAmount, currencyId, 2),
		},
		{
			title: t('Label_History_Action'),
			dataIndex: 'settledDate',
			key: 'action',
			render: ({
				item: { settledDate },
			}: {
				// eslint-disable-next-line react/no-unused-prop-types
				item: { settledDate: string }
			}) => (
				<div
					className='btnGroup'
					onClick={() => onDetails({ selDate: settledDate, targetTab })}
				>
					<a role='link' aria-hidden className='thrid'>
						{t('Label_General_Details')}
					</a>
				</div>
			),
		},
	]

	return (
		<Table
			dataSource={dataSource}
			columns={columns as ITableColumns<ICustTpBetRecordListDateRangeData>[]}
			mainClassName='statement'
			isShowBodyDivElement={false}
		/>
	)
}

export default DateRangeStatementTable
