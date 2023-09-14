import React from 'react'
import { CURRENCY_TO_TIMEZONE } from '@nx-next-app/constants'
import dayjs from 'dayjs'
import { numberFormat } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'

interface IFinancialItemProps {
	changeAmount: number
	beforeAmount: number
	afterAmount: number
	refTransId: string
	createTime: string
	typeName: string
}

const FinancialItem = ({
	createTime,
	typeName,
	changeAmount,
	beforeAmount,
	afterAmount,
	refTransId,
}: IFinancialItemProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()

	return (
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
					{t('Label_History_Time')} ({CURRENCY_TO_TIMEZONE[currencyId]})
				</span>
				<span>
					{dayjs(createTime, 'YYYY-MM-DDThh:mm:ssZ')
						.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
						.format('HH:mm:ss')}
				</span>
			</li>
			<li>
				<span className='title'>{t('Label_History_TypeName')}</span>
				<span>{typeName}</span>
			</li>
			<li>
				<span className='title'>{t('Label_History_ChangeAmount')}</span>
				<span>{numberFormat(changeAmount as number, currencyId, 0)}</span>
			</li>
			<li>
				<span className='title'>{t('Label_History_BeforeAmount')}</span>
				<span>{numberFormat(beforeAmount as number, currencyId, 0)}</span>
			</li>
			<li>
				<span className='title'>{t('Label_History_AfterAmount')}</span>
				<span>{numberFormat(afterAmount as number, currencyId, 0)}</span>
			</li>
			<li>
				<span className='title'>{t('Label_History_RefTransId')}</span>
				<span>{refTransId}</span>
			</li>
		</ul>
	)
}

export default FinancialItem
