import React from 'react'
import { CURRENCY_TO_TIMEZONE } from '@nx-next-app/constants'
import dayjs from 'dayjs'
import { numberFormat } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { useHistory } from '@nx-next-app/features/F0001/providers'

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
	const { transferDirection } = useHistory()
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
				<span className='title'>{t('Label_History_ID')}</span>
				<span>{transId}</span>
			</li>
			<li>
				<span className='title'>{t('Label_History_Status')}</span>
				<span>
					{status === 0 ? t('Label_General_Success') : t('Label_General_Fail')}
				</span>
			</li>
			<li>
				<span className='title'>{t('Label_History_Amount')}</span>
				<span>{numberFormat(amount as number, currencyId, 0)}</span>
			</li>
			<li>
				<span className='title'>{t('Label_History_Direction')}</span>
				<span>
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
				<span>
					<span>{memo}</span>
				</span>
			</li>
		</ul>
	)
}

export default TransferItem
