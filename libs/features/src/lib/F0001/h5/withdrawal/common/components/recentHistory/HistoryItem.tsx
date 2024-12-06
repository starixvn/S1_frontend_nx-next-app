import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { dateFormat, detailTimeFormat } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useWithdrawal } from '@nx-next-app/features/F0001/providers'
import {
	WithdrawalStatusEnum,
	statusClassNames,
} from '@nx-next-app/features/F0001/types'
import { IWithdrawalRecentInfoData } from '@nx-next-app/service'
import { numberFormat } from '@nx-next-app/utils'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'

const WithdrawalMessageModal = dynamic(
	() => import('../modal/WithdrawalMessageModal'),
	{ ssr: false }
)

const HistoryItem = ({ item }: { item: IWithdrawalRecentInfoData }) => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const {
		userInfo: { currencyId },
	} = useAuth()
	const { CURRENCY_TO_TIMEZONE } = useStaticData()
	const timeZone = CURRENCY_TO_TIMEZONE[currencyId]
	const { cancelWithdrawal } = useWithdrawal()

	const {
		canCancel,
		status,
		createTime,
		transId,
		amount,
		withdrawalMessageDetail,
	} = item

	const btnGroup = (() => {
		if (
			(canCancel && status === WithdrawalStatusEnum.Pending) ||
			status === WithdrawalStatusEnum.ToKyc
		) {
			return (
				<div className='btnGroup'>
					<button
						className='btn-secondary'
						onClick={() =>
							modal.confirm(t('Label_History_CancelConfirm'), {
								onOK: () => cancelWithdrawal(transId),
							})
						}
					>
						{t('Label_General_Cancel')}
					</button>
				</div>
			)
		}
		return null
	})()

	return (
		<div className='info'>
			<ul>
				<li>
					<span className='title'>
						{t('Label_Withdrawal_Date')} ({timeZone})
					</span>
					<span className='body'>
						{dayjs(createTime).utcOffset(timeZone).format(dateFormat)}
					</span>
				</li>
				<li>
					<span className='title'>
						{t('Label_General_Time')} ({timeZone})
					</span>
					<span className='body'>
						{dayjs(createTime).utcOffset(timeZone).format(detailTimeFormat)}
					</span>
				</li>
				<li>
					<span className='title'>{t('Label_Withdrawal_ID')}</span>
					<span className='body'>{transId}</span>
				</li>
				<li>
					<span className='title'>{t('Label_Withdrawal_Amount')}</span>
					<span className='body'>{numberFormat(amount, currencyId)}</span>
				</li>
				<li>
					<span className='title'>{t('Label_Withdrawal_Status')}</span>
					<span className={statusClassNames[status]}>
						{t(`Label_Withdrawal_Status${status}`)}
						{withdrawalMessageDetail?.length > 0 && (
							<button
								className='infobtn'
								onClick={() =>
									modal.open(
										<WithdrawalMessageModal
											withdrawalMessageDetail={withdrawalMessageDetail}
											transId={transId}
										/>,
										{ className: 'statuspop' }
									)
								}
							/>
						)}
					</span>
				</li>
			</ul>
			{btnGroup}
		</div>
	)
}

export { HistoryItem }
