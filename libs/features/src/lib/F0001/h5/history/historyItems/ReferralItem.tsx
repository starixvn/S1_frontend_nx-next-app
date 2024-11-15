import { CURRENCY_TO_TIMEZONE } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { numberFormat } from '@nx-next-app/utils'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'

interface IReferralItemProps {
	userName: string
	settledDate: string
	totalDeposit: number
	rewardAmount: number
}

const ReferralItem = ({
	userName,
	settledDate,
	totalDeposit,
	rewardAmount,
}: IReferralItemProps) => {
	const { t } = useTranslation()
	const {
		userInfo: { currencyId },
	} = useAuth()

	return (
		<div className='info'>
			<ul>
				<li>
					<span className='title'>{t('Label_General_Username')}</span>
					<span>{userName}</span>
				</li>
				<li>
					<span className='title'>Deposit Date</span>
					<span>
						{dayjs(settledDate)
							.utcOffset(CURRENCY_TO_TIMEZONE[currencyId])
							.format('MM/DD/YYYY')}
					</span>
				</li>
				<li>
					<span className='title'>{t('Label_History_DepositAmount')}</span>
					<span>{numberFormat(totalDeposit, currencyId, 2)}</span>
				</li>
				<li>
					<span className='title'>{t('Label_History_RewardsAmounts')}</span>
					<span>{numberFormat(rewardAmount, currencyId, 2)}</span>
				</li>
			</ul>
		</div>
	)
}

export default ReferralItem
