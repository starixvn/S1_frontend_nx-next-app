import React from 'react'
import { CURRENCY_TO_TIMEZONE } from '@nx-next-app/constants'
import dayjs from 'dayjs'
import { numberFormat } from '@nx-next-app/utils'
import { WithdrawalStatusClassNameForMobile } from 'libs/web/src/app/types/history'
import HistoryMsgModal from 'libs/features/src/lib/F0001/h5/history/modal/HistoryMsgModal'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

interface IWithdrawalItemProps {
	createTime: string
	transId: string
	amount: number
	status: number
	withdrawalMessageDetail: {
		errorTypeName: string
		message: string
		createTime: string
	}[]
}

const WithdrawalItem = ({
	createTime,
	transId,
	amount,
	status,
	withdrawalMessageDetail,
}: IWithdrawalItemProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { modal } = useGlobalModal()

	return (
		<div className='info'>
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
						{t('Label_General_Time')} ({CURRENCY_TO_TIMEZONE[currencyId]})
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
					<span className='title'>{t('Label_History_Amount')}</span>
					<span>{numberFormat(amount as number, currencyId, 0)}</span>
				</li>
				<li>
					<span className='title'>{t('Label_History_Status')}</span>
					<span
						className={WithdrawalStatusClassNameForMobile[status as number]}
					>
						{t(`Label_WithdrawalStatus${status}`)}
						{withdrawalMessageDetail && withdrawalMessageDetail.length > 0 && (
							<button
								className='infobtn'
								onClick={() =>
									modal.open(
										<HistoryMsgModal
											transId={transId as string}
											messageDetail={
												withdrawalMessageDetail as {
													errorTypeName: string
													message: string
													createTime: string
												}[]
											}
										/>,
										{ className: 'statuspop' }
									)
								}
							/>
						)}
					</span>
				</li>
			</ul>
		</div>
	)
}

export default WithdrawalItem
