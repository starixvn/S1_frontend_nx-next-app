import { CURRENCY_TO_TIMEZONE } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useStatement } from '@nx-next-app/operations'
import { ICustTpBetRecordDetailListbyGameTypeData } from '@nx-next-app/service'
import { numberFormat, revertTimeZone } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import Table, { ITableColumns } from '../Table'

const ByDetailStatementTable = ({
	dataSource,
}: {
	dataSource: ICustTpBetRecordDetailListbyGameTypeData[]
}) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { totalTurnover, totalWinlostAmount } = useStatement()

	const columns = [
		{
			title: t('Label_General_TransId'),
			dataIndex: 'transId',
			key: 'transId',
		},
		{
			title: t('Label_General_BonusId'),
			dataIndex: 'bonusId',
			key: 'bonusId',
		},
		{
			title: t('Label_General_BonusCode'),
			dataIndex: 'bonusCode',
			key: 'bonusCode',
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
			title: `${t('Label_General_SettledDate')} (${
				CURRENCY_TO_TIMEZONE[currencyId]
			})`,
			dataIndex: 'settledTime',
			key: 'settledTime',
			render: ({ item: { settledTime } }: { item: { settledTime: string } }) =>
				revertTimeZone(settledTime).format('YYYY-MM-DD HH:mm:ss'),
		},
	]

	return (
		<Table
			dataSource={dataSource}
			columns={
				columns as ITableColumns<ICustTpBetRecordDetailListbyGameTypeData>[]
			}
			mainClassName='statement'
			isShowBodyDivElement={false}
			footer={() => (
				<div className='total'>
					{t('Label_General_TurnOverTotal')}：<span>{totalTurnover}</span>
					&nbsp;&nbsp; {t('Label_General_WinlostAmountTotal')}：
					<span>{totalWinlostAmount}</span>
				</div>
			)}
		/>
	)
}

export default ByDetailStatementTable
