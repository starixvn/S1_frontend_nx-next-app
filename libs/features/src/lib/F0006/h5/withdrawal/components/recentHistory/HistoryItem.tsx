import dayjs from 'dayjs'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { numberFormat } from '@nx-next-app/utils'
import { IWithdrawalRecentInfoData } from '@nx-next-app/service'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { dateFormat, detailTimeFormat } from '@nx-next-app/constants'
import {
	statusClassNames,
	WithdrawalStatusEnum,
} from '@nx-next-app/features/F0006/types'
import { useWithdrawal } from '@nx-next-app/features/F0006/providers'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

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
				<div className='btn-group'>
					<button
						className='white'
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
					<span>
						{dayjs(createTime).utcOffset(timeZone).format(dateFormat)}
					</span>
				</li>
				<li>
					<span className='title'>
						{t('Label_General_Time')} ({timeZone})
					</span>
					<span>
						{dayjs(createTime).utcOffset(timeZone).format(detailTimeFormat)}
					</span>
				</li>
				<li>
					<span className='title'>{t('Label_Withdrawal_ID')}</span>
					<span>{transId}</span>
				</li>
				<li>
					<span className='title'>{t('Label_Withdrawal_Amount')}</span>
					<span>{numberFormat(amount, currencyId)}</span>
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
