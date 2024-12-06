import { CURRENCY_TO_TIMEZONE } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { numberFormat } from '@nx-next-app/utils'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'

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
		<div className='info'>
			<ul>
				<li>
					<span className='title'>
						{t('Label_History_Date')} ({CURRENCY_TO_TIMEZONE[currencyId]})
					</span>
					<span className='body'>
						{dayjs(createTime, 'YYYY-MM-DDThh:mm:ssZ')
							.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
							.format('DD/MM/YYYY')}
					</span>
				</li>
				<li>
					<span className='title'>
						{t('Label_General_Time')} ({CURRENCY_TO_TIMEZONE[currencyId]})
					</span>
					<span className='body'>
						{dayjs(createTime, 'YYYY-MM-DDThh:mm:ssZ')
							.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
							.format('HH:mm:ss')}
					</span>
				</li>
				<li>
					<span className='title'>{t('Label_History_TypeName')}</span>
					<span className='body'>{typeName}</span>
				</li>
				<li>
					<span className='title'>{t('Label_History_ChangeAmount')}</span>
					<span className='body'>
						{numberFormat(changeAmount as number, currencyId, 2)}
					</span>
				</li>
				<li>
					<span className='title'>{t('Label_History_BeforeAmount')}</span>
					<span className='body'>
						{numberFormat(beforeAmount as number, currencyId, 2)}
					</span>
				</li>
				<li>
					<span className='title'>{t('Label_History_AfterAmount')}</span>
					<span className='body'>
						{numberFormat(afterAmount as number, currencyId, 2)}
					</span>
				</li>
				<li>
					<span className='title'>{t('Label_History_RefTransId')}</span>
					<span className='body'>{refTransId}</span>
				</li>
			</ul>
		</div>
	)
}

export default FinancialItem
