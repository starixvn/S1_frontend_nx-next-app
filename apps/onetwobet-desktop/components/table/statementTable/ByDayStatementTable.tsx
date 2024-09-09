import { Table } from '@nx-next-app/components/D0001/table'
import { ITableColumns } from '@nx-next-app/components/D0001/table/Table'
import { CURRENCY_TO_TIMEZONE } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { ICustTpBetRecordListOneDayData } from '@nx-next-app/service'
import { numberFormat, revertTimeZone } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'

const ByDayStatementTable = ({
	dataSource,
	targetTab,
	onDetails,
}: {
	dataSource: ICustTpBetRecordListOneDayData[]
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
			render: ({ item: { settledDate } }: { item: { settledDate: string } }) =>
				revertTimeZone(settledDate).format('YYYY-MM-DD'),
		},
		{
			title: t('Label_General_CategoryName'),
			dataIndex: 'categoryName',
			key: 'categoryName',
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
			key: 'action',
			dataIndex: '',
			render: ({
				item: { settledDate, categoryId },
			}: {
				// eslint-disable-next-line react/no-unused-prop-types
				item: { settledDate: string; categoryId: number }
			}) => (
				<div
					className='btnGroup'
					onClick={() =>
						onDetails({
							selDate: settledDate,
							categoryId,
							targetTab,
						})
					}
				>
					<a role='link' aria-hidden className='blue'>
						{t('Label_General_Details')}
					</a>
				</div>
			),
		},
	]

	return (
		<Table
			dataSource={dataSource}
			columns={columns as ITableColumns<ICustTpBetRecordListOneDayData>[]}
			mainClassName='statement'
			isShowBodyDivElement={false}
		/>
	)
}

export default ByDayStatementTable
