import { CURRENCY_TO_TIMEZONE } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { numberFormat, transferDirection } from '@nx-next-app/utils'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'

interface ITransferItemProps {
	tpName: string
	transId: string
	amount: number
	direction: number
	createTime: string
	status: number
	memo: string
	isAdjustment: boolean
}

const TransferItem = ({
	createTime,
	transId,
	status,
	amount,
	memo,
	direction,
	isAdjustment,
	tpName,
}: ITransferItemProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()

	const { startWallet, endWallet } = transferDirection({
		direction: direction as number,
		displayMainWallet: t('Label_History_MainWallet'),
		displayAdjustment: t('Label_History_Adjustment'),
		isAdjustment: isAdjustment as boolean,
		tpName: tpName as string,
	})

	return (
		<div className='info transfer'>
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
					<span className='title'>{t('Label_History_ID')}</span>
					<span className='body'>{transId}</span>
				</li>
				<li>
					<span className='title'>{t('Label_History_Status')}</span>
					<span className='body'>
						{status === 0
							? t('Label_General_Success')
							: t('Label_General_Fail')}
					</span>
				</li>
				<li>
					<span className='title'>{t('Label_History_Amount')}</span>
					<span className='body'>
						{numberFormat(amount as number, currencyId, 0)}
					</span>
				</li>
				<li>
					<span className='title'>{t('Label_History_Direction')}</span>
					<span className='body'>
						<span>{startWallet}</span>
						{endWallet === t('Label_History_Adjustment') ? (
							<i>&nbsp;&nbsp;</i>
						) : (
							<i className='icon icon-keyboard_arrow_right1' />
						)}
						<span>{endWallet}</span>
					</span>
				</li>
				<li>
					<span className='title'>{t('Label_History_Memo')}</span>
					<span className='body'>
						<span>{memo}</span>
					</span>
				</li>
			</ul>
		</div>
	)
}

export default TransferItem
